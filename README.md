# Nodepop

## API de venta de artículos de segunda mano

* [Descripción](#descripción)
* [Pruebas en el servidor](#pruebas-en-el-servidor)
* [Uso](#uso)
* [Ejemplos de peticiones y respuestas](#ejemplos-de-peticiones-y-respuestas)

## Descripción

Software que se ejecutará en el servidor dando servicio a una app (API) de
venta de artículos de segunda mano. Con esta API se comunicará tanto la
app versión iOS y como la versión Android.

Puede encontrar una versión en inglés de la documentación (generada con [apidocs](https://www.npmjs.com/package/api-doc)) en la carpeta

    Nodepop/routes/api/v1doc

Los ejemplos de parámetros se muestran en formato JSON en esta documentación por claridad. Sin embargo, se recibirán como parámetros de URL (GET) o como x-www-form-urlencoded.

## Pruebas en el servidor

### Prueba archivos estáticos

    http://ec2-52-40-64-111.us-west-2.compute.amazonaws.com/images/advertisements/bici.jpg
    http://ec2-52-40-64-111.us-west-2.compute.amazonaws.com/images/advertisements/iphone.jpg

### Prueba devolución de datos

    http://ec2-52-40-64-111.us-west-2.compute.amazonaws.com/api/v1/advertisements

### Prueba acceso por IP

    http://52.40.64.111/


## Uso

Antes de comenzar, indicarle que la raíz del proyecto se encuentra dentro de la carpeta 'Nodepop'. Por tanto, para comenzar cualquier operación deberá situarse en dicha carpeta:

    cd Nodepop

### Iniciar MongoDB

Lanzar desde la raíz del proyecto:

* Desde UNIX, ejecute /scripts/startMongo.sh
* Desde Windows, ejecute /scripts/startMongo.bat
* Si desea usar la consola de comandos directamente, ejecute desde /Nodepop:

        mongod --dbpath ../data/db --directoryperdb

### Arranque

Lanzar desde la raíz del proyecto:

    npm start

### Incluir primeros datos por defecto

Incluir primeros datos de ejemplo y para pruebas.
Desde la carpeta scripts, ejecutar

        node insertDefaultData.js


## Ejemplos de peticiones y respuestas

  - [POST /user/register](#post-userregister)
  - [POST /user/authenticate](#post-userauthenticate)
  - [GET /advertisements/](#get-advertisements)
  - [GET /advertisements/tagvalues](#get-advertisementstagvalues)
  - [POST /pushtoken](#post-pushtoken)
  - [GET /images/advertisements/:imageName](#get-imagesadvertisementsimagename)

### POST /user/register

Registro. Recibe nombre, email y contraseña, y los guarda en la base de datos.

Ejemplo: http://localhost:3000/api/v1/users/register

Ejemplo de petición

      {
          "name": "Cristina",
          "email": "cris@tina.com",
          "pass": "abc"
      }

Ejemplo de respuesta:

STATUS: 200

      {
          "success": true,
          "user": {
              "__v": 0,
              "name": "Cristina",
              "email": "cris@tina.com",
              "password": "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
              "_id": "57293d3566cd6354042f3d71"
          }
      }

Ejemplo de respuesta cuando el email ya existe:

STATUS: 400

     {
           "success": false,
           "error": {
               "code": 10,
               "message": "Cannot crate user, that email already exist.",
               "name": "DuplicatedEmail",
               "error": {
                   "code": 11000,
                   "index": 0,
                   "errmsg": "E11000 duplicate key error collection: nodepop.users index: email_1 dup key: { : \"pe@pe.com\" }",
                   "op": {
                       "name": "Pepe",
                       "email": "pe@pe.com",
                       "password": "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
                       "_id": "572f4ded4bff3fe8197660a5",
                       "__v": 0
                   }
               }
           }
       }

### POST /user/authenticate

Autenticación. Recibe un email y una contraseña.
Si los datos son correctos, se devuelve un token para comunicarse con la API.

Ejemplo: http://localhost:3000/api/v1/users/authenticate

Ejemplo de petición

       {
            "email": "cris@tina.com",
            "pass": "abc"
        }

Ejemplo de respuesta:

STATUS: 200

      {
          "success": true,
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3MjkyYzQ4MDllMzM5OTgwMzFjOTFmOCIsImlhdCI6MTQ2MjMxNjc2NywiZXhwIjoxNDYyNDg5NTY3fQ.lC0qjHn-qw63XNovu2h63rA2Bfwq0I05RSHDT02xNWg"
      }

Ejemplo de respuesta si el usuario no existe

STATUS: 400

      {
          "success": false,
          "error": {
              "code": 12,
              "message": "Authentication failed, no user found with that email.",
              "name": "MissingUser",
              "error": "Authentication failed, no user found with that email."
          }
      }

Ejemplo de respuesta si la contraseña es incorrecta

STATUS: 400

      {
            "success": false,
            "error": {
                "code": 13,
                "message": "Authentication failed, invalid password.",
                "name": "UnvalidPass",
                "error": "Authentication failed, invalid password."
            }
        }

### GET /advertisements

Lista de anuncios paginada.
Parámetros disponibles:

* **token**
    Token de autentificación. Sin él, se devolverá un error.

* **name**
    Nombre del artículo que se vende o se busca. Se buscará su valor al inicio de los nombres de los artículos.
* **tags**
    Tags de anuncios.
    Tags válidos: ["work", "lifestyle", "motor", "mobile"]

* **forSale**
    Buscará los anuncios que se venden si su valor es 'true' o '1'. Si no, buscará los artículos que no se venden sino son buscados.

* **price**
    Precio del artículo (o que el solicitante está dispuesto a pagar).
    Se puede buscar por rango de precios en el siguiente formato:
    * '10-50' buscará anuncios con precio incluido entre estos valores
    * '10-' buscará los que tengan precio mayor que 10
    * '-50' buscará los que tengan precio menor de 50
    * 50 buscará los que tengan precio igual a 50

* **includeTotal**
    Devolverá el número total de elementos que cumplen los filtros si su valor es 'true' o '1'.

* **start**
    Elemento desde el cual se mostrarán los resultados

* **limit**
    Máximo de elementos que se devolverán

* **sort**
    Campo por el cual se ordenarán los resultados.

Ejemplo: http://localhost:3000/api/v1/advertisements

Ejemplo de petición:

      {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3MjkyYzQ4MDllMzM5OTgwMzFjOTFmOCIsImlhdCI6MTQ2MjMxNjc2NywiZXhwIjoxNDYyNDg5NTY3fQ.lC0qjHn-qw63XNovu2h63rA2Bfwq0I05RSHDT02xNWg"
      }

Ejemplo de respuesta

STATUS: 200

    {
        "success": true,
        "data": {
            "rows": [
                {
                    "_id": "572934f2b56205e4135132a0",
                    "name": "Bicicleta",
                    "forSale": true,
                    "price": 230.15,
                    "picture": "bici.jpg",
                    "tags": [
                        "lifestyle",
                        "motor"
                    ]
                },
                {
                    "_id": "572934f2b56205e4135132a1",
                    "name": "iPhone 3GS",
                    "forSale": false,
                    "price": 50,
                    "picture": "iphone.png",
                    "tags": [
                        "lifestyle",
                        "mobile"
                    ]
                },
                {
                    "_id": "572934f2b56205e4135132a2",
                    "name": "Collar multicolor",
                    "forSale": true,
                    "price": 3.5,
                    "picture": "collar.png",
                    "tags": [
                        "lifestyle"
                    ]
                },
                {
                    "_id": "572934f2b56205e4135132a3",
                    "name": "Gafas",
                    "forSale": false,
                    "price": 45,
                    "picture": "gafas.png",
                    "tags": [
                        "lifestyle",
                        "work"
                    ]
                },
                {
                    "_id": "572934f2b56205e4135132a4",
                    "name": "Frikada",
                    "forSale": false,
                    "price": 10,
                    "picture": "frikada.png",
                    "tags": [
                        "lifestyle"
                    ]
                }
            ]
        }
    }

Ejemplo de respuesta cuando no se ha recibido token:

STATUS: 400

      {
          "success": false,
          "error": {
              "code": 15,
              "message": "Authentication failed. No token provided.",
              "name": "JWTMissingToken"
          }
      }

Ejemplo de respuesta cuando se envía un filtro inválido:

STATUS: 400

      {
         "success": false,
         "error": {
             "code": 20,
             "message": "Error trying to get advertisements.",
             "name": "QueryError",
             "error": {
                 "message": "Cast to number failed for value \"garbage\" at path \"price\"",
                 "name": "CastError",
                 "kind": "number",
                 "value": "garbage",
                 "path": "price"
             }
         }
      }

### GET /advertisements/tagvalues

Lista de tags existentes

Ejemplo: http://localhost:3000/api/v1/advertisements/tagvalues

Ejemplo de petición:

      {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3MjkyYzQ4MDllMzM5OTgwMzFjOTFmOCIsImlhdCI6MTQ2MjMxNjc2NywiZXhwIjoxNDYyNDg5NTY3fQ.lC0qjHn-qw63XNovu2h63rA2Bfwq0I05RSHDT02xNWg"
      }

Ejemplo de respuesta:

STATUS: 200

        {
            "success": true,
            "data": [
                "work",
                "lifestyle",
                "motor",
                "mobile"
            ]
        }

### POST /pushtoken

Guardar token de push (opcionalmente relacionado con un usuario registrado).

Ejemplo: http://localhost:3000/api/v1/pushtoken

Ejemplo de petición sin usuario:

    {
        "platform": "ios",
        "token": "iosToken"
    }

Ejemplo de respuesta:

STATUS: 200

    {
        "success": true,
        "data": {
            "__v": 0,
            "platform": "ios",
            "token": "iosToken",
            "_id": "572e1f7ead341de825fc7f46"
        }
    }

Ejemplo de petición con _id de usuario:

    {
        "platform": "ios",
        "token": "iosToken"
        "user": "572d1ccddb794a84154a16d9"
    }

Ejemplo de respuesta:

STATUS: 200

    {
        "success": true,
        "data": {
            "__v": 0,
            "platform": "ios",
            "token": "iosToken",
            "user": "572d1ccddb794a84154a16d9",
            "_id": "572e200cad341de825fc7f48"
        }
    }

Ejemplo de petición con email de usuario:

    {
        "platform": "ios",
        "token": "iosToken"
        "user": "572d1ccddb794a84154a16d9"
    }

Ejemplo de respuesta:

STATUS: 200

    {
        "success": true,
        "data": {
            "__v": 0,
            "platform": "ios",
            "token": "iosToken",
            "user": "572d1ccddb794a84154a16d9",
            "_id": "572e2031ad341de825fc7f49"
        }
    }

### GET /images/advertisements/:imageName

Ejemplo: http://localhost:3000/api/v1/images/advertisements/bici.jpg

Ejemplo de petición:

      {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3MjkyYzQ4MDllMzM5OTgwMzFjOTFmOCIsImlhdCI6MTQ2MjMxNjc2NywiZXhwIjoxNDYyNDg5NTY3fQ.lC0qjHn-qw63XNovu2h63rA2Bfwq0I05RSHDT02xNWg"
      }

La respuesta será una imagen con STATUS: 200

