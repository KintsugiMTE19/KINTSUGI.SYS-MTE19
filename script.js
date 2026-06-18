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

const finalText = `06:00
Avvio del sistema
Polaris: addormentata
Freak Show: posizione sconosciuta
Evie: posizione sconosciuta
Vortex: posizione sconosciuta
—
06:05
Condizioni volto ripristinate
Microfratture dermiche: rimarginate
Composizione messaggio:
Destinatari → Polaris / Freak Show / Evie
Contenuto: “Ci vediamo dopo il turno”
Invio completato
—
06:30
Ingresso Corporate Plaza
Profumi molecolari rilevati
Clima operativo: ostentazione – fretta
—
06:35
Accesso area di supporto psicologico
Scale affollate
Sala d’attesa: sovraccarico sensoriale
Borg presenti → instabilità emotiva - movimenti erratici - parole non contestualizzate
Nota interna:
pattern ricorrente → Recarsi qui il meno possibile
—
06:50
Ingresso studio
Tono psicologo: autoritario - deluso
Argomenti:
— assenza terapia: 1 mese
— obbligo meditazione: 10 minuti / giorno
[CORRUPT_DELETE]Incolpare Vance[/CORRUPT_DELETE]
Non parlare di Vance
[CORRUPT_DELETE]Non lo farò[/CORRUPT_DELETE]
[GLITCH]
Risposta:
Lo farò
Ricezione oggetto:
Biglietto SASLCT (sindacato lavoratori)
Reazione:
umorismo interno 75%
incoerenza logica → super chippati – lavoratori - diritti 
>AVVIO PROTOCOLLO MEDITAZIONE
rumore attenuato
abilità cognitiva ridotta
07:50
>PROTOCOLLO MEDITAZIONE TERMINATO
—
07:55
Messaggio in ingresso — Freak Show
Richieste:
— raggiungere Daisuke
— upgrade cyberdeck
— disattivazione chip sabotaggio
Azione confermata
—
08:00
Accompagnamento: Kamilah → conferenza comunale
Presenti: corporazioni / sindaco Mbole Ebunike / guardie armate
Osservazione:
guardie → livelli di stress: alti → molti cyberware
Nota interna:
l'incubo del SALSCT
—
15:50
Conversazione con Kamilah
Tema: Tomobiki
Fiducia Kamilah → alta
Valutazione Tomobiki:
— non discreto
— approccio aggressivo probabile
Decisione Kamilah:
— organizzerà incontro
— esclusione altri edgerunner
— segretezza richiesta
Accettazione: automatica
—
15:55
Messaggio inviato → Freak Show
“Ho finito il turno, ci vediamo al Mallplex.”
—
16:00
Chiamata in ingresso — Evie
Contenuto:
— attacco cannibali
— stato agitato
— Evie stabile
Condivisione evento psicologo
Proposta Evie: meditazione congiunta
Evento simultaneo:
probabilità incidente stradale: 67%
tono vocale elevato
controllo emotivo: compromesso
Risposta ad Evie: affermativa
—
16:15
Freak Show: individuato
Informazioni su Tomobiki:
non condivise
Ingresso negozio 
Daisuke: individuato
—
16:20
Kenji: individuato
Acquisto: ciambella
Simulazione difetto ciambella
Avvicinamento riuscito
[CORRUPT_DELETE]健司元気ですか?[/CORRUPT_DELETE]
Switch linguistico → giapponese 
Kenji:
— insoddisfazione 
— interesse rilevato → Atlantis
— menzione Slammer
— menzione Totentatz
— richiesta di accompagnamento
Recupero dati KINSTUGI.SYS
— soggetto: Freak Show
— luogo: Atlantis
— oggetto recuperato: interazione intima non consensuale
Recupero dati TAICHI.MEM
— soggetto: 健司 (Kenji) anni: 5
— luogo: combat zone
— memoria recuperata:
il soggetto sente sparatoria dalla casa accanto
大輔 (Daisuke) confina il soggetto in casa
il soggetto interpreta la situazione come un gioco
il soggetto implora di partecipare alla festa, dicendo di avere dei petardi
— nota personale: disallineamento tra realtà ostile e percezione soggetto
Risposta:
[CORRUPT_DELETE]No[/CORRUPT_DELETE]
[CORRUPT_DELETE]Forse[/CORRUPT_DELETE]
assenso parziale con condizioni
Probabilità errore: 95%
Scambio contatti
—
16:30
Daisuke: individuato
Domanda: Kenji
Risposta fornita: incompleta
—
16:32
[CORRUPT_DELETE]!VIOLAZIONE DEL SIST[/CORRUPT_DELETE]
> PROTOCOLLI DI SICUREZZA DISATTIVATI
> INIZIO PROCEDURA TECNICA
16:42
> PROCEDURA TECNICA TERMINATA
16:43
Responso Daisuke:
— non completo
— necessarie altre 3 sessioni
Registrazione dolore: trascurabile
—
17:00
Arrivo → Totentantz
Freak Show: individuato
Evie: individuata
Messaggio in ingresso: Polaris
“David sa tutto, lo ha sempre saputo.”
—
17:05
>BIOMONITOR: Cortisolo ↑
>BIOMONITOR: Adrenalina ↑ 
[CORRUPT_DELETE]Operazione di salvataggio[/CORRUPT_DELETE]
[CORRUPT_DELETE]Uccidere David[/CORRUPT_DELETE]
[GLITCH]
Opzioni:
Eliminazione David
-Probabilità di riuscita: 50%
-Probabilità morte Polaris: 99%
[CORRUPT_DELETE]Utilizzo granate framm[/CORRUPT_DELETE]
[CORRUPT_DELETE]Massacro[/CORRUPT_DELETE]
Attentato tramite esplosivi
-Probabilità di riuscita: 20%
-Probabilità morte Polaris: 99%

Evie: movimento frenetico – tono di voce in aumento
Comunicazione messaggistica Freak Show - Polaris
Dati raccolti:
— cimice nel portafortuna
— ultimatum entro sera
Decisione finale: contattare EBM
—
17:10
Posizione Sascha: sgabuzzino
Stato: addormentato → sveglio → instabile
—
17:12
Movimento Sascha → uscita del Totentantz
Obiettivo: 
documenti falsi - estrazione Polaris
Recupero:
Kintsugi → inseguimento → lesioni verbali → fallimento
Evie → inseguimento → manipolazione persuasiva → successo
Esito: ritorno del soggetto
—
17:15
Vortex: individuato
Istruzioni: 
fermare Sascha se necessario
Proposta Vortex: 
riorganizzazione denti non consensuale
Risposta: 
assenso condizionato
—
17:16
Movimento → Corporate Plaza
Deviazione: abitazione Evie
—
17:40
Ingresso → abitazione Evie
Foxy → uscita dell'abitazione
Proposta Freak Show:
cessione della propria persona a Netwatch
Risposta Evie: 
opposizione assoluta
Valutazione Kintsugi:
[CORRUPT_DELETE]Recupero dati KINSTUGI.SYS[/CORRUPT_DELETE]
[CORRUPT_DELETE]Recupero dati TAICHI.MEM[/CORRUPT_DELETE]
Alternative rilevate:
0
Risposta:
Autonomia decisionale del soggetto Freak Show sottolineata
—
17:50
Accesso al piano superiore
Guardie:
— addestramento alto
— potenziale letale
Ingresso autorizzato
—
17:51
Comunicazione Evie - Vivienne
Contenuto:
— posizione: Silver Dragon
— identità nota
— copertura saltata
— necessità discrezione
Reazione Vivienne: panico
Inizio comunicazione Vivienne - contatti EBM
—
17:55:03
> EVENTO CRITICO RILEVATO
> SCRITTURA IMMEDIATA SU "KINTSUGI.SYS - LONG_TERM_STORAGE"
Proiettile → traiettoria finestra
Vivienne → Deceduta
Coniuge → Illeso
[CORRUPT_DELETE]!ANOMALIA!: risposta emotiva positiva associata a: decesso corpor[/CORRUPT_DELETE]
[CORRUPT_DELETE]Ricerca pattern umano in "TAICHI.MEM"[/CORRUPT_DELETE]
[CORRUPT_DELETE]Ricalibrazione "KINTSUGI.SYS"[/CORRUPT_DELETE]
[CRITICALGLITCH]
Risposta emotiva: ignorata
Trasferire coniuge → luogo sicuro
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