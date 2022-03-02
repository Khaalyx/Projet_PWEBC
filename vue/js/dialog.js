var el = document.querySelector('.dialog');
var content = el.querySelector('.dialog-content');

function showDialog(){
    el.classList.add('show-dialog');
}

function hideDialog(){
    el.classList.remove('show-dialog');
}

document.querySelector('button').addEventListener('click', showDialog, false);
document.querySelector('.dialog-close').addEventListener('click', hideDialog, false);
el.querySelector('.dialog-overlay').addEventListener('click', hideDialog, false);
