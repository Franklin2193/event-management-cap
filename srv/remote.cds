//using { API_BUSINESS_PARTNER as bupa } from './external/API_BUSINESS_PARTNER'; //Definición de datamodel
using { Events } from '../db/mySchema'; //Vamos a usar esta entidad que 

service myBupa {
    //entity myBusinessPartner as projection on bupa.A_BusinessPartner;  //Definición de servicio y hacemos una proyección, sale de la documentación la entidad principal 
   entity event as projection on Events;
}


