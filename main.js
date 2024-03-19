const divider = document.getElementById('divider');
const inputContainer = document.getElementById('input-container');
const outputContainer = document.getElementById('output-container');

let isResizing = false;

divider.addEventListener('mousedown', (event) => {
    isResizing = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
    });
});

function handleMouseMove(event) {
    if (isResizing) {
        const mouseX = event.pageX;
        const containerWidth = window.innerWidth;
        const percentage = (mouseX / containerWidth) * 100;

        inputContainer.style.flex = percentage + '%';
        outputContainer.style.flex = 100 - percentage + '%';
    }
}

function updateOutput() {
    const inputCode = document.getElementById('input-code').value;
    const outputFrame = document.getElementById('output-frame').contentDocument;

    outputFrame.open();
    outputFrame.write(inputCode);
    outputFrame.close();
}

function clearCode() {
    document.getElementById('input-code').value = '';
    updateOutput();
}

function pasteCode() {
    navigator.clipboard.readText().then((text) => {
        document.getElementById('input-code').value = text;
        updateOutput();
    });
}

function compileCode() {
    updateOutput();
}

function loadVideo() {
    var url = document.getElementById("youtube-url").value;
    var videoContainer = document.getElementById("video-player");
    var videoId = getYouTubeId(url);
    if (videoId) {
        // Создаем HTML-код для вставки видео с указанной высотой
        var videoHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>';
        videoContainer.innerHTML = videoHTML;
        // Устанавливаем высоту видео
        var video = videoContainer.querySelector('iframe');
        video.style.height = '200px'; // Новая высота видео
    } else {
        videoContainer.innerHTML = "<p>Введите валидную ссылку</p>";
    }
}


function getYouTubeId(url) {
    var regExp = /^.*(youtu\.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length === 11) {
        return match[2];
    } else {
        return null;
    }
}

document.getElementById("html-code").addEventListener("input", updateOutput);
document.getElementById("css-code").addEventListener("input", updateOutput);

function updateOutput() {
    var htmlCode = document.getElementById("html-code").value;
    var cssCode = "<style>" + document.getElementById("css-code").value + "</style>";
    var outputFrame = document.getElementById("output-frame").contentDocument;
    outputFrame.open();
    outputFrame.write(htmlCode + cssCode);
    outputFrame.close();
}
function loadVideo() {
    var url = document.getElementById("youtube-url").value;
    var videoContainer = document.getElementById("video-player");
    var videoId = getYouTubeId(url);
    if (videoId) {
        videoContainer.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>';
    } else {
        videoContainer.innerHTML = "<p>Введите валидную ссылку</p>";
    }
}


// Update the output when the page loads
window.onload = updateOutput;

// Update the output when the input code changes
document.getElementById('input-code').addEventListener('input', updateOutput);
