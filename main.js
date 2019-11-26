const { Worker } = require('worker_threads')
const accounts = require('./account.json');
//todo
const acc_number = accounts.length;

//let arr_threads = [...Array(acc_number)].fill(0);

for(let i = 0; i< acc_number; i++) {
    const thread = new Worker(require.resolve('./adidasspoofbrowser.js'), {
        workerData: { account: accounts[i] /*, proxy: proxy[0]*/}
    });

    thread.on("message", (msg) => console.log(msg, thread.threadId, accounts[i].email));
    thread.on("error", (e) => console.log(e));
    thread.on("exit", (code) => console.log(code))
}
