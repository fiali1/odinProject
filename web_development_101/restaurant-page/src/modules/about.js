function about () {
    const content = document.querySelector('#content');
    const info = document.createElement('div');
    const header = document.createElement('h3');
    const description = document.createElement('p');

    info.classList.add('info');
    header.textContent = 'More than 30 years of tradition.';
    description.textContent = 'The Restaurant offers a diverse selection of dishes, including meat, pasta, fish and seafood, salads and vegetarian options. Enjoy the best homemade food in the business!';

    info.appendChild(header);
    info.appendChild(description);
    content.appendChild(info);
}

export default about;