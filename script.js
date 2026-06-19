const bootMessages = [
    "KINTSUGI_BOOT.SYS INIZIALIZZATO",
    "TAICHI_CORE_0329.MEM CARICATO",
    "SISTEMA AVVIATO - GIORNO 0339"
];

const authLines = [
    "> NN54 AUTH PROTOCOL",
    "> CREDENZIALI ACCETTATE"
];

const introLines = [
    "ACCESSO CONSENTITO",
    "BENTORNATO OPERATORE",
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

// SUONI E VOLUME
loopSound.loop = true;

openSound.volume = 0.3;
loopSound.volume = 0.05;
corruptSound.volume = 1;
glitchSound.volume = 1;
criticalGlitchSound.volume = 1;
//GLITCH PIU ALTI su mobile
function playSound(sound) {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
        return;
    }

    const s1 = sound.cloneNode(true);
    const s2 = sound.cloneNode(true);

    s1.volume = sound.volume;
    s2.volume = sound.volume;

    s1.play().catch(() => {});
    setTimeout(() => {
        s2.play().catch(() => {});
    }, 15);
}

let audioStarted = false;

function playSound(sound) {
    sound.currentTime = 0;
    return sound.play().catch(() => {});
}

function unlockSound(sound) {
    sound.muted = true;
    sound.currentTime = 0;

    return sound.play()
        .then(() => {
            sound.pause();
            sound.currentTime = 0;
            sound.muted = false;
        })
        .catch(() => {
            sound.muted = false;
        });
}

async function startAudio() {
    if (audioStarted) return;

    await Promise.all([
        unlockSound(openSound),
        unlockSound(loopSound),
        unlockSound(corruptSound),
        unlockSound(glitchSound),
        unlockSound(criticalGlitchSound)
    ]);

    audioStarted = true;

    openSound.currentTime = 0;
    openSound.muted = false;
    openSound.play().catch(() => {});

    setTimeout(() => {
        loopSound.currentTime = 0;
        loopSound.muted = false;
        loopSound.play().catch(() => {});
    }, 300);
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
    "Z": "Ζ",
    "健": "会",
"司": "逢",
"元": "会",
"気": "恋",
"で": "っ",
"す": "逢",
"?": "!",
};

