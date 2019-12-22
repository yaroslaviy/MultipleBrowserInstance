const {remote} = require('electron');

const startbutton = document.querySelector('#start');
startbutton.addEventListener('click', () => {
    const link = document.querySelector('#sitelink').value
    const tasks = document.querySelector('#tasksnum').value
    remote.require('./main.js').run(link, tasks);
});
