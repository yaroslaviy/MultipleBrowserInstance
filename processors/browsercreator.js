const puppeteer = require('puppeteer-extra');
const {parentPort, workerData} = require('worker_threads');
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const {Howl, Howler} = require('howler');

const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'info';

puppeteer.use(pluginStealth());
const {link, proxy} = workerData;
const alarmSound = new Howl({
    src: ['alarm.mp3']
})

async function createBrowsers() {
    const args = ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certifcate-errors', ];
    let arr_proxy;
    if(proxy.length > 0){
        arr_proxy = proxy.split(':')
        console.log(arr_proxy,1)
        const proxyserver = arr_proxy[0] + ':' + arr_proxy[1]
        args.push(`--proxy-server=${proxyserver}`);
    }
    const browser = await puppeteer.launch({
        headless: false,
        args: args,
        ignoreDefaultArgs: ['--enable-automation'],
        defaultViewport: {
            width: 1200,
            height: 1000

        }
    });
    // open new tab
    const page = await browser.newPage();

    const isYeezySupply = /yeezysupply.com/g.test(link)
    

    
    if(proxy.length>0 && arr_proxy.length > 2)
        await page.authenticate({username: arr_proxy[2], password: arr_proxy[3]});
    
    await page.goto(link);
    (await browser.pages())[0].close();

    await page.waitForSelector('body', {visible: true});
    await logger.info('opened page  -', page.url());

    if(isYeezySupply){
        await page.waitForSelector('.gl-native-dropdown__select-element', {timeout: 0});
        await logger.log('PASSED SPLASH')
        await page.bringToFront()
        await alarmSound.play();
    }

}

try {
    createBrowsers();
} catch (err) {
    logger.fatal('In brosercreator.js : ' + error(err), username)
}
