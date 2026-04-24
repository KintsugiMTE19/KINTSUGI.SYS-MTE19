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

// blocco selezione/menu iPhone, senza bloccare lo scroll
[
    "gesturestart",
    "gesturechange",
    "gestureend",
    "selectstart",
    "contextmenu"
].forEach((eventName) => {
    document.addEventListener(eventName, (e) => {
        e.preventDefault();
    }, { passive: false });
});

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

let touchStartX = 0;
let touchStartY = 0;
let touchMoved = false;
let touchGestureLockedAsScroll = false;

const TOUCH_MOVE_THRESHOLD = 12;

// CONTROLLI MOBILE SOLO SUL TERMINALE
terminal.addEventListener("touchstart", (e) => {
    if (phase !== "final") return;

    const touch = e.touches[0];

    touchStartX = touch.clientX;
    touchStartY = touch.clientY;

    touchMoved = false;
    touchGestureLockedAsScroll = false;
    longTouchTriggered = false;

    clearTimeout(touchHoldTimer);

    touchHoldTimer = setTimeout(() => {
        if (!touchMoved && !touchGestureLockedAsScroll) {
            longTouchTriggered = true;
            fastMode = true;
            paused = false;
        }
    }, TOUCH_HOLD_DELAY);
}, { passive: true });

terminal.addEventListener("touchmove", (e) => {
    if (phase !== "final") return;

    const touch = e.touches[0];

    const deltaX = Math.abs(touch.clientX - touchStartX);
    const deltaY = Math.abs(touch.clientY - touchStartY);

    if (deltaX > TOUCH_MOVE_THRESHOLD || deltaY > TOUCH_MOVE_THRESHOLD) {
        touchMoved = true;
        touchGestureLockedAsScroll = true;

        clearTimeout(touchHoldTimer);

        fastMode = false;
        longTouchTriggered = false;
    }
}, { passive: true });

terminal.addEventListener("touchend", () => {
    if (phase !== "final") return;

    clearTimeout(touchHoldTimer);

    if (!longTouchTriggered && !touchGestureLockedAsScroll) {
        paused = !paused;
    }

    fastMode = false;
    longTouchTriggered = false;
    touchMoved = false;
    touchGestureLockedAsScroll = false;
}, { passive: true });

terminal.addEventListener("touchcancel", () => {
    clearTimeout(touchHoldTimer);

    fastMode = false;
    longTouchTriggered = false;
    touchMoved = false;
    touchGestureLockedAsScroll = false;
}, { passive: true });
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