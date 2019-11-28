const { Worker } = require('worker_threads');
const fs = require('fs');
const readline = require('readline');

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const proxy = fs.readFileSync('./config/proxy.txt', 'utf-8')
    .split('\n')
    .filter(Boolean);

const run = async (userlink, tasks) => {
    
    const proxyToPass = proxy.length > 0 ? proxy[i].replace('\r','') : '';
    for(let i = 0; i < tasks; i++) {
        const thread = new Worker(require.resolve('./adidasspoofbrowser.js'), {
            workerData: { link: userlink, proxy: proxyToPass}
        });
        console.log(userlink)
        thread.on("message", (msg) => console.log(msg, thread.threadId, accounts[i].email));
        thread.on("error", (e) => console.log(e));
        thread.on("exit", (code) => console.log(code))
    }

}

module.exports = {
    run: run
}

