# templateapinode
Este proyecto simplemente es una plantilla básica que contiene un login, y un controlador de usuarios donde se podrán realizar las acciones crud validando dichas peticiones por el correspondiente token de los usuarios registrados. Esta plantilla se compone de los siguientes archivos:

## Configuración

Dentro de la carpeta config podemos observar que tenemos los archivos config.js y connection.js.

### Config.js

Este archivo contiene la información necesaria para poder conectar con la base de datos, tendremos que rellenar los campos con los valores correspondientes a nuestro host,usuario,contraseña y base de datos de la api.

### Connection.js

Este archivo contiene el tipo de conexión a la base de datos correspondiente (mysql,psql,etc...) y el elemento que contiene la conexión establecida. En este caso, se realiza una conexión mysql que podría cambiarse sin problema importando el módulo correspondiente al tipo de base de datos e inicializando la conexión de esta.

##Router

En el directorio router tenemos el archivo index.js que se compone de los siguientes elementos:

+ Módulos necesarios para el funcionamiento
  + [rand-token](https://www.npmjs.com/package/rand-token): Generador automantico de token
  + express: Elemento de nodejs para manejar el routing
  + connection: Módulo de conexión que creamos en el directorio config
  + [squel](https://hiddentao.com/squel/)
: Midleware que utilizo para realizar las sentencias sql creando una api con el máximo contenido de sintaxis javascript posible.
  + [lodash](https://lodash.com/docs): Libreria que facilita el uso de funciones de javascript
+ Controladores que necesitemos crear para nuestra api
+ Rutas de nuestra api donde hacemos un uso de nuestro controladores y los modulos importados en la parte superior, de forma que solo tengamos que modificar dicho controlador y se apliquen los cambios de forma global.



## Controller
Dentro del directorio controller tendremos cada directorio con su controlador correspondiente donde crearemos los métodos que veamos necesarios, en el controlador login solo tenemos un método llamado login que será el responsable de validar un usuario mediante su correo y su contraseña, que está cifrada (pudiendo modificar el tipo de cifrado sin problema). Si el login fuera exitoso la api devolverá el correspondiente token de dicho usuario logueado.

El controlador users tiene los métodos CRUD correspondiente de la tabla usuarios donde el método de creación del usuario es el único que valida la petición a través del token. Este método está pensado para que cualquier usuario pueda registrarse en la app y posteriormente tenga que loguearse para poder obtener el token de ese usuario correspondiente.

Además de tener un control por token, se puede observar otro nivel de control en los métodos new y update donde se valida que los campos coinciden con los campos de la base de datos y no tiene efecto la acción si no están dichos campos.

## Cosas a tener en cuenta

Esta plantilla está realizada para servir de guía y no como algo final, dentro de los elementos que hemos hablado anteriormente hay mencionar las siguientes cosas:
+ El controlador users es un ejemplo genérico de controlador con métodos CRUD
+ Para crear el controlador users como un caso real además de validar por token se deberá comprobar que el token corresponde a un administrador o usuarios con permisos
+ El tipo de base de datos puede modificarse añadiendo la librería correspondiente y adaptando las peticiones
+ El controlador users tiene una línea de validación donde comprueba que los campos enviados son correcto, para que funcione debe haber una entrada de usuario, en este caso el usuario admin, para que la petición cuyo id de usuario es 1 no de error y no funcione. 

        var query = squel.select().from("users").where("id = ?",1).toString();
			  connection.query(query,(err,rows) =>{
				  var paramsUsers = [];
				  for( name in rows[0]){
					  if (name !=  "id" && name != "create_at" && name != "update_at" && name != "token") {
						  paramsUsers.push(name);
					  }
				  }
				  if (!_.isEqual(paramRequest , paramsUsers)) {
					  res.json({"Error" : true, "Message" : "need more params"});
					  return
			  	}

+ En caso de ser otro tipo de controlador donde no hay entradas previas a la creación de ellas, se podria tener un modelo con los campos de cada tabla y en vez de realizar una consulta para ver las columnas de la tabla, acceder al modelo de cada tabla y validar cada campo enviado con los campos requeridos.

