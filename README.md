# Coding Interview Backend Level 3

This project is a REST API developed with Node.js, TypeScript, and Hapi.js, designed to manage a list of items.

## 🚀 Technologies

- Node.js
- TypeScript
- Hapi.js (Web Framework)
- TypeORM (ORM)
- SQLite3 (Database)
- Jest (Testing)

## 📋 Prerequisites

- Node.js (v20 or higher)
- npm (v9 or higher)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd coding-interview-backend-level-3
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run migrations:
```bash
npm run migration:run
```

## 🛠️ Available Scripts

- `npm run dev`: Starts the server in development mode with hot-reload
- `npm run start`: Starts the server in production mode
- `npm run build`: Compiles the TypeScript project to JavaScript
- `npm test`: Runs end-to-end tests
- `npm run migration:create`: Creates an empty migration file
- `npm run migration:generate`: Generates a new migration
- `npm run migration:run`: Runs pending migrations
- `npm run migration:revert`: Reverts the last migration

## 📁 Project Structure

```
src/
├── api/           # Routes and API configuration
├── config/        # Configurations (database, etc.)
├── controllers/   # Application controllers
├── entities/      # TypeORM entities/models
├── migrations/    # Database migrations
├── index.ts       # Application entry point
└── server.ts      # Server configuration
```

## 🔄 Database Migrations

When you make changes to your entities, you can generate a new migration:

```bash
npm run migration:generate --name=NewUpdate
```

Or create an empty migration file:

```bash
npm run migration:create --name=NewMigration
```

This will create a new migration file in `src/migrations/` with the timestamp and the name you provided.

## 🧪 Testing

e2e + unit testing

## 📦 Build

To compile the project:

```bash
npm run build
```

The compiled code will be generated in the `dist/` folder.

## 📄 License

This project is licensed under the ISC License.
