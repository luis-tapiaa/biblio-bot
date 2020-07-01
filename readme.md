# BiblioBot

Chatbot para el servicio de referencia virtual de la Biblioteca Central de la UNAM.

## Getting Started

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local.

### Pre-requisitos

Para poder utilizar BiblioBot se necesita contar con lo siguiente:

- Node.js
- npm

### Instalación

Para instalar BiblioBot debe clonar el repositorio de GitHub.

```git clone https://github.com/luis-tapiaa/biblio-bot.git```

O puede simplemente descargar el codigo fuente.

Despues instale las dependencias con:

```npm install```

Para completar la configuracion de este bot, asegurese de incluir el archivo `.env` con sus parametros.
| Opcion       | Descripcion                                              |
|--------------|----------------------------------------------------------|
| PORT         | Puerto por donde va a iniciar el servidor. Default 3000  |
| RASA_URI     | Direccion donde va a intercambiar mensajes con el NLU    |
| MYSQL_HOST   | Host de la base de datos.                                |
| MYSQL_USER   | Usuario con acceso a la base de datos.                   |
| MYSQL_PASSWD | Contraseña del usurio de base de datos                   |
| MYSQL_DB     | Nombre de la base de datos a usar                        |

El siguiente paso es instalar [BiblioNLU](https://github.com/luis-tapiaa/biblio-bot-nlu), ya que es indispensable para el bot.

## Running

Una vez instalado e iniciado [BiblioNLU](https://github.com/luis-tapiaa/biblio-bot-nlu) podemos iniciar BiblioBot.

```npm start```

Puedes hablar con el desde [localhost:3000](http://localhost:3000).

## Colocalo en tu sitio

Para colocar el chat en tu sitio web de manera embebida añade el siguiente codigo:

```
<div id="embedded_messenger">
    <header id="message_header" onclick="Botkit.toggle()">Chat</header>
    <iframe id="botkit_client" allow="microphone; camera" src="//localhost:3000"></iframe>
</div>
<script src="//localhost:3000/embed.js"></script>
<script>        
    Botkit.boot({});
</script>
<link rel="stylesheet" href="//localhost:3000/css/embed.css" />
```

## Herramentas de desarrollo

Este proyecto fue desarrollado utilizando:

* [Botkit](https://botkit.ai/) - Herramienta para desarrollar chatbots.
* [Rasa](https://rasa.com/) - Marco de aprendizaje automático para automatizar asistentes.

