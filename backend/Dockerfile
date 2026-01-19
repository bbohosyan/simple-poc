# Stage 1: Build
FROM maven:3.9.12-amazoncorretto-21 AS builder

WORKDIR /app

# Copy Maven wrapper and pom.xml first for layer caching
COPY .mvn .mvn
COPY mvnw pom.xml ./

# Download dependencies (this layer will be cached if pom.xml doesn't change)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw package -DskipTests -B

# Stage 2: Runtime
FROM amazoncorretto:21-alpine

WORKDIR /app

# Copy only the necessary runtime files from builder
COPY --from=builder /app/target/quarkus-app/lib/ ./lib/
COPY --from=builder /app/target/quarkus-app/*.jar ./
COPY --from=builder /app/target/quarkus-app/app/ ./app/
COPY --from=builder /app/target/quarkus-app/quarkus/ ./quarkus/

# Set environment variables
ENV JAVA_OPTS="-Xms128m -Xmx512m"
ENV QUARKUS_HTTP_HOST=0.0.0.0

EXPOSE 8080

# Run the application
CMD ["java", "-jar", "quarkus-run.jar"]
