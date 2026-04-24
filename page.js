const pageText = document.getElementById("page-text");
const terminal = document.getElementById("terminal");
const backButton = document.querySelector(".back-button");

let pageIndex = 0;

function typePageText() {
    if (pageIndex >= pageContent.length) return;

    pageText.textContent += pageContent.charAt(pageIndex);
    pageIndex++;

    terminal.scrollTop = terminal.scrollHeight;

    setTimeout(typePageText, 55);
}

backButton.addEventListener("click", () => {
    window.location.href = "index.html";
});

typePageText();