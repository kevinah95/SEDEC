<h1 align="center">
  <a href="https://github.com/kevinah95/SEDEC"><img src="https://cdn.rawgit.com/kevinah95/SEDEC/master/sticker.svg" alt="SEDEC" width="200"></a>
  <br>
</h1>

<p align="center">
  <a href="https://travis-ci.org/kevinah95/SEDEC"><img src="https://travis-ci.org/kevinah95/SEDEC.svg?branch=master" alt="travis"></a>  
</p>

<h3 align="center">Sistema Experto para Diagnóstico de Enfermedades en Cultivos</h4>

<br>

## Instrucciones para ejecutar SEDEC

### Requisitos previos
Para ejecutar las pruebas:
  - Instalar karma-cli: **`npm install -g karma-cli`**


Para correr el server:

  - Instalar nodemon: **`npm install -g nodemon`**

### Iniciar SEDEC

  1. Clone el repo: **`git clone https://github.com/kevinah95/SEDEC.git`**
  2. Cambie al directorio previamente clonado **`cd SEDEC/`**
  3. Instale los módulos npm: **`npm install`**
  4. Instale los componentes de bower: **`bower install`**
  5. Edite las configuraciones de la base de datos: **`config/database.js`**
  6. Inicie el servidor: **`nodemon server.js`**
  7. Ingrese a la dirección: **`http://localhost:8081`**
### Pruebas

  - Corra: **`karma start --browsers Chrome`**

## Contribuir
Ver nuestro archivo [CONTRIBUTING.md](https://github.com/kevinah95/SEDEC/blob/master/CONTRIBUTING.md) para mayor detalle. Reportar los errores encontrados a través de Issues.
## Licencia
SEDEC está licenciado bajo los términos de la Licencia MIT. Para obtener información completa sobre la licencia, consulte el archivo [LICENSE](https://github.com/kevinah95/SEDEC/blob/master/LICENSE) en este repositorio.
