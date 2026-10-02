FROM maven:3.9.16-eclipse-temurin-25 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:25.0.4_7-jre-noble
COPY --from=build /target/asn1-0.0.1-SNAPSHOT.jar asn1.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "asn1.jar" ]
