#!/bin/sh
export JAVA_OPTS="$JAVA_OPTS\
 -server\
 -Xms1024m\
 -Xmx2G\
 -XX:MaxPermSize=512m\
 -Djava.awt.headless=true"
