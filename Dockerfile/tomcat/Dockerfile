FROM  tomcat:8.0


#ENV MYSQL_HOST "mysql"
#ENV MYSQL_PORT "3306"
#ENV MYSQL_DB "streama"
#ENV MYSQL_USER "streama"
#ENV MYSQL_PASSWORD "streama"

RUN rm -R /usr/local/tomcat/webapps/ROOT
ADD bin/setenv.sh /usr/local/tomcat/bin/setenv.sh
ADD conf/server.xml /usr/local/tomcat/conf/server.xml
ADD ROOT.war /usr/local/tomcat/webapps/ROOT.war

VOLUME ["/data"]

EXPOSE 8080 4000
