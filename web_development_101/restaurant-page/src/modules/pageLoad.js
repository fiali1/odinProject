function pageLoad () {
    const nav = document.createElement('nav');
    const title = document.createElement('li');
    const titleText = document.createElement('h1');
    const list = document.createElement('ul');
    const home = document.createElement('li');
    const homeText = document.createElement('p');
    const about = document.createElement('li');
    const aboutText = document.createElement('p');
    const contact = document.createElement('li');
    const contactText = document.createElement('p');

    titleText.textContent = 'The Restaurant';
    homeText.textContent = 'Home';
    aboutText.textContent = 'About';
    contactText.textContent = 'Contact';

    homeText.classList.add('tab');
    aboutText.classList.add('tab');
    contactText.classList.add('tab');

    homeText.id = 'tab-1';
    aboutText.id = 'tab-2';
    contactText.id = 'tab-3';

    title.appendChild(titleText);
    home.appendChild(homeText);
    about.appendChild(aboutText);
    contact.appendChild(contactText);
    list.appendChild(title);
    list.appendChild(home);
    list.appendChild(about);
    list.appendChild(contact);
    nav.appendChild(list);
    document.body.appendChild(nav);
    document.body.insertBefore(nav, document.body.firstChild);
}

export default pageLoad;