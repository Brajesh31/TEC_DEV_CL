# Tech Dev Club Backend

A comprehensive Spring Boot backend for the Tech Dev Club community website with JWT authentication, MongoDB integration, and secure API endpoints.

## 🚀 Features

- **Spring Boot 3** with Java 17
- **MongoDB** integration with Spring Data
- **JWT Authentication** with role-based access control
- **API Key middleware** for protected endpoints
- **BCrypt password hashing**
- **CORS configuration** for frontend integration
- **Comprehensive validation** with Bean Validation
- **RESTful API design** with proper error handling

## 📂 Project Structure

```
backend/
├── src/main/java/com/techdevclub/
│   ├── TechDevClubApplication.java     # Main application class
│   ├── config/
│   │   └── SecurityConfig.java         # Spring Security configuration
│   ├── controller/                     # REST API controllers
│   │   ├── AuthController.java         # Authentication endpoints
│   │   ├── EventController.java        # Event management
│   │   ├── RSVPController.java         # RSVP functionality
│   │   ├── UserController.java         # User profile management
│   │   └── HealthController.java       # Health check endpoint
│   ├── model/                          # MongoDB document models
│   │   ├── User.java                   # User entity
│   │   ├── Event.java                  # Event entity
│   │   └── RSVP.java                   # RSVP entity
│   ├── repository/                     # MongoDB repositories
│   │   ├── UserRepository.java
│   │   ├── EventRepository.java
│   │   └── RSVPRepository.java
│   ├── security/                       # Security components
│   │   ├── JwtUtil.java                # JWT token utilities
│   │   ├── JwtAuthenticationFilter.java # JWT filter
│   │   ├── ApiKeyFilter.java           # API key filter
│   │   └── JwtAuthenticationEntryPoint.java
│   ├── service/                        # Business logic services
│   │   ├── UserService.java
│   │   ├── EventService.java
│   │   └── RSVPService.java
│   └── utils/
│       └── DataSeeder.java             # Sample data seeder
└── src/main/resources/
    └── application.yml                 # Application configuration
```

## 🔧 Setup Instructions

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- MongoDB (local or Atlas)

### 1. Clone and Navigate
```bash
cd backend
```

### 2. Configure Environment
Update `src/main/resources/application.yml` or set environment variables:

```yaml
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/techdevclub

# JWT Secret (use a strong secret in production)
JWT_SECRET=your-super-secret-jwt-key-here

# API Key for protected endpoints
API_KEY=tech-dev-club-api-key-2024

# CORS Origins
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 3. Build and Run
```bash
# Build the project
mvn clean compile

# Run the application
mvn spring-boot:run
```

The API will be available at: `http://localhost:8080/api`

## 🔐 Authentication & Security

### API Key Authentication
Some endpoints require an API key in the header:
```
x-api-key: tech-dev-club-api-key-2024
```

**Protected endpoints:**
- `POST /api/auth/signup`
- `POST /api/events/create`

### JWT Authentication
After login, include the JWT token in requests:
```
Authorization: Bearer <your-jwt-token>
```

**Protected endpoints:**
- `GET /api/auth/me`
- `PATCH /api/users/last-activity`
- `PUT /api/users/profile`
- `POST /api/rsvp`
- All RSVP endpoints

## 📚 API Endpoints

### Authentication
```
POST /api/auth/signup          # Create new user (API key required)
POST /api/auth/login           # User login
GET  /api/auth/me              # Get current user (JWT required)
```

### Events
```
GET    /api/events             # List all events
GET    /api/events/{id}        # Get event details
POST   /api/events/create      # Create event (API key required)
PUT    /api/events/{id}        # Update event (JWT required)
DELETE /api/events/{id}        # Delete event (JWT required)
```

### RSVP
```
POST   /api/rsvp               # Create RSVP (JWT required)
GET    /api/rsvp/user/{email}  # Get user RSVPs (JWT required)
GET    /api/rsvp/event/{id}    # Get event RSVPs (JWT required)
PUT    /api/rsvp/{id}/status   # Update RSVP status (JWT required)
DELETE /api/rsvp/{id}          # Delete RSVP (JWT required)
```

### Users
```
PATCH /api/users/last-activity # Update last visited page (JWT required)
PUT   /api/users/profile       # Update user profile (JWT required)
```

### Health Check
```
GET /api/health                # API health status
```

## 📝 Request/Response Examples

### User Signup
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -H "x-api-key: tech-dev-club-api-key-2024" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### User Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Events
```bash
curl -X GET http://localhost:8080/api/events
```

### Create RSVP
```bash
curl -X POST http://localhost:8080/api/rsvp \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "eventId": "event-id-here",
    "userEmail": "john@example.com",
    "userName": "John Doe",
    "notes": "Looking forward to this event!"
  }'
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (USER/ADMIN),
  isActive: Boolean,
  createdAt: DateTime,
  updatedAt: DateTime,
  lastLogin: DateTime,
  lastVisitedPage: String,
  bio: String,
  skills: [String],
  github: String,
  linkedin: String,
  website: String,
  avatar: String
}
```

### Events Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  shortDescription: String,
  date: DateTime,
  time: String,
  location: String,
  imageUrls: [String],
  formUrl: String,
  category: String,
  maxAttendees: Number,
  currentAttendees: Number,
  tags: [String],
  speaker: {
    name: String,
    title: String,
    avatar: String,
    bio: String
  },
  isActive: Boolean,
  isFeatured: Boolean,
  createdAt: DateTime,
  updatedAt: DateTime,
  createdBy: String
}
```

### RSVPs Collection
```javascript
{
  _id: ObjectId,
  eventId: String,
  userEmail: String,
  userName: String,
  status: String (PENDING/CONFIRMED/CANCELLED),
  submittedAt: DateTime,
  updatedAt: DateTime,
  notes: String
}
```

## 🔒 Security Features

- **Password Hashing**: BCrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **API Key Protection**: Additional layer for sensitive endpoints
- **CORS Configuration**: Configurable cross-origin resource sharing
- **Input Validation**: Bean Validation for all request bodies
- **Role-based Access**: User and Admin role separation

## 🧪 Sample Data

The application automatically seeds sample data on startup:

**Admin User:**
- Email: `admin@techdevclub.com`
- Password: `admin123`
- Role: ADMIN

**Regular User:**
- Email: `john@example.com`
- Password: `password123`
- Role: USER

**Sample Events:**
- React 18 Deep Dive Workshop
- AI/ML Bootcamp for Beginners
- Web3 Developer Summit

## 🚀 Production Deployment

1. **Environment Variables**: Set production values for:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `API_KEY`
   - `CORS_ORIGINS`

2. **Build JAR**: 
   ```bash
   mvn clean package
   ```

3. **Run**: 
   ```bash
   java -jar target/backend-0.0.1-SNAPSHOT.jar
   ```

## 📊 Monitoring

- Health check endpoint: `GET /api/health`
- Application logs with configurable levels
- MongoDB connection monitoring
- JWT token validation logging

## 🤝 Contributing

1. Follow Java coding conventions
2. Add proper validation to all endpoints
3. Include comprehensive error handling
4. Update documentation for new features
5. Test all endpoints thoroughly

---

Built with ❤️ using Spring Boot 3 and MongoDB