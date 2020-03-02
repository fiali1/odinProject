function home () {
    const content = document.querySelector('#content');
    const info = document.createElement('div');
    const header = document.createElement('h3');
    const description = document.createElement('p');

    document.body.style.backgroundImage = 'url(https://c.pxhere.com/photos/22/1e/interior_dark_restaurant_drink_food-143258.jpg!d)';
    info.classList.add('info');
    header.textContent = 'Visit us.';
    description.textContent = 'Enjoy a great meal in a pleasent environment, be it day or evening.';

    info.appendChild(header);
    info.appendChild(description);
    content.appendChild(info);
}

export default home;