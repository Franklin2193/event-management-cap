Event Management App

Descripción:
Una aplicación de gestión de eventos desarrollada utilizando el SAP Cloud Application Programming (CAP) Model y conectada a SAP HANA Cloud. Esta aplicación permite la creación de eventos, la gestión de participantes y la asignación de roles dentro de cada evento. Además, incluye validaciones de Business Partner (BP) a través de la API de SAP Business Partner.

Tecnologías

	•	SAP Cloud Application Programming (CAP) Model
	•	SAP HANA Cloud como base de datos
	•	Node.js (para el backend)
	•	SAP Business Technology Platform (BTP)
	•	SAP Business Partner API

Características

	•	Gestión de Eventos:
	•	Crear, actualizar, y cancelar eventos.
	•	Reabrir eventos cancelados.
	•	Ver detalles de eventos activos o cancelados.
	•	Gestión de Participantes:
	•	Registrar nuevos participantes en los eventos.
	•	Validación de Business Partner antes de agregar un participante.
	•	Asociar participantes a eventos específicos.
	•	Integración con SAP Business Partner:
	•	Verificar si un Business Partner es válido y no está bloqueado.
	•	Validar que los participantes sean Business Partners válidos en el sistema de SAP.

Requisitos

	•	Node.js (versión >= 14.x)
	•	SAP HANA Cloud (instancia configurada y conectada)
	•	SAP BTP cuenta (con acceso a la API Business Partner)

    npm install

Iniciar la aplicación localmente

    cds w

Conectar a SAP Cloud Foundry

    Asegúrate de que tienes configurado el espacio y la organización correctos

    cds add hana -for production

Configuración autentificación

    cds add xsuaa --for production

Agregar MTA

    cds add mta

Freezar dependencias

    npm update --package-lock-only

Cómo ejecutar los tests

    Los tests están definidos en archivos test.http que puedes ejecutar usando Postman autentificando las credenciales o VS Code con la extensión de HTTP Requests.

URL de la app desplegada en BTP

    https://39fffc2ctrial-dev-event-management-fk-srv.cfapps.us10-001.hana.ondemand.com/

