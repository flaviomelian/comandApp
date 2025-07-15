# 🧾 ComandApp

**ComandApp** es una aplicación para la toma y gestión de comandas en restaurantes. Permite a los camareros registrar pedidos por mesa y visualizarlos en tiempo real desde la cocina u otros puntos del servicio.

---

## 🚀 Características principales

* Gestión de mesas (estado, capacidad, ubicación)
* Visualización y edición de menús y platos
* Toma de comandas por mesa y usuario
* Vista de comandas para cocina/bar
* Relación entre usuarios, comandas y platos
* Backend modular con Sequelize y Express

---

## 🛠️ Tecnologías

* **Node.js** + **Express** – Backend
* **Sequelize** – ORM y modelo relacional
* MySQL – Base de datos
* **Next.js** – (Frontend en desarrollo)
* **TailwindCSS** – Estilos rápidos y responsivos

---

## 📁 Estructura del proyecto

backend/

      ├───api

      │          └───controller

      │           |               ├ auth.controller.js 

      │           |               ├ command.controller.js                                 

      │           |               ├ dish.controller.js

      │           |               ├ item-command.controller.js

      │           |               ├ menu.controller.js

      │           |               ├ table.controller.js

      │           |               └ user.controller.js

      │          ├───middlewares

      │           |               └ auth.js

      │          ├───model

      │           |               ├ command.model.js              

      │           |               ├ dish.model.js

      │           |               ├ item-command.model.js

      │           |               ├ menu.model.js

      │           |               ├ table.model.js

      │           |               └ user.model.js

      │          └───routes

      │                          ├ command.route.js

      │                          ├ dish.route.js

      │                          ├ item-command.route.js

      │                          ├ menu.route.js

      │                          ├ table.route.js

      │                          └ user.route.js

      └───db

                  ├─ index.js

                  └─ relations.js
