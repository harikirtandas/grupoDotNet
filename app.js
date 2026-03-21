const commands = [
  {
    name: "git init",
    level: "basico",
    description: "Inicializa un repositorio Git en la carpeta actual.",
    example: "git init"
  },
  {
    name: "git clone",
    level: "basico",
    description: "Copia un repositorio remoto a tu máquina.",
    example: "git clone https://github.com/usuario/proyecto.git"
  },
  {
    name: "git status",
    level: "basico",
    description: "Muestra el estado de archivos (modificados, staged, etc.).",
    example: "git status"
  },
  {
    name: "git add",
    level: "basico",
    description: "Agrega archivos al área de staging para el próximo commit.",
    example: "git add ."
  },
  {
    name: "git commit",
    level: "basico",
    description: "Guarda los cambios staged en el historial del repositorio.",
    example: "git commit -m \"Mensaje claro\""
  },
  {
    name: "git branch",
    level: "intermedio",
    description: "Lista, crea o elimina ramas.",
    example: "git branch nueva-rama"
  },
  {
    name: "git checkout",
    level: "intermedio",
    description: "Cambia de rama o recupera archivos (uso clásico).",
    example: "git checkout main"
  },
  {
    name: "git pull",
    level: "intermedio",
    description: "Trae cambios del remoto y hace merge en tu rama actual.",
    example: "git pull origin main"
  },
  {
    name: "git push",
    level: "intermedio",
    description: "Sube tus commits locales al repositorio remoto.",
    example: "git push origin main"
  },
  {
    name: "git log",
    level: "intermedio",
    description: "Muestra el historial de commits.",
    example: "git log --oneline --graph"
  }
];

const levelFilter = document.getElementById("levelFilter");
const commandsList = document.getElementById("commandsList");
const detailBox = document.getElementById("detailBox");
const quizQuestion = document.getElementById("quizQuestion");
const quizAnswer = document.getElementById("quizAnswer");
const newQuestionBtn = document.getElementById("newQuestionBtn");
const showAnswerBtn = document.getElementById("showAnswerBtn");

let selectedCommand = null;
let currentQuiz = null;

function getFilteredCommands() {
  const level = levelFilter.value;
  if (level === "all") return commands;
  return commands.filter((command) => command.level === level);
}

function renderCommands() {
  const filtered = getFilteredCommands();
  commandsList.innerHTML = "";

  if (filtered.length === 0) {
    commandsList.innerHTML = '<p class="error">No hay comandos para este filtro.</p>';
    return;
  }

  filtered.forEach((command) => {
    const card = document.createElement("article");
    card.className = "command-card";
    if (selectedCommand && selectedCommand.name === command.name) {
      card.classList.add("active");
    }

    card.innerHTML = `
      <h3 class="command-name">${command.name}</h3>
      <p class="level">Nivel: ${command.level}</p>
    `;

    card.addEventListener("click", () => {
      selectedCommand = command;
      renderCommands();
      renderDetail(command);
    });

    commandsList.appendChild(card);
  });
}

function renderDetail(command) {
  detailBox.innerHTML = `
    <h3 class="command-name">${command.name}</h3>
    <p>${command.description}</p>
    <p><strong>Ejemplo:</strong> <code>${command.example}</code></p>
  `;
}

function makeQuestion() {
  const randomIndex = Math.floor(Math.random() * commands.length);
  const command = commands[randomIndex];

  currentQuiz = command;
  quizQuestion.textContent = `¿Qué comando usarías para: ${command.description.toLowerCase()}?`;

  quizAnswer.hidden = true;
  quizAnswer.innerHTML = "";
  showAnswerBtn.disabled = false;
}

function revealAnswer() {
  if (!currentQuiz) return;
  quizAnswer.hidden = false;
  quizAnswer.innerHTML = `La respuesta recomendada es: <code>${currentQuiz.name}</code><br>Ejemplo: <code>${currentQuiz.example}</code>`;
}

levelFilter.addEventListener("change", () => {
  renderCommands();

  const visibleNames = new Set(getFilteredCommands().map((item) => item.name));
  if (selectedCommand && !visibleNames.has(selectedCommand.name)) {
    selectedCommand = null;
    detailBox.innerHTML = "<p>Elegí un comando para ver su explicación.</p>";
  }
});

newQuestionBtn.addEventListener("click", makeQuestion);
showAnswerBtn.addEventListener("click", revealAnswer);

renderCommands();
