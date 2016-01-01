FROM java:8-jdk

WORKDIR /usr/lib/java

ENV GRAILS_VERSION 2.4.4

RUN wget https://github.com/grails/grails-core/releases/download/v${GRAILS_VERSION}/grails-${GRAILS_VERSION}.zip
RUN unzip grails-${GRAILS_VERSION}.zip
RUN rm -rf grails-${GRAILS_VERSION}.zip
RUN ln -s grails-${GRAILS_VERSION} grails

ENV GRAILS_HOME /usr/lib/java/grails
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64
ENV PATH $GRAILS_HOME/bin:$PATH

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN grails compile

EXPOSE 8080

ENTRYPOINT ["grails"]

CMD ["-Dgrails.env=docker", "run-app"]
