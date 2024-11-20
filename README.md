
# FXQL API

A simple API for managing foreign exchange (FX) operations using currency pairs with BUY, SELL, and CAP values.

---

## Features

- Validate and process FXQL statements.
- Custom validation for currency pairs and transactions.
- Developed using the NestJS framework.

---

### Prerequisites

- **Node.js** (v16 or later)
- **npm** (v8 or later)
- **PostgreSQL** (or a database supported by Prisma)

---

### Installation and Setup Instructions

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Brownei/fxql-api.git
   cd fxql-api
    ```
2. **Install all dependencies**
    ```bash
    npm install
    ```
3.  **Setup environmental variables**
    Create a .env file in the root directory. Use the .env.example file as a template and provide the required values:
    ```bash
    DATABASE_URL=""
    PORT=8000
    ```
4.  **Setup database**
    ```bash
    npx prisma migrate dev --name initialize
    ```
5.  **You can start your server**
    ```bash
    npm run start:dev
    ```
---

### Design Assumptions
This project follows a straightforward and simple design structure, where a "Statement" table is created in the database to manage the core data. The table is designed to accept the following variables:

- Source Currency (CURR1): The currency being exchanged from.
- Destination Currency (CURR2): The currency being exchanged to.
- Buy Price: The price at which the currency can be purchased.
- Sell Price: The price at which the currency can be sold.
- Cap Amount: The maximum allowable transaction amount.

All these variables are stored directly in the database without additional constraints, allowing for flexibility in handling data.

It is important to note that the currencies are not unique in this table. This is due to the pre-existing structure and the design considerations made during initial development, prioritizing simplicity and flexibility.

There is a folder in the src directory called "validator" which holds how the validation is done on the dto

---


