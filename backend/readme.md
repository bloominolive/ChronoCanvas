# ChronoCanvas API

## 🌟 Descripción
ChronoCanvas es una API RESTful diseñada para gestionar registros históricos de la Iglesia de Jesucristo de los Santos de los Últimos Días. Esta API proporciona endpoints para manejar registros históricos, dedicaciones de templos y gestión de usuarios.

## 🚀 Características Principales

- **Gestión de Registros Históricos**: CRUD completo para eventos históricos de la Iglesia
- **Dedicaciones de Templos**: Manejo de información sobre dedicaciones de templos
- **Sistema de Autenticación**: Soporte para JWT y OAuth 2.0 (GitHub)
- **Documentación Swagger**: API completamente documentada
- **Seguridad Robusta**: Middleware de autenticación y validación
- **Manejo de Sesiones**: Implementación de sesiones con MongoDB

## 🛠️ Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- Passport.js
- Swagger
- bcryptjs
- express-validator

## 📋 Prerrequisitos

- Node.js (v14 o superior)
- MongoDB
- Git
- Cuenta en GitHub (para autenticación OAuth)

## ⚙️ Configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/your-username/ChronoCanvas.git
   cd ChronoCanvas
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   JWT_SECRET=tu_clave_super_segura
   JWT_EXPIRATION=1h
   CALLBACK_URL=http://localhost:3001/auth/github/callback
   GITHUB_CLIENT_ID=tu_client_id
   GITHUB_CLIENT_SECRET=tu_client_secret
   MONGODB_URL=tu_url_mongodb
   PORT=3001
   FRONTEND_URL=http://localhost:3000
   BASE_URL=http://localhost:3001
   NODE_ENV=development
   SESSION_SECRET=tu_secreto_seguro
   ```

## 🚀 Iniciar el Proyecto

1. **Desarrollo**
   ```bash
   npm run dev
   ```

2. **Producción**
   ```bash
   npm start
   ```

## 📚 Documentación de la API

La documentación completa de la API está disponible en Swagger:
- Local: `http://localhost:3001/swagger/api-docs`
- Producción: `https://tu-dominio.com/swagger/api-docs`

### Endpoints Principales

#### Autenticación
- `POST /auth/register` - Registro de usuarios
- `POST /auth/login` - Inicio de sesión
- `GET /auth/github` - Autenticación con GitHub
- `GET /auth/verify` - Verificación de token

#### Registros Históricos
- `GET /ldsChurchHistory` - Obtener todos los registros
- `GET /ldsChurchHistory/:id` - Obtener registro específico
- `POST /ldsChurchHistory` - Crear nuevo registro
- `PUT /ldsChurchHistory/:id` - Actualizar registro
- `DELETE /ldsChurchHistory/:id` - Eliminar registro

#### Dedicaciones de Templos
- `GET /templeDedications` - Obtener todas las dedicaciones
- `GET /templeDedications/:id` - Obtener dedicación específica
- `POST /templeDedications` - Crear nueva dedicación
- `PUT /templeDedications/:id` - Actualizar dedicación
- `DELETE /templeDedications/:id` - Eliminar dedicación

#### Usuarios
- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener usuario específico
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

## 🔒 Autenticación

El sistema implementa dos métodos de autenticación:

1. **JWT (JSON Web Tokens)**
   - Usado para API endpoints
   - Token expires en 1 hora por defecto
   - Requiere email y password

2. **OAuth con GitHub**
   - Autenticación social
   - No requiere password
   - Crea automáticamente cuenta de usuario

## 🔐 Seguridad

- Passwords hasheados con bcrypt
- Validación de datos con express-validator
- Protección contra XSS y CSRF
- Rate limiting implementado
- Sesiones seguras con MongoDB

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una nueva rama (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## ✍️ Autor

Samuel Chacon
- GitHub: [@sechafer](https://github.com/sechafer)

## 📞 Soporte

Para soporte y preguntas, por favor abrir un issue en el repositorio de GitHub.