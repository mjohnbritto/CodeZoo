cd project/CodeZoo 

export JAVA_HOME=$(/usr/libexec/java_home)

mvn clean package appengine:run

mvn clean package appengine:deploy
