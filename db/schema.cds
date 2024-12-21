using { managed } from '@sap/cds/common';
//using { API_BUSINESS_PARTNER as bupa } from '../srv/external/API_BUSINESS_PARTNER';

namespace sap.cap.eventmanaged;
// Entidad principal: Eventos
entity Events : managed {
    key ID                 : Integer;
        Name               : String(100) not null;
        StartDate          : Date not null;
        EndDate            : Date not null;
        Location           : String(200) not null;
        Description        : String(1000);
        IsActive           : Boolean default true not null;
        IsCancelled        : Boolean default false not null;
        CancellationReason : String(500);
        registrations      : Association to many EventParticipants on registrations.event = $self;
}

// Entidad principal: Participantes
entity Participants : managed {
    key ID                : Integer;
        FirstName         : String(100) not null;
        LastName          : String(100) not null;
        Email             : String(200) not null;
        Phone             : String(50);
        BusinessPartnerID : String(50) not null;
        registrations     : Association to many EventParticipants on registrations.participant = $self;
}

// Tabla pivote: Relación entre Eventos y Participantes
entity EventParticipants {
    key event            : Association to Events;
    key participant      : Association to Participants;
    registrationDate     : DateTime default $now;
}
