const puppeteer = require('puppeteer-extra');
const {parentPort, workerData} = require('worker_threads');
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const Discord = require('discord.js')
const {discordid, discordtoken} = require('../config/discord')
const hook = new Discord.WebhookClient(discordid, discordtoken);

const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'info';

puppeteer.use(pluginStealth());
const {link, proxy} = workerData;


async function createBrowsers() {
    const args = ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certifcate-errors' ];
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
        defaultViewport: null,
        devtools: false
    });
    // open new tab
    const page = await browser.newPage();

    const isYeezySupply = /yeezysupply.com/g.test(link)
    
    hook.sendSlackMessage({
        'username': 'MultipleBrowser',
        'attachments': [{
          'pretext': 'YEEZY SUPPLY PASSED QUEUE',
          'color': '#9999ff',
          'footer_icon': 'https://www.yeezysupply.com/glass/react/99ff112/assets/img/yeezy-supply/favicon-96x96.png',
          'footer': 'Powered by yaroslaviy',
          'ts': Date.now() / 1000
        }]
      }).catch(console.error);
    
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
        
    }

}

try {
    createBrowsers();
} catch (err) {
    logger.fatal('In brosercreator.js : ' + error(err), username)
}
