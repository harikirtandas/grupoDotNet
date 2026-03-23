# Flujo visual entre `index.html` y `app.js`

Este archivo explica la relación entre `index.html` y `app.js` de una forma más visual y más fácil de repasar.

## 1. Idea rápida

- `index.html` crea la estructura.
- `app.js` controla lo que pasa.

En resumen:

- HTML pone los botones, cajas y textos.
- JavaScript escucha acciones del usuario y cambia la pantalla.

## 2. Mapa mental simple

Pensalo así:

```text
index.html
  -> crea elementos en la página
  -> les pone id para poder encontrarlos

app.js
  -> busca esos elementos
  -> les agrega lógica
  -> cambia su contenido cuando el usuario interactúa
```

## 3. Elementos que nacen en `index.html`

Estos son los puntos de contacto principales:

```text
levelFilter      -> selector de nivel
commandsList     -> contenedor de tarjetas
detailBox        -> caja de detalle
quizQuestion     -> texto de la pregunta
quizAnswer       -> caja de respuesta
newQuestionBtn   -> botón para generar pregunta
showAnswerBtn    -> botón para mostrar respuesta
```

## 4. Flujo general de arranque

Cuando la página se abre, pasa esto:

```text
1. El navegador lee index.html
2. Crea los elementos de la pantalla
3. Encuentra <script src="app.js">
4. Ejecuta app.js
5. app.js busca elementos por id
6. app.js registra eventos
7. app.js llama a renderCommands()
8. Aparecen las tarjetas en pantalla
```

## 5. Diagrama principal

```text
Usuario abre la página
        |
        v
   index.html carga
        |
        v
Se crean select, divs, botones y textos
        |
        v
    Se ejecuta app.js
        |
        v
JavaScript obtiene referencias con getElementById()
        |
        v
Registra eventos:
- change en el filtro
- click en Nueva pregunta
- click en Mostrar respuesta
        |
        v
renderCommands()
        |
        v
Se muestran los comandos
```

## 6. Flujo del filtro

### Qué hace el usuario

El usuario cambia el selector de nivel.

### Qué hace JavaScript

```text
Usuario cambia el filtro
        |
        v
Se dispara el evento "change"
        |
        v
getFilteredCommands() revisa levelFilter.value
        |
        v
Devuelve comandos filtrados
        |
        v
renderCommands() borra y vuelve a dibujar la lista
        |
        v
Si el comando seleccionado ya no está visible:
- selectedCommand = null
- detailBox vuelve al mensaje inicial
```

### Idea clave

El filtro no oculta tarjetas una por una.
Lo que hace es reconstruir la lista completa según el nivel elegido.

## 7. Flujo al hacer clic en un comando

```text
Usuario hace click en una tarjeta
        |
        v
El evento click de esa tarjeta se ejecuta
        |
        v
selectedCommand guarda el comando elegido
        |
        v
renderCommands() redibuja tarjetas
        |
        v
La tarjeta elegida recibe la clase "active"
        |
        v
renderDetail(command) actualiza detailBox
        |
        v
Se muestra:
- nombre
- descripción
- ejemplo
```

## 8. Flujo del quiz

### Parte 1: nueva pregunta

```text
Usuario presiona "Nueva pregunta"
        |
        v
Se ejecuta makeQuestion()
        |
        v
Se elige un comando al azar
        |
        v
currentQuiz guarda ese comando
        |
        v
quizQuestion muestra la pregunta
        |
        v
quizAnswer se oculta y se limpia
        |
        v
showAnswerBtn se habilita
```

### Parte 2: mostrar respuesta

```text
Usuario presiona "Mostrar respuesta"
        |
        v
Se ejecuta revealAnswer()
        |
        v
Si currentQuiz es null -> no hace nada
        |
        v
Si currentQuiz existe:
- quizAnswer.hidden = false
- quizAnswer muestra el comando correcto
- también muestra un ejemplo
```

## 9. Relación directa entre HTML y JS

La relación se puede resumir así:

```text
index.html                         app.js
-----------                       -------------------------
crea <select id="levelFilter"> -> lo lee para saber el filtro
crea <div id="commandsList">   -> lo llena con tarjetas
crea <div id="detailBox">      -> lo actualiza con detalles
crea <p id="quizQuestion">     -> cambia el texto de la pregunta
crea <div id="quizAnswer">     -> muestra u oculta la respuesta
crea botones                   -> les agrega eventos click
```

## 10. Mini diagrama del DOM

```text
index.html
   |
   v
DOM creado por el navegador
   |
   v
app.js usa document.getElementById(...)
   |
   v
modifica contenido, clases, texto y visibilidad
```

## 11. Qué partes son fijas y cuáles cambian

### Fijas

Son las que vienen escritas directamente en `index.html`:

- la estructura general
- títulos
- secciones
- botones
- select

### Cambiantes

Son las que `app.js` modifica:

- las tarjetas de comandos
- el detalle del comando
- la pregunta del quiz
- la respuesta del quiz
- el botón de mostrar respuesta

## 12. Resumen para estudiar

Si tuvieras que recordarlo en pocas líneas:

```text
index.html arma la pantalla
app.js toma esa pantalla y la hace interactiva

Filtro:
select -> JS lee valor -> vuelve a dibujar comandos

Detalle:
click en tarjeta -> JS guarda selección -> actualiza detalle

Quiz:
click en botón -> JS crea pregunta -> click en otro botón -> JS muestra respuesta
```

## 13. Frase final simple

La app funciona porque `index.html` pone los lugares donde se va a mostrar información, y `app.js` decide qué mostrar, cuándo mostrarlo y cómo reaccionar a lo que hace el usuario.
