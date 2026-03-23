# Git10 - App de práctica de comandos Git

Mini aplicación web interactiva para aprender y practicar los **10 comandos de Git más usados**.
Está pensada como proyecto simple de prueba para trabajar en equipo en la universidad.

## Equipo

- Cami
- Marcos
- Gabi
- Jorge

## Objetivo

Ayudar a quienes recién empiezan con Git a:

- Identificar comandos frecuentes.
- Entender para qué sirve cada comando.
- Ver ejemplos concretos de uso.
- Practicar con un mini quiz rápido.

## Funcionalidades

- Listado de 10 comandos populares de Git.
- Filtro por nivel: `Básico` / `Intermedio`.
- Vista de detalle del comando seleccionado.
- Mini quiz con preguntas aleatorias y botón para mostrar respuesta.
- Sin login ni backend.

## Estructura del proyecto

```
grupoDotNet/
├── index.html              # Punto de entrada principal de la aplicación
├── assets/
│   ├── css/
│   │   └── styles.css      # Estilos y diseño responsive
│   ├── js/
│   │   └── app.js          # Lógica de datos e interacción (filtro, detalle y quiz)
│   └── images/             # Recursos gráficos (logos, iconos, etc.)
├── docs/
│   ├── README.md           # Este archivo
│   ├── flow.md             # Documentación del flujo de la aplicación
│   └── flow-visual.md      # Diagrama visual del flujo
└── otros/                  # Archivos varios o de prueba
```

### Descripción de directorios

| Directorio | Contenido |
|------------|-----------|
| `assets/` | Recursos estáticos del proyecto (CSS, JS, imágenes) |
| `assets/css/` | Hojas de estilo CSS |
| `assets/js/` | Código JavaScript de la aplicación |
| `assets/images/` | Imágenes estáticas (logos, íconos, etc.) |
| `docs/` | Documentación del proyecto |
| `otros/` | Archivos misceláneos o de pruebas |

## Cómo ejecutar

1. Clonar o descargar el repositorio.
2. Abrir `index.html` en cualquier navegador moderno.

No requiere instalación de paquetes ni servidor.

## Comandos incluidos

1. `git init`
2. `git clone`
3. `git status`
4. `git add`
5. `git commit`
6. `git branch`
7. `git checkout`
8. `git pull`
9. `git push`
10. `git log`

## Próximas mejoras (opcionales)

- Agregar puntuación al quiz.
- Incluir modo práctica por escenarios.
- Añadir comandos modernos como `git switch` y `git restore`.
