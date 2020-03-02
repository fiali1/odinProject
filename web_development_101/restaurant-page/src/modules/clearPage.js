function clearPage () {
    const content = document.querySelector('#content');
    if(content.children.length > 0)
        content.lastChild.remove();
}

export default clearPage;