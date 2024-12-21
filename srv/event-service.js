const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
  const { Events, Participants, EventParticipants } = this.entities;
  const bupa = await cds.connect.to("API_BUSINESS_PARTNER");

  // Utilidad para validar Business Partner
  const validateBusinessPartner = async (businessPartnerId) => {
    try {
      const bp = await bupa.run(
        SELECT.one("A_BusinessPartner").where({ BusinessPartner: businessPartnerId })
      );
      if (!bp) return { valid: false, message: `BP ${businessPartnerId} not found` };
      if (bp.BusinessPartnerIsBlocked) return { valid: false, message: `BP ${businessPartnerId} is blocked` };
      return { valid: true, bp };
    } catch (error) {
      return { valid: false, message: `Error validating BP: ${error.message}` };
    }
  };

  // Acción: Crear Participante
  this.on("createParticipant", async (req) => {
    const { BusinessPartnerID, FirstName, LastName, Email, Phone } = req.data;
    const bpValidation = await validateBusinessPartner(BusinessPartnerID);
    if (!bpValidation.valid) return req.error(400, bpValidation.message);

    const existing = await SELECT.one.from(Participants).where({ BusinessPartnerID });
    if (existing) return req.error(400, `Participant with BP ID ${BusinessPartnerID} already exists`);

    const nextId = (await SELECT.one`max(ID) as maxId`.from(Participants))?.maxId + 1 || 1;
    await INSERT.into(Participants).entries({ ID: nextId, BusinessPartnerID, FirstName, LastName, Email, Phone });

    return SELECT.one.from(Participants).where({ ID: nextId });
  });

  // Acción: Cancelar Evento
  const toggleEvent = async (req, isCancelled, reason = null) => {
    const ID = req.params[0];
    const event = await SELECT.one.from(Events).where({ ID });
    if (!event) return req.error(404, `Event with ID ${ID} not found`);
    if (event.IsCancelled === isCancelled) {
      return req.error(400, `Event ${ID} is already ${isCancelled ? "cancelled" : "active"}`);
    }
    await UPDATE(Events)
      .set({ IsCancelled: isCancelled, IsActive: !isCancelled, CancellationReason: reason })
      .where({ ID });
    return SELECT.one.from(Events).where({ ID });
  };
  this.on("cancelEvent", (req) => toggleEvent(req, true, req.data.reason));
  this.on("reopenEvent", (req) => toggleEvent(req, false));

  // Acción: Registrar Participante
  this.on("registerParticipant", async (req) => {
    const { eventId, participantId } = req.data;
    const event = await SELECT.one.from(Events).where({ ID: eventId });
    if (!event || !event.IsActive || event.IsCancelled) {
      return req.error(400, `Event ${eventId} not available for registration`);
    }
    const participant = await SELECT.one.from(Participants).where({ ID: participantId });
    if (!participant) return req.error(404, `Participant ${participantId} not found`);
    const existing = await SELECT.one.from(EventParticipants).where({
      event_ID: eventId,
      participant_ID: participantId,
    });
    if (existing) return req.error(400, "Participant is already registered");
    await INSERT.into(EventParticipants).entries({
      event_ID: eventId,
      participant_ID: participantId,
      registrationDate: new Date().toISOString(),
    });
    return SELECT.one.from(Participants).where({ ID: participantId });
  });
});