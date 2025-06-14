--> Este proyecto es un ecommerce desarrollado con Node.js, Express y MongoDB. Implementa autenticación con JWT, autorización por roles, patrón Repository, DTOs, lógica de compra con tickets y sistema de recuperación de contraseña con enlace por correo.


Tecnologías:
Node.js + Express

MongoDB Atlas + Mongoose

Passport (estrategia JWT)

React (Vite) para el frontend

Nodemailer (Ethereal para testing)

Handlebars (vistas opcionales del backend)


Configuración:
1. Clonar el repositorio
git clone https://github.com/tu-usuario/entregaFinalBackendII.git
cd entregaFinalBackendII

2. Backend
Instalación: npm install

Variables de entorno: creación un archivo .env

Ejecutar el backend: npm start

3. Frontend
cd front
npm install
npm run dev

App React en: http://localhost:5173


Funcionalidades principales:
Registro y login con JWT

Middleware de autorización por roles (admin, user)

CRUD de productos y carritos

Lógica de compra con verificación de stock y generación de ticket

Recuperación de contraseña con enlace por correo (expira en 1 hora)

Protección de datos sensibles con DTO

Patrón Repository y arquitectura profesional