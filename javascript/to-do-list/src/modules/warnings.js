import { clearTodos } from './sidebar';
import { generateDarkDiv, clearForm } from './forms';

export function emptyWarning() {
    const sidebar = document.querySelector('.sidebar');
    const warningDiv = document.createElement('div');
    const warningText = document.createElement('h3');
    const warningDescription = document.createElement('p');

    warningDiv.classList.add('empty-warning');
    warningText.textContent = 'It appears you have no Projects or To Dos.';
    warningDescription.textContent = 'Start by creating either one with the \'+\' buttons!';

    warningDiv.appendChild(warningText);
    warningDiv.appendChild(warningDescription);
    sidebar.appendChild(warningDiv);
}

export function clearWarning(projects) {
    const darkDiv = generateDarkDiv();
    const warningDiv = document.createElement('div');
    const warningText = document.createElement('h3');
    const yesBtn = document.createElement('button');
    const noBtn = document.createElement('button');

    warningDiv.classList.add('clear-warning');
    warningText.textContent = 'Are you sure you want to delete all To Dos?';
    yesBtn.classList.add('yes-btn');
    noBtn.classList.add('no-btn');
    yesBtn.textContent = 'Yes';
    noBtn.textContent = 'No';

    yesBtn.addEventListener('click', () => clearTodos(projects));
    noBtn.addEventListener('click', () => clearForm());

    warningDiv.appendChild(warningText);
    warningDiv.appendChild(yesBtn);
    warningDiv.appendChild(noBtn);
    darkDiv.appendChild(warningDiv);
    document.body.appendChild(darkDiv);
}

export function noTitleWarning(titleInput, opr) {
    titleInput.placeholder = 'Please Insert Some Title';
    titleInput.toggleAttribute('no-title-warning');

    setTimeout(() => {
        titleInput.placeholder = (opr == 0) ? 'Enter Project Title' : 'Enter To Do Title';
        titleInput.toggleAttribute('no-title-warning');
    }, 1500);

    return;
}