function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;

    const hourProgress = (now.getHours() % 12) / 12 * 879;
    const minuteProgress = now.getMinutes() / 60 * 816;
    const secondProgress = now.getSeconds() / 60 * 754;

    document.querySelector('.hour-circle').style.strokeDasharray = `${hourProgress} 879`;
    document.querySelector('.minute-circle').style.strokeDasharray = `${minuteProgress} 816`;
    document.querySelector('.second-circle').style.strokeDasharray = `${secondProgress} 754`;
}

function applyColors() {
    const urlParams = new URLSearchParams(window.location.search);
    const hourColor = urlParams.get('hour') || document.getElementById('hourColor')?.value || '#4a90e2';
    const minuteColor = urlParams.get('minute') || document.getElementById('minuteColor')?.value || '#50c878';
    const secondColor = urlParams.get('second') || document.getElementById('secondColor')?.value || '#ff6f61';
    const textColor = urlParams.get('text') || document.getElementById('textColor')?.value || '#333333';

    document.querySelector('.hour-circle').style.stroke = hourColor;
    document.querySelector('.minute-circle').style.stroke = minuteColor;
    document.querySelector('.second-circle').style.stroke = secondColor;
    document.querySelector('.time-text').style.color = textColor;
}

function copyEmbedCode() {
    const hourColor = document.getElementById('hourColor').value.replace('#', '');
    const minuteColor = document.getElementById('minuteColor').value.replace('#', '');
    const secondColor = document.getElementById('secondColor').value.replace('#', '');
    const textColor = document.getElementById('textColor').value.replace('#', '');

    const githubPageUrl = `https://dajooneeland.github.io/DynamicCircleClock/embed.html?hour=${hourColor}&minute=${minuteColor}&second=${secondColor}&text=${textColor}`;
    const embedCode = `<iframe src="${githubPageUrl}" width="300" height="300" frameborder="0"></iframe>`;
    
    const textarea = document.getElementById('embedCode');
    textarea.value = embedCode;
    textarea.select();
    document.execCommand('copy');
    alert('Embed 코드가 복사되었습니다!');
}

// 색상 입력 이벤트 리스너 추가
if (document.getElementById('hourColor')) {
    document.getElementById('hourColor').addEventListener('input', applyColors);
    document.getElementById('minuteColor').addEventListener('input', applyColors);
    document.getElementById('secondColor').addEventListener('input', applyColors);
    document.getElementById('textColor').addEventListener('input', applyColors);
}

setInterval(updateClock, 1000);
updateClock();
applyColors(); // 초기 색상 적용
