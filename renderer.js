const {ipcRenderer, remote} = require('electron');

const startbutton = document.querySelector('#start');
startbutton.addEventListener('click', () => {
    const link = document.querySelector('#sitelink').value
    const tasks = document.querySelector('#tasksnum').value;
    console.log('clicked');
    remote.require('./processors/main.js').run(link, tasks);
});
