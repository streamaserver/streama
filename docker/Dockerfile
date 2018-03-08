FROM openjdk:8-jre-slim
VOLUME /data
EXPOSE 8080
ENV ACTIVE_PROFILE=production

WORKDIR /app
COPY docker/entrypoint.sh entrypoint.sh
COPY build/libs/*.war streama.war

ENTRYPOINT ["sh", "entrypoint.sh"]
