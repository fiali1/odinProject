function changeTheme(e, display) {
    let theme = display.getAttribute('theme');

    const stylesheet = document.querySelector('#theme');
    const playPause = document.querySelector('#play-pause');
    const stop = document.querySelector('#stop');

    if (e.target.id == 'sepia') 
        theme = 'sepia';
    else if (e.target.id == 'red')
        theme = 'red';
    else if (e.target.id == 'dark')
        theme = 'dark';

    stylesheet.setAttribute('href', `./css/styles_${theme}.css`);

    if(display.getAttribute('running') != null)
        playPause.setAttribute('src', `./assets/icons/pause_${theme}.png`);
    else
        playPause.setAttribute('src', `./assets/icons/play_${theme}.png`);
    
    stop.setAttribute('src', `./assets/icons/stop_${theme}.png`);    

    display.setAttribute('theme', theme);
}

function leadingZero(value) {
    value = value < 10 ? '0' + value : value;
    return value;
}

function reset(display, play) {
    display.removeAttribute('running');

    if(display.getAttribute('initialValue') == null)
        return;

    const theme = display.getAttribute('theme');
    play.setAttribute('src', `./assets/icons/play_${theme}.png`);

    const value = display.getAttribute('initialValue');
    let minutes = parseInt(value / 60, 10);
    let seconds = parseInt(value % 60, 10);

    minutes = leadingZero(minutes);
    seconds = leadingZero(seconds);

    display.textContent =  minutes + ':' + seconds;

    display.removeAttribute('initialValue');
}

function startCountdown(duration, display, play) {
    if (display.getAttribute('initialValue') == null)
        display.setAttribute('initialValue', duration); 

    let minutes, seconds = '';

    let timer = setInterval(function() {
        if(display.getAttribute('running') != null) {
            minutes = parseInt(duration / 60, 10);
            seconds = parseInt(duration % 60, 10);
            
            minutes = leadingZero(minutes);
            seconds = leadingZero(seconds);
            
            display.textContent = minutes + ':' + seconds;
            
            if (--duration < 0) {
                clearInterval(timer);
                play.setAttribute('src', `./assets/icons/play_${theme}.png`);
            }
        }
        else
            clearInterval(timer);
    }, 1000);
}

function parseValue(value) {
    let processed = '';
    if(value.toString().length < 2)
        processed = '0' + value + ':00';
    else 
        processed = value + ':00';
    
    return processed;
}

function setTimer(e, display, play) {
    display.removeAttribute('running');

    const theme = display.getAttribute('theme');
    play.setAttribute('src', `./assets/icons/play_${theme}.png`);

    const timer = document.querySelector('#timer');
    const id = e.target.id;

    switch (id) {
        case 'work':
            timer.textContent = parseValue(25);
            break;
        case 'short-break':
            timer.textContent = parseValue(5);
            break;
        case 'long-break':
            timer.textContent = parseValue(30);
            break;
        default:
            break;
    }
}

function configCountdown(e, display, play) {
    if (e.target.id == 'play-pause') {
        display.toggleAttribute('running');
        
        const theme = display.getAttribute('theme');
        if (display.getAttribute('running') != null)
            e.target.setAttribute('src', `./assets/icons/pause_${theme}.png`);
        else 
            e.target.setAttribute('src', `./assets/icons/play_${theme}.png`);

        let string = display.textContent;

        minutes = Number(string.slice(0, 2));
        seconds = Number(string.slice(3, 5));

        duration = minutes * 60 + seconds;

        startCountdown(duration, display, play);
    }
    else if (e.target.id == 'stop') {
        reset(display, play);
    }
}

function setEvents() {
    const display = document.querySelector('#timer');
    display.setAttribute('theme', 'sepia');

    const play = document.querySelector('#play-pause');
    
    const themes = document.querySelectorAll('.theme');
    const timestamps = document.querySelectorAll('.timestamp');
    const controllers = document.querySelectorAll('.controller');

    themes.forEach(theme => {
        theme.addEventListener('click', (e) => {
            changeTheme(e, display);
        });
    });

    timestamps.forEach(timestamp => {
        timestamp.addEventListener('click', (e) => {
            setTimer(e, display, play);
        });
    });

    controllers.forEach(controller => {
        controller.addEventListener('click', (e) => {
            configCountdown(e, display, play);
        });
    });
}

setEvents();