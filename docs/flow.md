# Flujo de interacción entre `index.html` y `app.js`

Este documento explica, paso a paso y con lenguaje para principiantes, cómo se conectan `index.html` y `app.js` en esta aplicación.

## 1. Idea general

La aplicación está dividida en dos partes:

- `index.html`: define la estructura visual de la página.
- `app.js`: agrega el comportamiento e interactividad.

Pensalo así:

- `index.html` arma el "esqueleto" de la pantalla.
- `app.js` le da "vida" a ese esqueleto.

Sin `index.html`, no habría elementos para mostrar.
Sin `app.js`, la página se vería, pero no reaccionaría a los clics ni al filtro ni al quiz.

## 2. Qué hace `index.html`

El archivo `index.html` crea los elementos que el usuario ve en pantalla:

- Un título y una breve explicación.
- Un selector para filtrar comandos por nivel.
- Un contenedor donde se mostrarán las tarjetas de comandos.
- Un contenedor donde se mostrará el detalle del comando elegido.
- Una zona de quiz con botones y respuesta.

### Elementos importantes

Estos elementos son clave porque `app.js` los busca usando su `id`:

- `levelFilter`
- `commandsList`
- `detailBox`
- `quizQuestion`
- `quizAnswer`
- `newQuestionBtn`
- `showAnswerBtn`

Esto significa que `app.js` depende de que esos elementos existan en el HTML.

Por ejemplo:

- El `<select id="levelFilter">` permite elegir `Todos`, `Básico` o `Intermedio`.
- El `<div id="commandsList">` empieza vacío porque JavaScript lo va a llenar.
- El `<div id="detailBox">` arranca con un mensaje por defecto: "Elegí un comando para ver su explicación."
- El `<p id="quizQuestion">` arranca con otro mensaje inicial.
- El botón `showAnswerBtn` empieza deshabilitado con `disabled`, para que no se pueda mostrar una respuesta antes de generar una pregunta.

## 3. Cómo entra en juego `app.js`

Al final de `index.html` aparece esta línea:

```html
<script src="app.js"></script>
```

Eso hace que, cuando el navegador termina de cargar el HTML, ejecute el código de `app.js`.

Es importante que el `<script>` esté al final del `<body>` porque así primero se crean los elementos HTML y después JavaScript puede encontrarlos.

Si el script se ejecutara antes de que existan esos elementos, `document.getElementById(...)` podría devolver `null`.

## 4. Primer paso de `app.js`: definir los datos

Lo primero que hace `app.js` es crear un arreglo llamado `commands`.

```js
const commands = [...]
```

Ese arreglo guarda la información de los 10 comandos de Git.

Cada objeto tiene:

- `name`: nombre del comando.
- `level`: nivel (`basico` o `intermedio`).
- `description`: explicación breve.
- `example`: ejemplo de uso.

Este arreglo es la fuente de datos principal de la app.

## 5. Segundo paso: conectar JavaScript con el HTML

Después, `app.js` busca los elementos del HTML con `document.getElementById(...)`.

Ejemplo:

```js
const levelFilter = document.getElementById("levelFilter");
```

Con eso, JavaScript guarda una referencia al elemento real del HTML para poder leerlo o modificarlo.

Hace esto con todos los elementos importantes:

- el filtro
- la lista de comandos
- la caja de detalle
- el texto del quiz
- la respuesta del quiz
- los botones

En este punto ya existe la conexión entre ambas partes:

- `index.html` ofrece los elementos
- `app.js` los captura para trabajar con ellos

## 6. Variables que guardan el estado

El archivo también define dos variables:

```js
let selectedCommand = null;
let currentQuiz = null;
```

Estas variables guardan el estado actual de la aplicación.

### `selectedCommand`

Guarda qué comando eligió el usuario.

Al principio vale `null` porque todavía no se seleccionó ninguno.

### `currentQuiz`

Guarda qué comando fue elegido como pregunta actual del quiz.

También empieza en `null`.

## 7. Cómo funciona el filtro

La función `getFilteredCommands()` mira qué valor tiene el `<select>` del HTML:

```js
const level = levelFilter.value;
```

Puede devolver:

- todos los comandos, si el valor es `"all"`
- solo los básicos
- solo los intermedios

Esto se hace así:

```js
return commands.filter((command) => command.level === level);
```

O sea:

1. Lee la opción elegida en el HTML.
2. Recorre el arreglo `commands`.
3. Devuelve solo los que coinciden con ese nivel.

## 8. Cómo se dibuja la lista de comandos

La función más importante para la parte visual es `renderCommands()`.

Su trabajo es llenar el `<div id="commandsList">` del HTML.

### Paso a paso dentro de `renderCommands()`

#### 1. Obtener comandos visibles

```js
const filtered = getFilteredCommands();
```

Primero pide la lista filtrada.

