FROM java:8-jre

ADD build/libs/*.war /app/streama.war

WORKDIR /app

EXPOSE 8080
ENTRYPOINT ["java"]
CMD ["-Dgrails.env=test", "-jar", "streama.war"]
