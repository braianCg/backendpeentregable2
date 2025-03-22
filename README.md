Backend para Gestión de Productos y Carritos
Este proyecto es una API backend desarrollada con Node.js, Express, MongoDB y Socket.IO. Permite gestionar productos y carritos de compras, con funcionalidades como agregar, eliminar y actualizar productos, así como comunicación en tiempo real para actualizaciones dinámicas.

Características
CRUD de productos (Crear, Leer, Actualizar, Eliminar).
Gestión de carritos de compras.
Comunicación en tiempo real con Socket.IO.
Persistencia de datos en MongoDB.
Vistas dinámicas con Handlebars.
Validación de datos y manejo de errores.
Requisitos Previos
Antes de comenzar, asegúrate de tener instalado lo siguiente:

Node.js (versión 16 o superior).
MongoDB (local o en la nube, como MongoDB Atlas).
Git.
Instalación
Clona este repositorio:

git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

Instala las dependencias:

npm install

Configura las variables de entorno:

PORT=3006
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/<base_de_datos>?retryWrites=true&w=majority

Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
Inicia el servidor:

npm run dev

Accede a la aplicación en tu navegador:

http://localhost:3006

Estructura del Proyecto

backendpeentregable2/
├── src/
│   ├── controllers/       # Controladores para manejar la lógica de negocio
│   │   ├── product.controller.js
│   │   └── cart.controller.js
│   ├── data/              # Archivo JSON para persistencia local
│   │   └── products.json
│   ├── db/                # Configuración de la base de datos
│   │   └── index.js
│   ├── models/            # Modelos de Mongoose
│   │   ├── products.model.js
│   │   └── cart.model.js
│   ├── public/            # Archivos estáticos (JS, CSS, imágenes)
│   ├── routes/            # Rutas de la API
│   │   ├── products.routes.js
│   │   └── cart.routes.js
│   ├── utils/             # Funciones auxiliares
│   │   └── fileUtils.js
│   ├── views/             # Plantillas de Handlebars
│   │   ├── home.handlebars
│   │   └── realTimeProducts.handlebars
│   └── server.js          # Archivo principal del servidor
├── .env                   # Variables de entorno
├── package.json           # Dependencias y scripts
└── README.md              # Documentación del proyecto


Endpoints de la API
Productos
GET /api/products
Obtiene todos los productos con soporte para paginación, filtros y orden.

Parámetros opcionales: limit, page, sort, query.
POST /api/products
Crea un nuevo producto.

PUT /api/products/:id
Actualiza un producto existente.

DELETE /api/products/:id
Elimina un producto por su ID.

Carritos
GET /api/carts
Obtiene todos los carritos.

POST /api/carts/:cid/product/:pid
Agrega un producto a un carrito.

DELETE /api/carts/:cid/product/:pid
Elimina un producto de un carrito.

DELETE /api/carts/:cid
Vacía un carrito.

Vistas
Home (/):
Muestra una lista de productos.

RealTimeProducts (/realtimeproducts):
Muestra productos en tiempo real utilizando Socket.IO.

Tecnologías Utilizadas
Node.js: Entorno de ejecución para JavaScript.
Express: Framework para construir la API REST.
MongoDB: Base de datos NoSQL para persistencia de datos.
Mongoose: ODM para interactuar con MongoDB.
Socket.IO: Comunicación en tiempo real.
Handlebars: Motor de plantillas para vistas dinámicas.
dotenv: Manejo de variables de entorno.
Scripts Disponibles
npm start: Inicia el servidor en modo producción.
npm run dev: Inicia el servidor en modo desarrollo con reinicio automático (nodemon).
Pruebas
Puedes probar los endpoints de la API utilizando herramientas como Postman o Thunder Client.

Contribuciones
Si deseas contribuir a este proyecto:

Haz un fork del repositorio.
Crea una rama para tu funcionalidad (git checkout -b feature/nueva-funcionalidad).
Realiza un commit de tus cambios (git commit -m "Agrega nueva funcionalidad").
Haz un push a tu rama (git push origin feature/nueva-funcionalidad).
Abre un Pull Request.
Licencia
Este proyecto está bajo la Licencia MIT. Puedes consultar el archivo LICENSE para más detalles.

Autor
Desarrollado por Braian Perez.
Si tienes preguntas o sugerencias, no dudes en contactarme.