#### 2. Limpiar lo que había antes

```js
commandsList.innerHTML = "";
```

Esto borra el contenido actual del contenedor.

Se hace para volver a dibujar la lista desde cero cada vez que cambia algo.

#### 3. Manejar el caso vacío

Si no hay comandos para mostrar, coloca un mensaje:

```js
commandsList.innerHTML = '<p class="error">No hay comandos para este filtro.</p>';
```

#### 4. Crear una tarjeta por cada comando

Para cada comando filtrado:

- crea un elemento `article`
- le asigna la clase `command-card`
- le carga contenido con el nombre y nivel
- le agrega un evento `click`
- lo inserta en `commandsList`

### Qué pasa al hacer clic en una tarjeta

Dentro de cada tarjeta se agrega esto:

```js
card.addEventListener("click", () => {
  selectedCommand = command;
  renderCommands();
  renderDetail(command);
});
```

Cuando el usuario hace clic:

1. `selectedCommand` pasa a ser ese comando.
2. Se vuelve a ejecutar `renderCommands()` para redibujar las tarjetas.
3. Se ejecuta `renderDetail(command)` para mostrar la explicación del comando elegido.

## 9. Por qué se vuelve a llamar `renderCommands()`

Esto puede parecer raro al principio.

Se vuelve a dibujar la lista porque el código quiere marcar visualmente cuál tarjeta quedó seleccionada.

Antes de mostrar cada tarjeta, hace esta comprobación:

```js
if (selectedCommand && selectedCommand.name === command.name) {
  card.classList.add("active");
}
```

Eso significa:

- si existe un comando seleccionado
- y el nombre del comando actual coincide con el seleccionado
- entonces agrega la clase `active`

Esa clase seguramente se usa en `styles.css` para resaltar la tarjeta.

## 10. Cómo se muestra el detalle del comando

La función `renderDetail(command)` actualiza el contenido de `detailBox`.

Usa `innerHTML` para reemplazar el contenido por:

- el nombre del comando
- la descripción
- un ejemplo dentro de `<code>`

Entonces, el flujo es:

1. El usuario hace clic en una tarjeta.
2. JavaScript identifica qué comando fue.
3. `detailBox` cambia su contenido.
4. El HTML visible se actualiza en pantalla.

## 11. Cómo funciona el cambio de filtro

`app.js` escucha el evento `change` del `<select>`:

```js
levelFilter.addEventListener("change", () => {
  renderCommands();

  const visibleNames = new Set(getFilteredCommands().map((item) => item.name));
  if (selectedCommand && !visibleNames.has(selectedCommand.name)) {
    selectedCommand = null;
    detailBox.innerHTML = "<p>Elegí un comando para ver su explicación.</p>";
  }
});
```

### Qué hace esto

Cuando el usuario cambia el filtro:

1. Se vuelve a renderizar la lista de tarjetas según el nuevo nivel.
2. Se arma un conjunto con los nombres que siguen visibles.
3. Se revisa si el comando seleccionado todavía está en pantalla.
4. Si ya no está visible, se borra la selección.
5. También se reinicia el cuadro de detalle al mensaje inicial.

### Ejemplo concreto

Supongamos que el usuario tenía seleccionado `git push`, que es `intermedio`.

Si luego cambia el filtro a `basico`:

- `git push` deja de aparecer en la lista
- ya no tendría sentido mostrarlo como seleccionado
- entonces `selectedCommand` vuelve a `null`
- `detailBox` vuelve al mensaje por defecto

Esto evita inconsistencias entre lo que se ve en la lista y lo que se ve en el detalle.

## 12. Cómo funciona el quiz

La parte del quiz usa dos funciones:

- `makeQuestion()`
- `revealAnswer()`

### `makeQuestion()`

Cuando se presiona el botón `Nueva pregunta`:

```js
newQuestionBtn.addEventListener("click", makeQuestion);
```

Se ejecuta `makeQuestion()`.

#### Qué hace esa función

1. Elige un índice aleatorio:

```js
const randomIndex = Math.floor(Math.random() * commands.length);
```

2. Toma un comando de la lista usando ese índice.
3. Guarda ese comando en `currentQuiz`.
4. Escribe una pregunta en `quizQuestion`.
5. Oculta la respuesta anterior.
6. Limpia el contenido anterior de la respuesta.
7. Habilita el botón `Mostrar respuesta`.

### Cómo se escribe la pregunta

La pregunta se construye así:

```js
quizQuestion.textContent = `¿Qué comando usarías para: ${command.description.toLowerCase()}?`;
```

O sea, usa la descripción del comando y la convierte en una pregunta.

Ejemplo:

- descripción: `"Sube tus commits locales al repositorio remoto."`
- pregunta generada: `"¿Qué comando usarías para: sube tus commits locales al repositorio remoto.?"`

## 13. Cómo se muestra la respuesta del quiz