const finalText = `13:00
Uscita → Teatro

> BIOMONITOR: Frequenza cardiaca ↓

Valutazione Polaris:
richiesta → cimitero con Ryuji

Analisi rischio:
— probabilità aggressione: bassa
— capacità difensive Polaris: adeguate

Decisione:
autonoma

—

13:05

Kintsugi → Corporate Plaza

—

13:10

Inizio turno

Routine:
— sorveglianza
— accompagnamento
— obbligo di intimità

Anomalie:
nessuna

Tomobiki:
non menzionato

—

21:00

Fine turno

—

22:00

Kintsugi → Mallplex

> EVENTO
sicurezza espelle tre mercenari

Scansione:
modifiche illegali rilevate

—

22:01

Kenji: individuato

Contatto visivo:
stabilito

[CORRUPT_DELETE]健司、会いたかった[/CORRUPT_DELETE]

Switch linguistico → giapponese

Kenji:
— turno terminato
— proposta: entrare

Risposta:
affermativa

—

22:10

Ingresso → abitazione Kenji

Kenji → camera da letto

> SCANSIONE AMBIENTE

Oggetti rilevati:
— fotografie corso addestramento sicurezza Mallplex, nuovo impianto cyberware, compagni di corso
— fotografia famiglia
大輔 (Daisuke)
健司 (Kenji)
[CORRUPT_DELETE]Florence[/CORRUPT_DELETE]

> SCANSIONE SCAFFALI

Bottiglie di alcolici: nessuna

—

22:20

Kenji → sala da pranzo

Analisi vestiario:
— vulnerabilità collo
— vulnerabilità braccia
— vulnerabilità gambe

Fattore di rischio: 
75%

Correzione:
consegna cappotto rinforzato

Stato:
non negoziabile

—

22:35

Piano inferiore

Consumo pasto

—

00:20

Attesa completata

—

00:30

Kintsugi, Kenji → Atlantis

Presentazioni:
— Polaris
— Freak Show
— Evie
[CORRUPT_DELETE]— Sasha[/CORRUPT_DELETE]

Ospite inatteso: 
Sasha

Protocollo serata:

— alcol → approvazione richiesta
— droghe → approvazione richiesta
— partner occasionali → valutazione del rischio richiesta

—

01:00

Kenji:
interesse visivo rilevato

Soggetto osservato:
Rogue

Evie:
informazione fornita: Rogue = soggetto inavvicinabile

Stato del gruppo:
— notorietà elevata
— accesso prioritario

Evento simultaneo:

Sasha:
tentativo di ingresso autonomo

Esito:
allontanato

Secondo tentativo:
successo

Rogue:
richiesta di ingresso prioritario del gruppo

Risposta bodyguard:
affermativa

Evento simultaneo:
Sasha espulso dalla sicurezza


—

01:10

Ingresso Atlantis

Evento:
assembramento

Fan:
contatto fisico non autorizzato

Tocco rilevato:
mani multiple

[CORRUPT_DELETE]Utilizzo del teaser ap[/CORRUPT_DELETE]
Livello di fastidio:
ignorato

—

01:15

Ordinazioni

Inesperienza Kenji: 
allarmante

Analisi cocktail:

Decisione personale: Morgan Blackhand
Decisione Kenji: opzione più palatabile

—

01:16

Kenji:
trascinato da soggetto femminile

Valutazione Freak Show:

— cyberware offensivi: basilari
— armi: basilari

Livello rischio:
accettabile

—

01:20

Polaris → sul bancone

Volume voce:
in aumento

Contenuto:
coinvolgimento attacco Silver Dragon
dettagli: fantasiosi

Freak Show → sul bancone

Perdita tracciamento:
— Evie
— Kenji

—

01:22

Evie identificata → divanetto
Kintsugi → divanetto

Obiettivo:
— visuale completa locale
— riduzione contatto fisico indesiderato

—

01:30

Evie, Kintsugi, Polaris, Freak Show → Tavolo isolato

Sensore termico:

Kenji
→ schiaffo ricevuto

Tasso alcolemico ↑

[CORRUPT_DELETE]Intervento necess[/CORRUPT_DELETE]

Decisione:
continuare consumo alcol

—

01:40

Kenji:
secondo contatto femminile

Valutazione Freak Show:

rischio:
analogo a precedente

Esito:
secondo rifiuto

Evento simultaneo: Avvicinamento Sasha

Sasha:
esibizione di due soggetti femminili

Stato emotivo:
Altezzoso, instabile

Contenuto della conversazione:
trascurabile

Kenji:
primo contatto maschile

[CORRUPT_DELETE]Valutazione Freak S[/CORRUPT_DELETE]

Esito:
rifiuto di Kenji

—

01:45

Polaris → pista da ballo

Stato emotivo:
euforica, irritata

—

02:00

Kenji → bancone

Stato fisico:
intossicazione da alcol

Kintsugi → bancone

Osservazione comunicata:
consumo eccessivo di alcol

Emotività soggetto:
ostile

Argomenti:
— troppe attenzioni
— assenza di autorità 

[CORRUPT_DELETE]Ti stai comportando come un cogl[/CORRUPT_DELETE]

Stato clinico:
vomito imminente

—

02:05

Kenji, Kintsugi → servizi igienici

Supporto motorio:
necessario

Accensione sigaretta

Rumori ambientali:
due rapporti sessuali in corso

Priorità audio:
isolamento suono Kenji

—

02:15

Kenji ⭢ lavabo

Lavaggio volto

Comunicazione Kintsugi:

— consumo alcol → interazioni sociali compromesse
— incitamento a non pensare troppo a cosa dire

Risposta Kenji:
— sottolinea l'assenza prolungata del padre adottivo
utilizza identificativo:
Kintsugi, non 太一

Risposta definitiva:
[CORRUPT_DELETE]Scusami[/CORRUPT_DELETE]
[CORRUPT_DELETE]Fottit[/CORRUPT_DELETE]
[CORRUPT_DELETE]Dovresti ringraziar[/CORRUPT_DELETE]
[GLITCH]
Il padre biologico 大輔 non avrebbe permesso questa esperienza

Kenji ⭢ uscita bagno

—

02:20

Kintsugi ⭢ bancone

Presenti:
— Evie
— Freak Show

—

02:22

Polaris ⭢ uscita servizi

Sventata collisione:
soggetto sconosciuto

Pericolosità soggetto:
elevata

Polaris:
finge inoffensività

Polaris ⭢ pista

Contatto:
Kenji

Contatto visivo:
Polaris → Kintsugi

Conversazione Kenji - Polaris:
non udibile

—

02:30

Kenji:
cessazione comportamento impulsivo

Bevanda:
analcolica

Socializzazione:
in miglioramento

—

02:32

Domanda Kintsugi - Polaris:
motivazione del cambio comportamentale del soggetto Kenji

Risposta:

— gestione Kintsugi: errata, pressante
— empatia Kintsugi: scarsa

Suggerimento:

mostrare Night City
progressivamente

Valutazione:
compatibilità con TAICHI.MEM:
accettabile

—

02:40

Freak Show:
comunicazione privata con Polaris

Polaris → retro locale

—

02:45

Sensore termografico

Kenji:
allontanamento

Compagnia:
gruppo

Evento:
interazione consensuale con soggetto femminile

Rischio:
basso

Evento simultaneo:

Sasha: 
abbandono compagnia precedente

Sasha → retro locale

Coincidenza:
improbabile

> BIOMONITOR: Cortisolo ↑

Nota interna:

sta succedendo qualcosa

—

FINE REGISTRAZIONE PARZIALE
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

// TESTO CORRUPT DELETE
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
const mapped = corruptMap[original] || corruptMap[original.toUpperCase()];

corrupted += Math.random() < 0.4 && mapped
    ? mapped
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

// STORAGE DISC TAP TO ACCESS
const startOverlay = document.getElementById("start-overlay");
const startTyped = document.getElementById("start-typed");

const storageText = ">TAP TO ACCESS: TEMP_CACHE>";
let storageIndex = 0;
let storageReady = false;
let startClicked = false;

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

async function handleStart(e) {
    e.preventDefault();

    if (!storageReady || startClicked) return;

    startClicked = true;

    await startAudio();

    startOverlay.style.display = "none";
    startBootSequence();
}

if (startOverlay && startTyped) {
    typeStorageDisc();

    startOverlay.addEventListener("touchstart", handleStart, { passive: false });
    startOverlay.addEventListener("click", handleStart);
} else {
    startBootSequence();
}