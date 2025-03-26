function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12; // 12시간제로 변환
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

    // 한국 시간 기준 날짜
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    document.getElementById('date').textContent = `${month} . ${day}`;

    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('ampm').textContent = ampm;

    // 기본 반지름 (고정 크기 기준)
    const hourRadius = 140;
    const minuteRadius = 130;
    const secondRadius = 120;

    // strokeDasharray 계산
    const hourCircumference = 2 * Math.PI * hourRadius;
    const minuteCircumference = 2 * Math.PI * minuteRadius;
    const secondCircumference = 2 * Math.PI * secondRadius;

    const hourProgress = (now.getHours() % 12) / 12 * hourCircumference;
    const minuteProgress = now.getMinutes() / 60 * minuteCircumference;
    const secondProgress = now.getSeconds() / 60 * secondCircumference;

    const hourCircle = document.querySelector('.hour-circle');
    const minuteCircle = document.querySelector('.minute-circle');
    const secondCircle = document.querySelector('.second-circle');

    // strokeDasharray 업데이트 (로딩바만)
    hourCircle.style.strokeDasharray = `${hourProgress} ${hourCircumference}`;
    minuteCircle.style.strokeDasharray = `${minuteProgress} ${minuteCircumference}`;
    secondCircle.style.strokeDasharray = `${secondProgress} ${secondCircumference}`;
}

function applyColors() {
    const urlParams = new URLSearchParams(window.location.search);
    const hourColor = urlParams.get('hour') || document.getElementById('hourColor')?.value || '#c1a7e2';
    const minuteColor = urlParams.get('minute') || document.getElementById('minuteColor')?.value || '#946397';
    const secondColor = urlParams.get('second') || document.getElementById('secondColor')?.value || '#dfcef2';
    const textColor = urlParams.get('text') || document.getElementById('textColor')?.value || '#5c4969';

    const hourCircle = document.querySelector('.hour-circle');
    const minuteCircle = document.querySelector('.minute-circle');
    const secondCircle = document.querySelector('.second-circle');
    const hourGuide = document.querySelector('.hour-guide');
    const minuteGuide = document.querySelector('.minute-guide');
    const secondGuide = document.querySelector('.second-guide');

    hourCircle.style.stroke = hourColor;
    minuteCircle.style.stroke = minuteColor;
    secondCircle.style.stroke = secondColor;
    hourGuide.style.stroke = hourColor;
    minuteGuide.style.stroke = minuteColor;
    secondGuide.style.stroke = secondColor;
    document.querySelector('.time-text').style.color = textColor;
    document.querySelector('.ampm-text').style.color = textColor;
    document.querySelector('.date-text').style.color = textColor;

    // 색상 코드 동적 표시 (index.html에서만)
    if (document.getElementById('hourCode')) {
        document.getElementById('hourCode').textContent = hourColor;
        document.getElementById('minuteCode').textContent = minuteColor;
        document.getElementById('secondCode').textContent = secondColor;
        document.getElementById('textCode').textContent = textColor;
    }
}

if (document.getElementById('hourColor')) {
    document.getElementById('hourColor').addEventListener('input', applyColors);
    document.getElementById('minuteColor').addEventListener('input', applyColors);
    document.getElementById('secondColor').addEventListener('input', applyColors);
    document.getElementById('textColor').addEventListener('input', applyColors);
}

setInterval(updateClock, 1000);
updateClock();
applyColors();
