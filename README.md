# User Settings Management API

A clean, asynchronous RESTful API built with **Node.js** and **Express.js** designed to handle user preference configurations. This service utilizes local filesystem JSON persistence without relying on external databases, featuring complete input validation, dynamic timestamps, and structured console logging.

---

## Key Features

* **File-Based Persistence**: Uses Node.js asynchronous `fs/promises` module wrapped in `try/catch` blocks for robust error handling.
* **Input Validation**: Strict request payload validation for supported enums (`EN`, `UR`), boolean types, and required fields.
* **Data Integrity**: Enforces unique `userId` checking on record creation to prevent duplicates.
* **Automated Timestamps**: Dynamically generates and manages `createdAt` and `updatedAt` ISO date strings.
* **Structured Logging**: Logs real-time operation updates to the console for monitoring.

---

## Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Environment Configuration**: Dotenv
* **Development Utility**: Nodemon

---

## Data Structure (`UserSettings`)

| Field | Type | Rules / Options |
| :--- | :--- | :--- |
| `userId` | String | **Required**, **Unique** |
| `language` | Enum | Allowed values: `EN`, `UR` |
| `notificationsEnabled` | Boolean | `true` or `false` |
| `timezone` | String | Valid IANA Timezone string (e.g., `Asia/Karachi`) |
| `createdAt` | ISO Date String | Auto-generated on record creation |
| `updatedAt` | ISO Date String | Auto-generated on creation & updates |

---

## API Endpoints Summary

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/settings/:userId` | Retrieve settings for a specific user | `200`, `404`, `500` |
| `POST` | `/api/settings` | Create a new user settings entry | `201`, `400`, `409`, `500` |
| `PUT` | `/api/settings/:userId` | Update existing user settings | `200`, `400`, `404`, `500` |
| `DELETE` | `/api/settings/:userId` | Remove a user settings entry | `200`, `404`, `500` |

---

## Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5500
Installation & Running Locally
Clone the Repository

Bash
git clone [https://github.com/YOUR_USERNAME/user-settings-core-api.git](https://github.com/YOUR_USERNAME/user-settings-core-api.git)
cd user-settings-core-api
Install Dependencies

Bash
npm install
Start the Development Server

Bash
npm run dev
The API will start running at http://localhost:5500.

Sample Request Payload (POST)
JSON
{
  "userId": "usr_102",
  "language": "UR",
  "notificationsEnabled": true,
  "timezone": "Asia/Karachi"
}

👤 Author

Name: Najma Chaudhary

Role: Full-Stack Web Developer 

GitHub: @Najma-web-cell