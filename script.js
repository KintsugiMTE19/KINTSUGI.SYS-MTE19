const bootMessages = [
    "SYSTEM BOOTING...",
    "KINTSUGI_BOOT.SYS INITIALIZED",
    "TAICHI_CORE_0329.MEM LOADED",
    "SYSTEM STARTED - DAY 0330"
];

const finalText = `
ACCESS GRANTED

Welcome back, operator.
All systems are now online.

Awaiting further instructions...
`;

const typedText = document.getElementById('typed-text');

let messageIndex = 0;
let charIndex = 0;
let phase = "boot"; // "boot" oppure "final"

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
                // passa alla fase finale
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
// FASE 2: TESTO FINALE (NON SI CANCELLA)
// ------------------
function typeFinal() {
    if (charIndex < finalText.length) {
        typedText.textContent += finalText.charAt(charIndex);
        charIndex++;

        // scroll automatico (se hai contenitore)
        typedText.parentElement.scrollTop =
            typedText.parentElement.scrollHeight;

        setTimeout(typeFinal, 35);
    }
}

// avvio
typeBoot();