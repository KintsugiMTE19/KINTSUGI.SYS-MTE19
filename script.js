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
    "> MOBILE: TOCCA PER METTERE IN PAUSA/RIPRENDERE - TIENI PREMUTO PER ACCELERARE",
    "> COMPUTER: PREMI ENTER PER METTERE IN PAUSA/RIPRENDERE - TIENI PREMUTO ENTER PER ACCELERARE"
];

const glitchTrigger = "[GLITCH]";
const criticalTrigger = "[CRITICALGLITCH]";
const corruptDeleteStart = "[CORRUPT_DELETE]";
const corruptDeleteEnd = "[/CORRUPT_DELETE]";

// AUDIO
const openSound = new Audio("suoni kintsugi/soundsboot.mp3");
const loopSound = new Audio("suoni kintsugi/background.mp3");
const corruptSound = new Audio("suoni kintsugi/parola corrotta.mp3");
const glitchSound = new Audio("suoni kintsugi/glitch.mp3");
const criticalGlitchSound = new Audio("suoni kintsugi/critical glitch.mp3");

loopSound.loop = true;

openSound.volume = 0.8;
loopSound.volume = 0.35;
corruptSound.volume = 0.7;
glitchSound.volume = 0.7;
criticalGlitchSound.volume = 0.9;

let audioStarted = false;

function playSound(sound) {
    sound.currentTime = 0;
    return sound.play().catch(() => {});
}

function startAudio() {
    if (audioStarted) return;

    openSound.currentTime = 0;

    openSound.play()
        .then(() => {
            audioStarted = true;

            setTimeout(() => {
                loopSound.play().catch(() => {});
            }, 300);
        })
        .catch(() => {
            audioStarted = false;
        });
}

const corruptMap = {
    "A": "Δ",
    "B": "β",
    "C": "Ͼ",
    "D": "Đ",
    "E": "Ξ",
    "F": "Ғ",
    "G": "₲",
    "H": "Ħ",
    "I": "1",
    "L": "Ł",
    "M": "Μ",
    "N": "И",
    "O": "0",
    "P": "Р",
    "R": "Я",
    "S": "5",
    "T": "7",
    "U": "Ц",
    "V": "Ѵ",
    "Z": "Ζ"
};

const finalText = `Bentornato, operatore.
Tutti i sistemi sono ora online. 
[GLITCH]
Bentornato, operatore.
[CORRUPT_DELETE]IDENTITÀ INDIVIDUALE RILEVATA[/CORRUPT_DELETE][CORRUPT_DELETE]RICALIBRAZIONE TAICHI.MEM [/CORRUPT_DELETE][CORRUPT_DELETE]RICALIBRAZIONE KINTSUGI.SYS [/CORRUPT_DELETE][CRITICALGLITCH]ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
[GLITCH]
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
ERRORE DI SISTEMA.ERRORE DI SISTEMA.ERRORE DI SISTEMA.
`;

const typedText = document.getElementById("typed-text");
const terminal = document.getElementById("terminal");
const mainCursor = document.getElementById("main-cursor");

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
const TOUCH_MOVE_THRESHOLD = 12;

let touchStartX = 0;
let touchStartY = 0;
let touchMoved = false;

function showMainCursor() {
    if (mainCursor) mainCursor.classList.remove("hidden");
}

function hideMainCursor() {
    if (mainCursor) mainCursor.classList.add("hidden");
}

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

