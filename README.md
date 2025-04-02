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
- Docker and Docker Compose (optional)
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
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=items_db

# Test Database
TEST_DB_NAME=items_db_test
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

## 🛠️ Available Scripts

### Development
- `npm run build`: Compiles the TypeScript project to JavaScript

### Docker
- `npm run docker:start`: Starts and rebuilds Docker containers 
- `npm run docker:restart`: Restarts Docker containers

### Database
- `npm run migration:create`: Creates an empty migration file
- `npm run migration:generate`: Generates a new migration based on entity changes
- `npm run migration:run`: Runs pending migrations
- `npm run migration:revert`: Reverts the last migration

### Testing
- `npm test`: Runs end-to-end tests
- `npm run test:unit`: Runs unit tests

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

## 📚 API Documentation

The API documentation is available through Swagger UI when the server is running:
- Development: http://127.0.0.1:3000/documentation
- Production: https://eldoradochallengue.onrender.com/documentation

## 🧪 Testing

The application uses a separate PostgreSQL database for tests to avoid interfering with development data.

e2e
```bash
# Run tests
npm test
```

unit testing
```bash
# Run tests
npm test:unit
```

## 📦 Build

To compile the project:

```bash
npm run build
```

The compiled code will be generated in the `dist/` folder.

## 📄 License

This project is licensed under the ISC License.
