const bootMessages = [
    "SYSTEM BOOTING...",
    "KINTSUGI_BOOT.SYS INITIALIZED",
    "TAICHI_CORE_0329.MEM LOADED",
    "SYSTEM STARTED - DAY 0330"
];

const finalText = `ACCESS GRANTED

Welcome back, operator.
All systems are now online. 
Welcome back, operator.
All systems are now online.All systems are now online. 
Welcome back, operator.
All systems are now online.All systems are now online. 
Welcome back, operator.
All systems are now online.All systems are now online. 
Welcome back, operator.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
SYSTEM ERROR.SYSTEM ERROR.SYSTEM ERROR.
`;

// elementi
const typedText = document.getElementById('typed-text');
const terminal = typedText.parentElement;

// stato
let messageIndex = 0;
let charIndex = 0;
let phase = "boot";
let skipLineNow = false; // 👈 skip singolo

// ------------------
// SKIP (ENTER + TAP)
// ------------------
function triggerSkip() {
    if (phase === "final") {
        skipLineNow = true;
    }
}

// desktop
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") triggerSkip();
});

// mobile
document.addEventListener("touchstart", triggerSkip);


// ------------------
// FASE 1: BOOT
// ------------------
function typeBoot() {
    const currentMessage = bootMessages[messageIndex];

    if (charIndex < currentMessage.length) {
        typedText.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeBoot, 60);
    } else {
        setTimeout(() => {
            messageIndex++;

            if (messageIndex >= bootMessages.length) {
                typedText.textContent = "";
                charIndex = 0;
                phase = "final";
                typeFinal();
                return;
            }

            charIndex = 0;
            typedText.textContent = "";
            typeBoot();
        }, 800);
    }
}


// ------------------
// FASE 2: TESTO FINALE
// ------------------
function typeFinal() {
    if (charIndex >= finalText.length) return;

    const wasAtBottom =
        terminal.scrollTop + terminal.clientHeight >= terminal.scrollHeight - 5;

    // ⏭️ SKIP SOLO RIGA CORRENTE
    if (skipLineNow) {
        let nextNewline = finalText.indexOf("\n", charIndex);

        if (nextNewline === -1) {
            nextNewline = finalText.length;
        }

        typedText.textContent += finalText.slice(charIndex, nextNewline + 1);
        charIndex = nextNewline + 1;

        skipLineNow = false; // 🔥 reset

        if (wasAtBottom) {
            terminal.scrollTop = terminal.scrollHeight;
        }

        setTimeout(typeFinal, 35);
        return;
    }

    // ✍️ scrittura normale
    typedText.textContent += finalText.charAt(charIndex);
    charIndex++;

    if (wasAtBottom) {
        terminal.scrollTop = terminal.scrollHeight;
    }

    // pausa più lunga a fine riga (opzionale ma bello)
    if (finalText.charAt(charIndex) === "\n") {
        setTimeout(typeFinal, 120);
    } else {
        setTimeout(typeFinal, 35);
    }
}


// avvio
typeBoot();