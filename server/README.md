# 🧠 Server — Node.js + Express + MongoDB

The **backend server** for the Metaverse App provides secure authentication, real-time communication, and API endpoints to support a fully interactive 2D virtual office experience.

---

## 🚀 Features

- 🔗 **RESTful API** built on [Express](https://expressjs.com/)
- 🧠 **Real-time WebSocket communication** using [Socket.IO](https://socket.io/)
- 🔐 **JWT-based authentication** with session support
- 🗃️ **MongoDB integration** using [Mongoose](https://mongoosejs.com/)
- 🧂 **Password hashing** with [bcrypt](https://www.npmjs.com/package/bcrypt)
- 🛡️ **Secure sessions** with [express-session](https://www.npmjs.com/package/express-session) + [connect-mongo](https://www.npmjs.com/package/connect-mongo)
- 🌐 **CORS configuration** for safe frontend-backend communication
- 🧪 Clean, modular structure with custom middleware, controllers, and models
- 🔧 Configurable using [dotenv](https://www.npmjs.com/package/dotenv)

---

## 📁 Project Structure

server/
├── app.js # Entry point of the backend
├── config/ # Environment variables, DB config
│ └── db.js # MongoDB connection logic
├── controllers/ # Business logic for routes
├── middleware/ # Custom auth, error, session handlers
├── models/ # Mongoose schemas and models
├── routes/ # Route definitions and routers
├── package.json # Scripts and dependencies
└── .env # Environment variables (not committed)

yaml
Copy
Edit

---

## 📦 Core Dependencies

| Package              | Purpose                                  |
|----------------------|------------------------------------------|
| `express`            | RESTful API framework                    |
| `mongoose`           | ODM for MongoDB                          |
| `socket.io`          | Real-time WebSocket communication        |
| `jsonwebtoken`       | JWT-based user authentication            |
| `express-session`    | Session management                       |
| `connect-mongo`      | MongoDB-backed session store             |
| `bcrypt`             | Secure password hashing                  |
| `cors`               | Handles cross-origin resource sharing    |
| `dotenv`             | Environment variable configuration       |
| `date-fns`           | Date and time formatting                 |
| `nodemon` (dev)      | Dev server auto-restart on code changes  |

_Refer to the full list in [`package.json`](./package.json)._

---

## 🛠️ Customization Tips

- **Database Configuration:** Edit `config/db.js` and `.env` to update DB URI and connection settings.
- **Route Logic:** Extend or update route handlers in `controllers/` and define new endpoints in `routes/`.
- **Socket Events:** Add custom socket event handling in your main `app.js` or dedicated socket logic file.
- **Security:** Use additional middleware for input validation and rate limiting in production.

---

## 📄 License

This project is licensed under the [ISC License](../LICENSE).

---

## 👤 Author

- **Shiva Chary**  
  GitHub: [@ShivaChary1](https://github.com/ShivaChary1)

---

> ⭐ Found this useful? Don’t forget to star the repo!
