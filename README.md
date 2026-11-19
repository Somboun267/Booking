Meeting Room Booking System (Backend)

A RESTful API for a Meeting Room Booking System built with Node.js, Express.js, Prisma ORM, and MySQL.

This system allows customers to register, authenticate, browse meeting rooms, make reservations, manage customer profiles, and save favorite rooms.

The application uses Docker and Docker Compose to containerize the backend and MySQL database.

Features

Authentication
Customer registration and login.
Password hashing using Bcrypt.

JWT authentication.
Protected API routes.
Profile image upload.

Room Management

Retrieve all meeting rooms.
Create, update, and delete rooms.
Upload multiple room images.
Manage room information and availability status.

Booking Management

Create meeting room reservations.
Retrieve booking records.
Update booking information.
Delete bookings.
Select meeting equipment.

Customer Management

Retrieve customer information.
Update customer profiles.
Upload profile images.
Delete customer accounts.

Favorite Management

Add rooms to favorites.
Retrieve favorite rooms.
Update favorite records.
Remove favorite rooms.

Technologies Used

Node.js 22
Express.js
JavaScript
MySQL 8.0
Prisma ORM
JWT (JSON Web Token)
Bcrypt
Swagger JSDoc
Swagger UI
Multer
Docker
Docker Compose

Database Design

The project uses MySQL with Prisma ORM to manage database models and relationships.

Database Models

| Model | Description |
|---|---|
| Customer | Stores customer account information |
| Profile | Stores customer profile details |
| Room | Stores meeting room information |
| Image | Stores room image information |
| Booking | Stores meeting room reservations |
| Favorite | Stores customers' favorite rooms |

Database Relationships

One Customer has one Profile.
One Customer can have multiple Bookings.
One Customer can have multiple Favorites.
One Room can have multiple Images.
One Room can have multiple Bookings.
One Room can have multiple Favorites.

API Endpoints

All API endpoints use the `/api` base path.

Authentication

| Method | Endpoint | Description |
| | | |
| POST | `/api/register` | Register a new customer |
| POST | `/api/login` | Customer login |

Room Management

| Method | Endpoint | Description |
| | | |
| GET | `/api/rooms` | Get all rooms |
| POST | `/api/room` | Create a new room |
| PUT | `/api/room/:id` | Update a room |
| DELETE | `/api/room/:id` | Delete a room |

Booking Management

| Method | Endpoint | Description |
| | | |
| GET | `/api/book` | Get all bookings |
| POST | `/api/book` | Create a booking |
| PUT | `/api/book/:id` | Update a booking |
| DELETE | `/api/book/:id` | Delete a booking |

Customer Management

| Method | Endpoint | Description |
| | | |
| GET | `/api/customer` | Get all customers |
| PUT | `/api/customer/:id` | Update customer information |
| DELETE | `/api/customer/:id` | Delete a customer |

Favorite Management

| Method | Endpoint | Description |
| | | |
| GET | `/api/favorites` | Get all favorites |
| POST | `/api/favorite` | Add a favorite |
| PUT | `/api/favorite/:id` | Update a favorite |
| DELETE | `/api/favorite/:id` | Delete a favorite |

API Documentation (Swagger)

This project uses Swagger JSDoc and Swagger UI with OpenAPI 3.0.0 to document and test RESTful APIs.

Swagger UI

Access the interactive API documentation:

```text
http://localhost:4000/apidocs
```

API Base URL

```text
http://localhost:4000/api
```

Swagger Features

Interactive API documentation.
API endpoint descriptions.
Request parameters and response schemas.
JWT Bearer Authentication.
Test REST API endpoints directly.
JSON and multipart/formdata support.
File upload testing.

Docker Configuration

The project uses Docker to containerize the Node.js backend application and MySQL database.

Dockerfile

The backend Docker image uses Node.js 22.

```dockerfile
FROM node:22

WORKDIR /usr/src/app

Copy package files
COPY package*.json ./

Install dependencies
RUN npm install

Copy source code
COPY . .

Generate Prisma Client for Linux
RUN npx prisma generate

Expose application port
EXPOSE 3000

Start server
CMD ["node", "server.js"]
```

Docker Compose

The project uses two services:

| Service | Technology | Port |
| | | |
| iqbook | Node.js 22 | 4000:3000 |
| db | MySQL 8.0 | 3333:3306 |

Docker Volumes

`db_data`: Stores persistent MySQL database data.
`uploads`: Stores uploaded profile images.

Run with Docker Compose

Build and start the application:

```bash
docker compose up --build
```

Run containers in the background:

```bash
docker compose up -d --build
```

Check running containers:

```bash
docker compose ps
```

View application logs:

```bash
docker compose logs -f
```

Stop containers:

```bash
docker compose down
```

Remove containers and volumes:

```bash
docker compose down -v
```

**Warning:** Removing volumes with `docker compose down v` will permanently delete the database data and uploaded files stored in those volumes.

Application URLs

Backend API:

```text
http://localhost:4000/api
```

Swagger Documentation:

```text
http://localhost:4000/apidocs
```

MySQL Database:

```text
localhost:3333
```

Local Development Setup

1.  Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

2.  Navigate to the project directory

```bash
cd YOUR_PROJECT_NAME
```

3.  Install dependencies

```bash
npm install
```

4.  Configure environment variables

Create a `.env` file in the project root directory.

```env
DATABASE_URL="mysql://root:root@localhost:3333/TestBook"
JWT_SECRET="your_secret_key"
```

5.  Generate Prisma Client

```bash
npx prisma generate
```

6.  Run database migrations

```bash
npx prisma migrate dev
```

7.  Start the server

```bash
npm start
```

Project Structure

```text
MeetingRoomBooking/
│
├── controllers/
├── routes/
├── middleware/
├── uploads/
├── Profileimages/
│
├── prisma/
│   └── schema.prisma
│
├── swagger.js
├── server.js
├── Dockerfile
├── dockercompose.yml
├── package.json
├── packagelock.json
├── .env
├── .env.example
├── .dockerignore
├── .gitignore
└── README.md
```

Author

**Kay**

Backend Developer
