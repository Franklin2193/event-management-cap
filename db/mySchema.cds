using { API_BUSINESS_PARTNER as bupa } from '../srv/external/API_BUSINESS_PARTNER';

entity Events as projection on bupa.A_BusinessPartner {
    key BusinessPartner as ID,
    BusinessPartnerName as User_Name,
    BusinessPartnerCategory as Event_Category,
    SearchTerm1 as Event_name,
    CreatedByUser as CreatedByUser,
    CreationDate as CreatedAt,
    Supplier as Company,
    IsFemale as EventIsCancelled,
    FirstName,
    LastName,
}

