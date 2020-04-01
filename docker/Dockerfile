FROM openjdk:8-jre-slim

WORKDIR /app/streama

RUN apt-get -y update && \
    apt-get -y install curl && \
    apt-get -y clean && \
    apt-get -y autoremove && \
    curl -o streama.jar -L https://github.com/streamaserver/streama/releases/download/v1.8.0-beta/streama-1.8.0.jar && \
    chmod u+x streama.jar

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "streama.jar" ]