El botón `Mostrar respuesta` ejecuta:

```js
showAnswerBtn.addEventListener("click", revealAnswer);
```

La función `revealAnswer()` hace esto:

1. Verifica si existe una pregunta actual.
2. Si no existe, corta la función con `return`.
3. Si existe, muestra el bloque de respuesta.
4. Inserta el nombre del comando correcto y un ejemplo.

El control inicial es este:

```js
if (!currentQuiz) return;
```

Esto evita errores si alguien intenta mostrar respuesta sin haber generado una pregunta primero.

Después hace:

```js
quizAnswer.hidden = false;
```

Eso quita el ocultamiento del elemento HTML.

Luego escribe la respuesta usando `innerHTML`.

## 14. Secuencia completa desde que abre la página

Este es el flujo completo de inicio:

1. El navegador carga `index.html`.
2. Se crean en memoria los elementos HTML.
3. Al llegar a `<script src="app.js"></script>`, se ejecuta `app.js`.
4. `app.js` define los datos (`commands`).
5. `app.js` busca y guarda referencias a los elementos del HTML.
6. `app.js` prepara variables de estado (`selectedCommand` y `currentQuiz`).
7. `app.js` registra los eventos:
   - cambio de filtro
   - clic en nueva pregunta
   - clic en mostrar respuesta
8. `app.js` llama a `renderCommands();`
9. La lista de comandos aparece en pantalla.

## 15. Secuencia cuando el usuario interactúa

### Caso A: el usuario selecciona un comando

1. Hace clic en una tarjeta.
2. El evento `click` de esa tarjeta se dispara.
3. `selectedCommand` guarda ese comando.
4. La lista se vuelve a dibujar para marcar la tarjeta activa.
5. El detalle se actualiza en `detailBox`.

### Caso B: el usuario cambia el filtro

1. Cambia el valor del `<select>`.
2. Se dispara el evento `change`.
3. Se recalcula la lista filtrada.
4. `commandsList` se vuelve a dibujar.
5. Si el comando seleccionado quedó fuera del filtro, se limpia la selección y el detalle.

### Caso C: el usuario usa el quiz

1. Presiona `Nueva pregunta`.
2. Se elige un comando al azar.
3. La pregunta aparece en pantalla.
4. El botón `Mostrar respuesta` queda habilitado.
5. Al presionarlo, se muestra el comando correcto y un ejemplo.

## 16. Relación entre HTML, JavaScript y DOM

Para entender bien esta app, hay tres ideas importantes:

### HTML

Escribe la estructura inicial.

### JavaScript

Lee esa estructura, responde a eventos y cambia contenido.

### DOM

El DOM es la representación que hace el navegador del HTML para que JavaScript pueda manipularlo.

Por eso cuando el código hace:

```js
document.getElementById("detailBox")
```

no está buscando texto plano, sino un nodo del DOM que representa ese elemento del HTML.

## 17. Qué partes son estáticas y cuáles dinámicas

### Parte estática

Viene directamente de `index.html`:

- encabezado
- etiquetas de secciones
- botones
- select
- mensajes iniciales

### Parte dinámica

La modifica `app.js`:

- tarjetas dentro de `commandsList`
- contenido de `detailBox`
- texto de `quizQuestion`
- contenido y visibilidad de `quizAnswer`
- habilitación del botón `showAnswerBtn`

## 18. Resumen corto del flujo

En una sola idea:

`index.html` pone los contenedores y controles; `app.js` los toma, escucha lo que hace el usuario y actualiza el contenido visible según esas acciones.

O dicho de otro modo:

1. HTML crea los lugares donde algo va a mostrarse.
2. JavaScript mete información en esos lugares.
3. Cuando el usuario interactúa, JavaScript vuelve a cambiar esos lugares.

## 19. Punto clave para principiantes

La aplicación no crea una página nueva cada vez que pasa algo.

Lo que hace es modificar partes concretas de la misma página:

- cambia el contenido interno de un `div`
- agrega elementos nuevos
- oculta o muestra secciones
- habilita o deshabilita botones

Ese es uno de los principios básicos del desarrollo web con JavaScript.

## 20. Conclusión

La interacción entre `index.html` y `app.js` sigue esta lógica:

- `index.html` define la base.
- `app.js` lee esa base.
- `app.js` agrega eventos.
- el usuario interactúa.
- `app.js` modifica el DOM.
- la página refleja inmediatamente esos cambios.

En esta app, casi toda la experiencia depende de esa relación:

- el filtro funciona porque JavaScript lee el `<select>`
- la lista funciona porque JavaScript llena `commandsList`
- el detalle funciona porque JavaScript cambia `detailBox`
- el quiz funciona porque JavaScript actualiza pregunta, respuesta y botones

Eso es justamente la conexión entre estructura (`index.html`) y comportamiento (`app.js`).
