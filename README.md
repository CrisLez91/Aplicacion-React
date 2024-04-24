# Aplicacion-React

Para ejecutar la aplicacion en un contenedor:

1- Se debe descargar el proyecto Aplicacion_React.

2- Abrir una terminal y ubicarse en la raiz del proyecto, donde se encuantran los archivos de Docker.

4- Ejecutar el comando: docker build -t <nombre_de_la_imagen> .

5- Una vez creada la imagen ejecutar el comando: docker run -p 4201:4200 <nombre_de_la_imagen>

6- Abrir un navegador web en http://localhost:4201
