function createContact(contactContainer) {
    for(let i = 0; i < 3; i++) {
        const contactDiv = document.createElement('div');
        const contactIcon = document.createElement('img');
        const contactHeader = document.createElement('h3');
        const contactDescription = document.createElement('p');

        if (i == 0) {
            contactIcon.src = './icons/message-outline.png';
            contactHeader.textContent = 'Chat';
            contactDescription.textContent = '223-456-7890';
        }
        else if (i == 1) {
            contactIcon.src = './icons/phone-outline.png';
            contactHeader.textContent = 'Phone';
            contactDescription.textContent = '234-567-8900';
        }
        else if (i == 2) {
            contactIcon.src = './icons/email-outline.png';
            contactHeader.textContent = 'Email';
            contactDescription.textContent = 'therestaurant@email.com';
        }

        contactDiv.appendChild(contactIcon);
        contactDiv.appendChild(contactHeader);
        contactDiv.appendChild(contactDescription);
        contactContainer.appendChild(contactDiv);
    }
}

function contact () {
    const content = document.querySelector('#content');
    const info = document.createElement('div');
    const header = document.createElement('h3');
    const contactContainer = document.createElement('div');

    createContact(contactContainer);

    info.classList.add('contact-info');
    contactContainer.classList.add('container');
    header.textContent = 'Contact us.';
    
    info.appendChild(header);
    info.appendChild(contactContainer);
    content.appendChild(info);
}

export default contact;