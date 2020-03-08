function clearPage () {
    const content = document.querySelector('#content');
    const selected = document.querySelector('.selected');
    if(selected != null)
        selected.classList.toggle('selected');
    if(content.children.length > 0)
        content.lastChild.remove();
}

export default clearPage;