// CONTROLLI MOBILE
terminal.addEventListener("touchstart", (e) => {
    if (phase !== "final") return;

    const touch = e.touches[0];

    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchMoved = false;
    longTouchTriggered = false;

    clearTimeout(touchHoldTimer);

    touchHoldTimer = setTimeout(() => {
        if (!touchMoved) {
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
        clearTimeout(touchHoldTimer);

        fastMode = false;
        longTouchTriggered = false;
    }
}, { passive: true });

terminal.addEventListener("touchend", () => {
    if (phase !== "final") return;

    clearTimeout(touchHoldTimer);

    if (!longTouchTriggered && !touchMoved) {
        paused = !paused;
    }

    fastMode = false;
    longTouchTriggered = false;
    touchMoved = false;
}, { passive: true });

// AVVIO
function startBootSequence() {
    hideMainCursor();
    typedText.textContent = "AVVIO";
    animateBootDots(0);
}

function animateBootDots(cycle) {
    if (cycle >= 3) {
        setTimeout(() => {
            typedText.textContent = "";
            showMainCursor();
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
        setTimeout(typeBoot, 35);
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

        setTimeout(showIntroLines, 300);
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

    const charsPerTick = fastMode ? 5 : 1;

    for (let i = 0; i < charsPerTick && charIndex < finalText.length; i++) {
        if (finalText.startsWith(corruptDeleteStart, charIndex)) {
            const endIndex = finalText.indexOf(corruptDeleteEnd, charIndex);

            if (endIndex !== -1) {
                const textToCorrupt = finalText.slice(
                    charIndex + corruptDeleteStart.length,
                    endIndex
                );

                charIndex = endIndex + corruptDeleteEnd.length;
                typeCorruptAndDelete(textToCorrupt);
                return;
            }
        }

        if (finalText.startsWith(criticalTrigger, charIndex)) {
            charIndex += criticalTrigger.length;
            triggerCriticalGlitch();
            return;
        }

        if (finalText.startsWith(glitchTrigger, charIndex)) {
            charIndex += glitchTrigger.length;
            triggerGlitchEffect();
            return;
        }

        typedText.textContent += finalText.charAt(charIndex);
        charIndex++;
    }

    if (wasAtBottom) {
        terminal.scrollTop = terminal.scrollHeight;
    }

    if (fastMode) {
        setTimeout(typeFinal, 8);
    } else if (finalText.charAt(charIndex) === "\n") {
        setTimeout(typeFinal, 150);
    } else {
        setTimeout(typeFinal, 55);
    }
}

// TESTO CHE SI CORROMPE E POI SCOMPARE SUBITO
function typeCorruptAndDelete(text) {
    let i = 0;
    let visibleText = "";

    function type() {
        if (i < text.length) {
            visibleText += text[i];
            typedText.textContent += text[i];
            i++;
            terminal.scrollTop = terminal.scrollHeight;
            setTimeout(type, fastMode ? 5 : 50);
        } else {
            setTimeout(corrupt, 500);
        }
    }

    let corruptCycles = 0;

    function corrupt() {
        if (corruptCycles === 0) {
            playSound(corruptSound);
        }

        if (corruptCycles < 8) {
            let corrupted = "";

            for (let j = 0; j < visibleText.length; j++) {
                const original = visibleText[j];
                const upper = original.toUpperCase();

                corrupted += Math.random() < 0.4 && corruptMap[upper]
                    ? corruptMap[upper]
                    : original;
            }

            typedText.textContent =
                typedText.textContent.slice(0, -visibleText.length) + corrupted;

            corruptCycles++;
            setTimeout(corrupt, 70);
        } else {
            setTimeout(deleteText, 250);
        }
    }

    function deleteText() {
        typedText.textContent = typedText.textContent.slice(0, -visibleText.length);
        visibleText = "";

        setTimeout(typeFinal, 80);
    }

    type();
}

// GLITCH RANDOM
function triggerGlitchEffect() {
    playSound(glitchSound);

    const screen = document.querySelector(".crt-screen");
    const glitchChars = "█▓▒░#@$%&01ΔΞΩ";
    let cycles = 0;
    let currentLine = "";

    const interval = setInterval(() => {
        if (currentLine.length > 0) {
            typedText.textContent =
                typedText.textContent.slice(0, -(currentLine.length + 1));
        }

        currentLine = "";

        for (let i = 0; i < 26; i++) {
            currentLine += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }

        typedText.textContent += "\n" + currentLine;

        if (screen) {
            screen.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        }

        terminal.scrollTop = terminal.scrollHeight;
        cycles++;

        if (cycles >= 10) {
            clearInterval(interval);

            typedText.textContent =
                typedText.textContent.slice(0, -(currentLine.length + 1));

            if (screen) {
                screen.style.transform = "none";
            }

            setTimeout(typeFinal, 250);
        }
    }, 45);
}

// CRITICAL GLITCH
function triggerCriticalGlitch() {
    playSound(criticalGlitchSound);

    const screen = document.querySelector(".crt-screen");
    const glitchChars = "█▓▒░#@$%&01ΔΞΩERRORCRITICAL";
    let cycles = 0;
    let currentLine = "";

    if (screen) {
        screen.style.animation = "none";
    }

    const interval = setInterval(() => {
        if (currentLine.length > 0) {
            typedText.textContent =
                typedText.textContent.slice(0, -(currentLine.length + 1));
        }

        currentLine = "";

        for (let i = 0; i < 34; i++) {
            currentLine += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }

        typedText.textContent += "\n" + currentLine;

        if (screen) {
            screen.style.transform = `translate(${Math.random() * 14 - 7}px, ${Math.random() * 10 - 5}px)`;
            screen.style.opacity = cycles % 2 === 0 ? "0.25" : "1";
        }

        terminal.scrollTop = terminal.scrollHeight;
        cycles++;

        if (cycles >= 12) {
            clearInterval(interval);

            typedText.textContent =
                typedText.textContent.slice(0, -(currentLine.length + 1));

            if (screen) {
                screen.style.opacity = "0";
                screen.style.transform = "scaleY(0.03)";
            }

            setTimeout(() => {
                if (screen) {
                    screen.style.opacity = "1";
                    screen.style.transform = "none";
                    screen.style.animation = "crtGlitch 6s infinite";
                }

                setTimeout(typeFinal, 400);
            }, 1000);
        }
    }, 45);
}

// STORAGE DISC DIGITATO AUTOMATICAMENTE
const startOverlay = document.getElementById("start-overlay");
const startTyped = document.getElementById("start-typed");

const storageText = "> NEURAL LOG: DAY 0330 >";
let storageIndex = 0;
let storageReady = false;

function typeStorageDisc() {
    if (!startTyped) return;

    if (storageIndex < storageText.length) {
        startTyped.textContent += storageText.charAt(storageIndex);
        storageIndex++;
        setTimeout(typeStorageDisc, 70);
    } else {
        storageReady = true;
    }
}

if (startOverlay && startTyped) {
    typeStorageDisc();

    startOverlay.addEventListener("click", () => {
        if (!storageReady) return;

        startAudio();
        startOverlay.style.display = "none";
        startBootSequence();
    });
} else {
    startBootSequence();
}