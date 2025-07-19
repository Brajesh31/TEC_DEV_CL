# Tech Dev Club - Integrated Full-Stack Application

A comprehensive full-stack community website with Spring Boot backend and React frontend integrated into a single deployable application.

## 🏗️ Architecture

This project integrates a **React (Vite) frontend** with a **Spring Boot backend** into a single deployable JAR file:

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Backend**: Spring Boot 3 + MongoDB + JWT Authentication
- **Integration**: Frontend build served as static resources from Spring Boot

## 🚀 Quick Start

### Development Mode

1. **Start Backend (Terminal 1)**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Start Frontend (Terminal 2)**:
   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:5173 (with API proxy)
   - Backend API: http://localhost:8080/api

### Production Build

Build everything into a single deployable JAR:

```bash
# Automated build script
./build-and-deploy.sh

# Or manual steps:
npm run build:copy          # Build frontend and copy to backend
cd backend && mvn clean package  # Build Spring Boot JAR
```

### Run Production Build

```bash
java -jar backend/target/backend-0.0.1-SNAPSHOT.jar
```

Access the application at: http://localhost:8080

## 📁 Project Structure

```
tech-dev-club/
├── src/                          # React frontend source
│   ├── components/               # React components
│   ├── pages/                   # Page components
│   ├── services/                # API services
│   └── ...
├── backend/                     # Spring Boot backend
│   ├── src/main/java/           # Java source code
│   │   └── com/techdevclub/
│   │       ├── config/          # Configuration classes
│   │       ├── controller/      # REST controllers
│   │       ├── model/           # Data models
│   │       ├── repository/      # Data repositories
│   │       ├── security/        # Security components
│   │       └── service/         # Business logic
│   ├── src/main/resources/
│   │   ├── static/              # Frontend build files (auto-generated)
│   │   └── application.yml      # Spring Boot configuration
│   └── pom.xml                  # Maven dependencies
├── dist/                        # Frontend build output (auto-generated)
├── package.json                 # Frontend dependencies & scripts
├── vite.config.ts              # Vite configuration with proxy
└── build-and-deploy.sh         # Automated build script
```

## 🔧 Configuration

### Frontend Development Proxy

The Vite development server proxies API calls to the Spring Boot backend:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
}
```

### Spring Boot Static Resource Serving

Spring Boot serves the React build files and handles routing:

```java
// WebConfig.java - Serves static files
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/**")
            .addResourceLocations("classpath:/static/");
}

// FrontendController.java - React Router support
@RequestMapping(value = {"/", "/about", "/events", ...})
public String index() {
    return "forward:/index.html";
}
```

### CORS Configuration

Development CORS allows frontend dev server access:

```yaml
# application.yml
cors:
  allowed-origins: http://localhost:5173,http://localhost:3000
```

## 🛠️ Available Scripts

### Frontend Scripts
```bash
npm run dev              # Start Vite dev server
npm run build            # Build React app
npm run build:copy       # Build and copy to backend
npm run preview          # Preview production build
```

### Backend Scripts
```bash
cd backend
mvn spring-boot:run      # Start Spring Boot dev server
mvn clean package       # Build JAR file
mvn clean compile       # Compile only
```

### Integrated Scripts
```bash
./build-and-deploy.sh    # Full production build
npm run full:build       # Build frontend + backend
npm run deploy:prep      # Prepare for deployment
```

## 🌐 API Endpoints

All API endpoints are available under `/api/`:

- **Health**: `GET /api/health`
- **Authentication**: `POST /api/auth/login`, `POST /api/auth/signup`
- **Events**: `GET /api/events`, `POST /api/events/create`
- **RSVP**: `POST /api/rsvp`, `GET /api/rsvp/user/{email}`
- **Users**: `PATCH /api/users/last-activity`

## 🔐 Security Features

- **JWT Authentication** with role-based access control
- **API Key middleware** for protected endpoints
- **CORS configuration** for development and production
- **BCrypt password hashing**
- **Spring Security** integration

## 📦 Deployment

### Single JAR Deployment

The application builds into a single JAR file containing:
- Spring Boot backend
- React frontend (as static resources)
- All dependencies

```bash
# Build
./build-and-deploy.sh

# Deploy
java -jar backend/target/backend-0.0.1-SNAPSHOT.jar
```

### Environment Variables

Set these environment variables for production:

```bash
MONGODB_URI=mongodb://localhost:27017/techdevclub
JWT_SECRET=your-super-secret-jwt-key
API_KEY=your-api-key
CORS_ORIGINS=https://yourdomain.com
```

### Docker Deployment (Optional)

```dockerfile
FROM openjdk:17-jdk-slim
COPY backend/target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 🧪 Testing

### Frontend Testing
```bash
npm run test             # Run frontend tests
npm run lint             # Lint frontend code
```

### Backend Testing
```bash
cd backend
mvn test                 # Run backend tests
mvn verify               # Run all checks
```

## 🔍 Monitoring

- **Health Check**: http://localhost:8080/api/health
- **Detailed Health**: http://localhost:8080/api/health/detailed
- **Application Logs**: Console output with configurable levels

## 🤝 Development Workflow

1. **Frontend Development**: Use `npm run dev` for hot reload
2. **Backend Development**: Use `mvn spring-boot:run` for auto-restart
3. **API Testing**: Frontend dev server proxies to backend
4. **Production Testing**: Use `./build-and-deploy.sh` to test full integration
5. **Deployment**: Deploy the single JAR file

## 📚 Key Features

- **Single Deployable Artifact**: One JAR file contains everything
- **Development Proxy**: Seamless API calls during development
- **React Router Support**: All frontend routes work correctly
- **Static Asset Optimization**: Efficient serving of CSS, JS, images
- **CORS Handling**: Proper cross-origin configuration
- **Security Integration**: JWT + Spring Security
- **Health Monitoring**: Built-in health checks
- **Hot Reload**: Fast development iteration

## 📞 Contact

- **Email**: techdevclub2025@gmail.com
- **Discord**: https://discord.gg/6MVn2N9q
- **WhatsApp**: https://chat.whatsapp.com/HtpadPkjf1S44FK7sTZMu4
- **LinkedIn**: https://www.linkedin.com/company/tech-dev-club/
- **Instagram**: https://www.instagram.com/techdevclub

---

Built with ❤️ using Spring Boot 3, React 18, and modern web technologies.