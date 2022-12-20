#FROM openjdk:17
#ADD target/ses-user-service.jar ses-user-service-docker.jar
#ENTRYPOINT ["java", "-jar","ses-user-service-docker.jar"]
#EXPOSE 8083

FROM maven:3.8.6-amazoncorretto-17 AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -DskipTests -f /usr/src/app/pom.xml clean package

FROM openjdk:17
COPY --from=build /usr/src/app/target/ses-user-service.jar /usr/app/ses-user-service.jar
ENTRYPOINT ["java","-jar","/usr/app/ses-user-service.jar"]
