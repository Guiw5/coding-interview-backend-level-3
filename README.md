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

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/Guiw5/coding-interview-backend-level-3
cd coding-interview-backend-level-3
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env 
cp .env.example .devcontainer/.env
```

## 🛠️ Development

### Using DevContainer (Recommended)

The project includes a DevContainer configuration that provides a consistent development environment with:
- Node.js 20
- PostgreSQL for development db
- PostgreSQL for testing db
- All necessary tools pre-installed

To use the DevContainer:
1. Open the project in VS Code
2. Press F1 and select "Dev Containers: Rebuild and Reopen in Container"
3. Wait for the container to build and start

### Available Commands (in DevContainer)
- `npm run start`: Starts the server in development mode with hot-reload
- `npm run test`: Runs end-to-end (e2e) tests
- `npm run test:unit`: Runs unit tests
- `npm run build`: Compiles the TypeScript project to JavaScript


### Using Local Environment
ensure you have added 127.0.0.1 postgres in /etc/hosts file
```bash
echo "127.0.0.1 postgres" | sudo tee -a /etc/hosts
```

### Available Commands (out DevContainer)
- `npm run start:local`: Starts the server in development mode with hot-reload
- `npm run test:local`: Runs end-to-end (e2e) tests
- `npm run test:unit`: Runs unit tests
- `npm run build`: Compiles the TypeScript project to JavaScript


## 📁 Project Structure

```
.devcontainer/
├── .env                # Environment variables for development (example copy)
|── devcontainer.json   # DevContainer context configuration
|── docker-compose.yml  # DevContainer services setup
└── Dockerfile          # DevContainer context builder

e2e/
├── index.test.ts  # End-to-end tests
|── jest.config.js # jest configuration
|── jest.setup.ts  # e2e db environment variables
└── setup.ts       # e2e db initialization

src/
├── __tests__/     # Unit tests
├── api/           # Routes and API configuration
├── config/        # Configurations (database, etc.)
├── controllers/   # Application controllers
├── entities/      # TypeORM entities/models
├── migrations/    # Database migrations
├── index.ts       # Application entry point
└── server.ts      # Server configuration

.env.example       # Environment variables 
Dockerfile         # Builder for production deployment
```

## 🧪 Testing

The project includes two types of tests:

### Unit Tests
Unit tests are located in `src/__tests__/` and can be run with:
```bash
npm run test:unit
```

### End-to-End Tests
End-to-end tests are located in `e2e/` and can be run with:
In Devcontainer
```bash
npm test
```
or Local env
```bash
npm test:local
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
