const puppeteer = require('puppeteer-extra');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'info';
const {parentPort, workerData} = require('worker_threads');
const pluginStealth = require("puppeteer-extra-plugin-stealth")
puppeteer.use(pluginStealth());

const {link, proxy} = workerData

async function createBrowsers() {
    const args = ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certifcate-errors'];
    if(proxy.length > 0){
    const arr_proxy = proxy.split(':')
    const proxyserver = arr_proxy[0] + ':' + arr_proxy[1]
    args.push(`--proxy-server=${proxyserver}`);
    }
    const browser = await puppeteer.launch({
        headless: false,
        args: args,

        defaultViewport: {
            width: 1200,
            height: 1000

        }
    });
    // open new tab
    const page = await browser.newPage();

    

    //console.log(arr_proxy)
    if(proxy.length>0)
    await page.authenticate({username: arr_proxy[2], password: arr_proxy[3]});
    
    await page.goto(link);
    (await browser.pages())[0].close();

    await page.waitForSelector('body', {visible: true});
    await logger.info('opened adidas page  -', page.url());

    // fill information   await page.waitForSelector(emailField, {visible: true})
    // await page.click(emailField);

}

try {
    createBrowsers();
} catch (err) {
    logger.fatal('In index.js : ' + error(err), username)
}
