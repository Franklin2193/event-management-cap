//using { managed } from '../db/schema'; // Ajusta la ruta según la ubicación de `schema.cds`
using { sap.cap.eventmanaged as my } from '../db/schema';

service EventManagement {
    // Entity for Events
    entity Events as projection on my.Events {
        *,
        registrations : redirected to EventParticipants
    }
    actions {
        action cancelEvent(reason : String) returns Events;
        action reopenEvent() returns Events;
    };

    // Entity for Participants
    entity Participants as projection on my.Participants {
        *,
        registrations : redirected to EventParticipants
    }
    actions {
        action fetchParticipantDetails() returns { BusinessPartner : String; };
        action updateParticipant(
            FirstName : String,
            LastName  : String,
            Email     : String,
            Phone     : String
        ) returns Participants;
    };

    // Pivot table for event-participant relationships
    entity EventParticipants as projection on my.EventParticipants;

    // Service-level actions
    action createParticipant(
        BusinessPartnerID : String,
        FirstName         : String,
        LastName          : String,
        Email             : String,
        Phone             : String
    ) returns Participants;

    action registerParticipant(
        eventId        : Integer,
        participantId  : Integer
    ) returns Participants;

    function getEventParticipants(eventId : Integer) returns {
        event : EventInfo;
        participants : many ParticipantInfo;
    };

    // Types for event and participant information
    type ParticipantInfo {
        ID                : Integer;
        FirstName         : String;
        LastName          : String;
        Email             : String;
        Phone             : String;
        BusinessPartnerID : String;
        registrationDate  : DateTime;
    };

    type EventInfo {
        ID                 : Integer;
        Name               : String;
        Description        : String;
        StartDate          : Date;
        EndDate            : Date;
        Location           : String;
        IsActive           : Boolean;
        IsCancelled        : Boolean;
        CancellationReason : String;
    };
}