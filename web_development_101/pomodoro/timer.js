function start(duration, display) {
    let minutes = seconds = '';

    console.log(duration);

    let timer = setInterval(function() {
        if (display.getAttribute('running') != null) {       
            minutes = parseInt(duration / 60, 10);
            seconds = parseInt(duration % 60, 10);
            
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            
            
            duration--;
            
            display.textContent = minutes + ':' + seconds;
        }
        else
            clearInterval(timer);
    }, 1000);
}

window.onclick = function() {
    const display = document.querySelector('#time');
    display.toggleAttribute('running');

    let string = display.textContent;

    minutes = Number(string.slice(0, 2));
    seconds = Number(string.slice(3, 5));

    duration = minutes * 60 + seconds;

    start(duration, display);
}