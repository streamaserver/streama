FROM openjdk:8-jre-slim

WORKDIR /app/streama

RUN apt-get -y update && \
    apt-get -y install curl && \
    apt-get -y clean && \
    apt-get -y autoremove && \
    URL_DOWNLOAD_LATEST_RELEASE=$(curl -L https://api.github.com/repos/streamaserver/streama/releases | grep -i browser_download_url | head -n 1 | cut -d '"' -f 4) && \
    curl -o streama.jar -L $URL_DOWNLOAD_LATEST_RELEASE && \
    chmod u+x streama.jar

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "streama.jar" ]
