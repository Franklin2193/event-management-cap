const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const bupa = await cds.connect.to('API_BUSINESS_PARTNER');

    // Manejo de la entidad "participant"
    this.on('READ', 'participant', async (req) => {
        console.log('Participant Query:', JSON.stringify(req.query));
        try {
            return await bupa.run(req.query);
        } catch (error) {
            console.error('Error fetching participants:', error);
            throw error;
        }
    });

    // Manejo de la entidad "event"
    this.on('READ', 'event', async (req) => {
        console.log('Event Query:', JSON.stringify(req.query));
        try {
            return await bupa.run(req.query);
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    });
});