# My E-Commerce API

Este es un proyecto para gestionar un comercio electrónico. Utiliza Node.js, Express y MongoDB para crear una API que permite realizar operaciones CRUD en productos, carros de compra y mensajes.

## Requisitos previos

- Node.js (versión 14 o superior)
- MongoDB

## Instalación

1. Clona este repositorio en tu máquina local, luego ingresa al directorio del proyecto: practica-integradora-1

```bash
git clone https://github.com/Primo18/coderhouse-backend
cd coderhouse-backend
cd pre-entrega-2
```

1. Instala las dependencias del proyecto:

```bash
npm install
```

## Uso

1. Inicia el servidor:

```bash
npm start
```

2. Abre el navegador en la dirección http://localhost:8080
3. Puedes usar herramientas como Postman para realizar peticiones HTTP a la API.

## Ejemplos de uso de la API 

### Agregar un producto
![01  add product](img-readme/01.%20add%20product.png)
### Obtener todos los productos
![02 products](img-readme/02.%20products.png)
### Mostar el carrito
![03  cart](img-readme/03.%20cart.png)
### Obtener productos por la API
![04  products API](img-readme/04.%20products%20API.png)
### Filtrar productos 
![05  filtro productos](img-readme/05.%20filtro%20productos.png)


## Endpoints de carts.routes.js

| Método | Ruta                | Descripción                                      |
| ------ | ------------------- | ------------------------------------------------ |
| GET    | /                   | Obtener todos los carritos                       |
| GET    | /:cid               | Obtener un carrito por id                        |
| POST   | /                   | Crear un carrito                                 |
| PUT    | /:cid               | Actualizar un carrito entero                     |
| DELETE | /:cid               | Vaciar un carrito                                |
| POST   | /:cid/products      | Agregar un producto a un carrito                 |
| PUT    | /:cid/products/:pid | Actualizar la cantidad de un producto específico |
| DELETE | /:cid/products/:pid | Eliminar un producto específico del carrito      |

## Endpoints de products.routes.js

| Método | Ruta | Descripción                      |
| ------ | ---- | -------------------------------- |
| GET    | /    | Obtener todos los productos      |
| GET    | /:id | Obtener un producto por su ID    |
| POST   | /    | Agregar un nuevo producto        |
| PUT    | /:id | Actualizar un producto por su ID |
| DELETE | /:id | Eliminar un producto por su ID   |

## Endpoints de messages.routes.js

| Método | Ruta   | Descripción                  |
| ------ | ------ | ---------------------------- |
| POST   | /      | Agregar un nuevo mensaje     |
| GET    | /      | Obtener todos los mensajes   |
| GET    | /:user | Obtener mensajes por usuario |


## Endpoints de views.routes.js

| Método | Ruta              | Descripción                                   |
| ------ | ----------------- | --------------------------------------------- |
| GET    | /                 | Mostrar la página principal                   |
| GET    | /realtimeproducts | Mostrar la página de productos en tiempo real |
| GET    | /chat             | Mostrar la página de chat                     |
| GET    | /products         | Mostrar la página principal                   |
| GET    | /carts/:cid       | Mostrar la página de carrito específico       |
