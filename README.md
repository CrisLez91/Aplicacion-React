# Aplicacion-React

Para ejecutar la aplicacion en un contenedor:

1- Se debe descargar el proyecto Aplicacion_React.

2- Abrir una terminal y ubicarse en la raiz del proyecto, donde se encuantran los archivos de Docker.

4- Ejecutar el comando: docker build -t react-app .

5- Una vez creada la imagen ejecutar el comando: docker-compose up -d

6- Abrir un navegador web en http://localhost:3000

Si se requiere cambiar la API que usa en el proyecto, o el puerto donde se ejecuta se realizan en el archivo de "docker-compose"

El puerto se establece en la propiedad 

 ports:
      - ${APP_PORT}:3000

la direccion de la API que utiliza el proyecto se establece en

environment:
      - REACT_APP_API_URL=http://palancar.izt.uam.mx:4001/api/65ebe1a9c60fcb54b3da1872



