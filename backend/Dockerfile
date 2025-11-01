## Multi-stage Dockerfile for building and running the Spring Boot backend

# Build stage: use Maven to compile and package the application
FROM maven:3.9.0-eclipse-temurin-17 AS build
WORKDIR /build

# copy pom and download dependencies first (leverages docker cache)
COPY pom.xml ./
RUN mvn -B dependency:go-offline

# copy source and build
COPY src ./src
RUN mvn -B -DskipTests package

# Run stage: lightweight JRE image
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the jar produced in the build stage. Adjust the pattern if your artifactId/version differs.
COPY --from=build /build/target/*.jar ./app.jar

# Expose default port; Render will provide $PORT at runtime
EXPOSE 8080

# Use the PORT environment variable if provided by the platform (Render sets $PORT).
# Use a shell entrypoint so we can pass the server.port system property dynamically.
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar /app/app.jar"]
