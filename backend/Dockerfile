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

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
