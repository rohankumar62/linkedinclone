"# linkedinclone" 
# LinkedIn Clone - Full Stack Application

## Overview
A professional LinkedIn-inspired social media application built with Spring Boot backend and React frontend. This project demonstrates a full-stack implementation with JWT authentication, PostgreSQL database, and a responsive UI.

## Tech Stack

### Backend
- **Spring Boot 3.1.5** - Main framework
- **Spring Security** - JWT authentication
- **Spring Data JPA** - Database ORM
- **PostgreSQL** - Database
- **Maven** - Dependency management
- **Lombok** - Reducing boilerplate code

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

## Features Implemented

### Authentication & Authorization
- User registration with email and password validation
- JWT-based login system
- Secure token-based authentication
- Password encryption with BCrypt
- Protected routes and API endpoints

### User Management
- User profiles with name, email, and bio
- Profile display in navigation bar
- View any user's profile and their posts

### Post Management
- Create text posts
- Upload images with posts
- Edit own posts
- Delete own posts
- Posts sorted by latest first
- Display user name and timestamp

### Social Interactions
- Like/unlike posts (toggle functionality)
- Comment on posts
- View comment count and like count
- Comments sorted by latest first

### UI/UX
- LinkedIn-inspired blue color scheme
- Responsive design
- Clean and professional interface
- Real-time updates after actions

## Project Structure

```
├── backend/                    # Spring Boot backend
│   ├── src/main/java/com/linkedin/clone/
│   │   ├── config/            # Security and web configuration
│   │   ├── controller/        # REST API endpoints
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── model/            # JPA entities
│   │   ├── repository/       # Database repositories
│   │   ├── security/         # JWT utilities and filters
│   │   └── service/          # Business logic
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── uploads/              # Image uploads directory
│   └── pom.xml              # Maven dependencies
│
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components (Navbar)
│   │   ├── pages/           # Page components (Login, Register, Feed, Profile)
│   │   ├── context/         # React Context (AuthContext)
│   │   ├── utils/           # Utilities (API client)
│   │   ├── App.jsx          # Main app component
│   │   └── index.css        # Tailwind CSS
│   ├── vite.config.js       # Vite configuration
│   └── package.json         # npm dependencies
│
└── .gitignore               # Git ignore rules
```

## Database Schema

### Users Table
- id (Primary Key)
- email (Unique)
- password (Encrypted)
- name
- bio
- profileImage
- createdAt

### Posts Table
- id (Primary Key)
- content
- imageUrl
- userId (Foreign Key)
- createdAt
- updatedAt

### Likes Table
- id (Primary Key)
- userId (Foreign Key)
- postId (Foreign Key)
- createdAt
- Unique constraint on (userId, postId)

### Comments Table
- id (Primary Key)
- content
- userId (Foreign Key)
- postId (Foreign Key)
- createdAt

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Users
- GET `/api/users/me` - Get current user
- GET `/api/users/{id}` - Get user profile

### Posts
- GET `/api/posts` - Get all posts
- GET `/api/posts/user/{userId}` - Get user's posts
- POST `/api/posts` - Create new post (multipart/form-data)
- PUT `/api/posts/{id}` - Update post
- DELETE `/api/posts/{id}` - Delete post

### Likes
- POST `/api/posts/{postId}/like` - Toggle like on post

### Comments
- GET `/api/posts/{postId}/comments` - Get post comments
- POST `/api/posts/{postId}/comments` - Add comment

## Running the Application

Both backend and frontend workflows are configured and running automatically:

- **Backend**: Spring Boot on port 8080
- **Frontend**: Vite dev server on port 5000

The frontend proxies API requests to the backend automatically.

## Environment Variables

The application uses the following environment variables (automatically configured):
- `DATABASE_URL` - PostgreSQL connection string
- `PGHOST` - Database host
- `PGDATABASE` - Database name
- `PGUSER` - Database username
- `PGPASSWORD` - Database password

## Recent Changes

### 2025-11-01
- Initial project setup with Spring Boot and React
- Implemented all core features:
  - User authentication (register/login with JWT)
  - Post CRUD operations with image upload
  - Like/unlike functionality
  - Comment system
  - User profiles
- Configured PostgreSQL database with JPA
- Set up Spring Security with JWT tokens
- Built responsive UI with Tailwind CSS
- Configured Vite proxy for API requests
- Set up both backend and frontend workflows

## Notes

- Images are stored in `backend/uploads/` directory
- JWT tokens are stored in localStorage
- Spring Security protects all endpoints except `/api/auth/**` and `/uploads/**`
- Database schema is auto-updated via Hibernate DDL
- CORS is enabled for all origins in development
