const puppeteer = require('puppeteer');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'info';



async function run() {
  const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', 
      '--disable-setuid-sandbox',
      '--ignore-certifcate-errors',

    ],
    
      defaultViewport: null
  });
  // open new tab
  const page = await browser.newPage();

  

  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
    });
  });
  

  //open nike
  await page.goto('https://www.adidas.ca/yeezy');
  
  await page.waitForSelector('body', {visible: true});
  await logger.info('opened adidas page  -', page.url());

  // fill information
//   await page.waitForSelector(emailField, {visible: true})
//   await page.click(emailField);
  
}

try{
    run();  
} catch (err) {
    logger.fatal('In index.js : ' + error(err) , username)
}
