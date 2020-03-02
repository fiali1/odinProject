import pageLoad from './modules/pageLoad';
import clearPage from './modules/clearPage';
import home from './modules/home';
import about from './modules/about';
import contact from './modules/contact';

function switchTab(e) {
    const id = e.target.id;
    
    clearPage();

    switch (id) {
        case 'tab-1':
            home();
            break;
        case 'tab-2':
            about();
            break;
        case 'tab-3':
            contact();
            break;
        default:
            break;
    }
}

function tabEvents() {
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', switchTab);
    })
}

pageLoad();
tabEvents();
home();