import { After, Before, setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import { ICreateAttachment, ICreateLog } from '@cucumber/cucumber/lib/runtime/attachment_manager';
import { Browser, BrowserContext, chromium, Page} from 'playwright';

let browser: Browser;
let page: Page;


setDefaultTimeout(60 * 1000);


Before(async () => {
    try {
        browser = await chromium.launch({ headless: false});
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://strypes.eu/");
        console.log(`captured site title as ${await page.title()}`);
    }
    catch(error){
        console.log(`chrome navigation to homepage failed due to ${error}`)
        throw new Error(`chrome navigation to homepage failed due to ${error}`)
    }
    return page;
});

  After(async () =>{
      await browser.close();
  });

export {browser, Page, Browser, page};

