const colors = ["red", "blue", "green", "yellow"];
let sequence = [];
let playerSequence = [];
let level = 0;
let playing = false;

const statusText = document.getElementById("status");
const startButton = document.getElementById("start-btn");
const buttons = document.querySelectorAll(".color-btn");

// Función para iniciar el juego
function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    playing = true;
    statusText.textContent = "Memoriza la secuencia...";
    nextRound();
}

// Función para generar la siguiente ronda
function nextRound() {
    level++;
    playerSequence = [];
    statusText.textContent = `Nivel ${level}`;
    
    // Agregar un nuevo color a la secuencia
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);

    // Mostrar la secuencia al jugador
    playSequence();
}

// Función para mostrar la secuencia con animaciones
function playSequence() {
    let i = 0;
    
    const interval = setInterval(() => {
        const color = sequence[i];
        flashButton(color);
        i++;

        if (i >= sequence.length) {
            clearInterval(interval);
            statusText.textContent = "Repite la secuencia";
        }
    }, 800);
}

// Función para iluminar un botón
function flashButton(color) {
    const button = document.querySelector(`.${color}`);
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 500);
}

// Manejo de clics en los botones de colores
buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        if (!playing) return;

        const clickedColor = event.target.getAttribute("data-color");
        playerSequence.push(clickedColor);
        flashButton(clickedColor);
        
        // Verificar la secuencia del jugador
        checkPlayerInput();
    });
});

// Función para verificar si la entrada del jugador es correcta
function checkPlayerInput() {
    const index = playerSequence.length - 1;
    
    if (playerSequence[index] !== sequence[index]) {
        statusText.textContent = `¡Perdiste en el nivel ${level}! Intenta de nuevo.`;
        playing = false;
        return;
    }
    
    if (playerSequence.length === sequence.length) {
        statusText.textContent = "¡Bien! Siguiente nivel...";
        setTimeout(nextRound, 1000);
    }
}

// Evento para iniciar el juego
startButton.addEventListener("click", startGame);