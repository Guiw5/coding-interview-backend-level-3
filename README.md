# Coding Interview Backend Level 3

This project is a REST API developed with Node.js, TypeScript, and Hapi.js, designed to manage a list of items. It was developed as part of a coding challenge for El Dorado.

## 🎯 Challenge

This project was developed as part of a coding challenge. You can find the original challenge requirements in [CHALLENGE.md](./CHALLENGE.md).

## 🚀 Technologies

- Node.js
- TypeScript
- Hapi.js (Web Framework)
- TypeORM (ORM)
- PostgreSQL (Database)
- Jest (Testing)
- Docker

## 📋 Prerequisites

- Node.js (v20 or higher)
- npm (v9 or higher)
- Docker and Docker Compose
- VS Code with Remote Containers extension (optional)
- PostgreSQL (if running locally)

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
cp .env.example .env
```

Configure the following variables in your `.env` file:
```env
# Server
PORT=3000

# Database
PGPORT=5432
PGHOST=postgres
PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=items_db

# Test Database
TEST_PORT=5433
TEST_HOST=postgres_test

NODE_ENV=development

```

4. Set up the database:

Using Docker:
```bash
docker-compose up -d
```

5. Run migrations:
```bash
npm run migration:run
```

## 🛠️ Development

### Using DevContainer (Recommended)

The project includes a DevContainer configuration that provides a consistent development environment with:
- Node.js 20
- PostgreSQL for development
- PostgreSQL for testing
- All necessary tools pre-installed

To use the DevContainer:
1. Open the project in VS Code
2. Press F1 and select "Dev Containers: Rebuild and Reopen in Container"
3. Wait for the container to build and start

### Available Commands

#### Development
- `npm start`: Starts the server in development mode with hot-reload
- `npm run build`: Compiles the TypeScript project to JavaScript

#### Docker
- `npm run docker:start`: Starts and rebuilds Docker containers 
- `npm run docker:restart`: Restarts Docker containers

#### Database
- `npm run migration:create`: Creates an empty migration file
- `npm run migration:generate`: Generates a new migration based on entity changes
- `npm run migration:run`: Runs pending migrations
- `npm run migration:revert`: Reverts the last migration

#### Testing
- `npm test`: Runs end-to-end (e2e) tests
- `npm run test:unit`: Runs unit tests

## 📁 Project Structure

```
src/
├── __tests__/     # Unit tests
├── api/           # Routes and API configuration
├── config/        # Configurations (database, etc.)
├── controllers/   # Application controllers
├── entities/      # TypeORM entities/models
├── migrations/    # Database migrations
├── index.ts       # Application entry point
└── server.ts      # Server configuration

e2e/
├── index.test.ts  # End-to-end tests
|── setup.ts       # e2e db setup
└── jest.config.js # jest configuration
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

The project includes two types of tests:

### Unit Tests
Unit tests are located in `src/__tests__/` and can be run with:
```bash
npm run test:unit
```

### End-to-End Tests
End-to-end tests are located in `e2e/` and can be run with:
```bash
npm test
```

## 📚 API Documentation

The API documentation is available through Swagger UI when the server is running:
- Development: http://localhost:3000/documentation
- Production: https://eldoradochallengue.onrender.com/documentation

### Production Environment Notes
> ⚠️ **Important Note:** The production environment is hosted on Render.com and has a cold start behavior. The service may take up to 1 minute to wake up if there has been no recent traffic. The documentation will be available once the service is fully awake.

> 🔍 **Status Check:** You can verify the service status at: https://eldoradochallengue.onrender.com/ping

## 📦 Build

To compile the project:

```bash
npm run build
```

The compiled code will be generated in the `dist/` folder.

## 📄 License

This project is licensed under the ISC License.
