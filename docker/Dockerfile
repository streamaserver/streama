FROM openjdk:8-jre-slim
VOLUME /data
EXPOSE 8080
ENV ACTIVE_PROFILE=docker

WORKDIR /app
COPY docker/entrypoint.sh entrypoint.sh
COPY build/libs/*.jar streama.jar

ENTRYPOINT ["sh", "entrypoint.sh"]
