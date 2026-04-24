const bootMessages = [
    "KINTSUGI_BOOT.SYS INIZIALIZZATO",
    "TAICHI_CORE_0329.MEM CARICATO",
    "SISTEMA AVVIATO - GIORNO 0330"
];

const authLines = [
    "> NN54 AUTH PROTOCOL",
    "> CREDENZIALI ACCETTATE"
];

const introLines = [
    "ACCESSO CONSENTITO",
    "> MOBILE: TOCCA PER METTERE IN PAUSA/RIPRENDERE - TIENI PREMUTO PER SALTARE",
    "> COMPUTER: PREMI ENTER PER METTERE IN PAUSA/RIPRENDERE - TIENI PREMUTO ENTER PER SALTARE"
];

const finalText = `Bentornato, operatore.
Tutti i sistemi sono ora online. 
Bentornato, operatore.
Tutti i sistemi sono ora online.Tutti i sistemi sono ora online. 
Bentornato, operatore.
Tutti i sistemi sono ora online.Tutti i sistemi sono ora online. 
Bentornato, operatore.
Tutti i sistemi sono ora online.Tutti i sistemi sono ora online. 
Bentornato, operatore.
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
`;

const typedText = document.getElementById("typed-text");
const terminal = typedText.parentElement;

let messageIndex = 0;
let charIndex = 0;
let introIndex = 0;
let phase = "boot";
let paused = false;
let fastMode = false;

let enterPressed = false;
let enterHoldTimer = null;
let touchHoldTimer = null;
let longTouchTriggered = false;

const ENTER_HOLD_DELAY = 250;
const TOUCH_HOLD_DELAY = 350;

// BLOCCO SELEZIONE / MENU MOBILE
document.addEventListener("selectstart", (e) => {
    e.preventDefault();
});

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

document.addEventListener("touchmove", (e) => {
    if (phase === "final") {
        e.preventDefault();
    }
}, { passive: false });

// CONTROLLI PC
document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" || phase !== "final") return;

    e.preventDefault();

    if (!enterPressed) {
        enterPressed = true;

        enterHoldTimer = setTimeout(() => {
            fastMode = true;
            paused = false;
        }, ENTER_HOLD_DELAY);
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key !== "Enter" || phase !== "final") return;

    e.preventDefault();

    clearTimeout(enterHoldTimer);

    if (!fastMode) {
        paused = !paused;
    }

    fastMode = false;
    enterPressed = false;
});

// CONTROLLI MOBILE
document.addEventListener("touchstart", (e) => {
    if (phase !== "final") return;

    e.preventDefault();

    longTouchTriggered = false;

    touchHoldTimer = setTimeout(() => {
        longTouchTriggered = true;
        fastMode = true;
        paused = false;
    }, TOUCH_HOLD_DELAY);
}, { passive: false });

document.addEventListener("touchend", (e) => {
    if (phase !== "final") return;

    e.preventDefault();

    clearTimeout(touchHoldTimer);

    if (!longTouchTriggered) {
        paused = !paused;
    }

    fastMode = false;
}, { passive: false });

// AVVIO
function startBootSequence() {
    typedText.textContent = "AVVIO";
    animateBootDots(0);
}

function animateBootDots(cycle) {
    if (cycle >= 3) {
        setTimeout(() => {
            typedText.textContent = "";
            typeBoot();
        }, 600);
        return;
    }

    let dots = 0;

    const dotInterval = setInterval(() => {
        dots++;
        typedText.textContent = "AVVIO" + ".".repeat(dots);

        if (dots === 3) {
            clearInterval(dotInterval);

            setTimeout(() => {
                typedText.textContent = "AVVIO";

                setTimeout(() => {
                    animateBootDots(cycle + 1);
                }, 300);
            }, 500);
        }
    }, 350);
}

// BOOT
function typeBoot() {
    const currentMessage = bootMessages[messageIndex];

    if (charIndex < currentMessage.length) {
        typedText.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeBoot, 25);
    } else {
        setTimeout(() => {
            messageIndex++;

            if (messageIndex >= bootMessages.length) {
                typedText.textContent = "";
                charIndex = 0;
                phase = "auth";
                showAuthLines();
                return;
            }

            charIndex = 0;
            typedText.textContent = "";
            typeBoot();
        }, 600);
    }
}

// AUTENTICAZIONE
function showAuthLines() {
    let authIndex = 0;

    function showLine() {
        if (authIndex < authLines.length) {
            typedText.textContent += authLines[authIndex] + "\n";
            authIndex++;

            setTimeout(showLine, 400);
        } else {
            setTimeout(() => {
                typedText.textContent = "";

                setTimeout(() => {
                    phase = "intro";
                    showIntroLines();
                }, 300);
            }, 800);
        }
    }

    showLine();
}

// INTRO
function showIntroLines() {
    if (introIndex < introLines.length) {
        typedText.textContent += introLines[introIndex] + "\n";
        introIndex++;

        terminal.scrollTop = terminal.scrollHeight;

        setTimeout(showIntroLines, 250);
    } else {
        typedText.textContent += "\n";
        phase = "final";

        setTimeout(typeFinal, 2000);
    }
}

// TESTO FINALE
function typeFinal() {
    if (charIndex >= finalText.length) return;

    if (paused) {
        setTimeout(typeFinal, 80);
        return;
    }

    const wasAtBottom =
        terminal.scrollTop + terminal.clientHeight >= terminal.scrollHeight - 5;

    if (fastMode) {
        let nextNewline = finalText.indexOf("\n", charIndex);

        if (nextNewline === -1) {
            nextNewline = finalText.length;
        }

        typedText.textContent += finalText.slice(charIndex, nextNewline + 1);
        charIndex = nextNewline + 1;
    } else {
        typedText.textContent += finalText.charAt(charIndex);
        charIndex++;
    }

    if (wasAtBottom) {
        terminal.scrollTop = terminal.scrollHeight;
    }

    if (fastMode) {
        setTimeout(typeFinal, 20);
    } else if (finalText.charAt(charIndex) === "\n") {
        setTimeout(typeFinal, 120);
    } else {
        setTimeout(typeFinal, 35);
    }
}

startBootSequence();