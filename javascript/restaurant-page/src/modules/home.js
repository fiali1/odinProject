function home () {
    const content = document.querySelector('#content');
    const info = document.createElement('div');
    const header = document.createElement('h3');
    const description = document.createElement('p');

    info.classList.add('info');
    header.textContent = 'Visit us.';
    description.textContent = 'Enjoy a great meal in a pleasant environment, be it day or evening.';

    info.appendChild(header);
    info.appendChild(description);
    content.appendChild(info);
}

export default home;