import {chromium, expect, Page} from "@playwright/test";
import { page, browser, Browser } from "../steps/world";
import { context } from "@cucumber/cucumber";
const { Given, When, Then, And } = require('@cucumber/cucumber');



Given('User navigates to home page', async function () {
    await expect(page.getByRole('link', { name: 'Strypes logo' })).toBeVisible();
    const acceptButton = page.getByRole('button', { name: 'Accept All' });
    await acceptButton.click();  
});

Given('User sees {string} navigation menu item', async function (menuItemName: string) {
    const xpath = `(//section[2]//li//a[contains(@class,'elementor-item menu-link')][contains(text(),'${menuItemName}')])[1]`;
    const locator = page.locator(xpath);
    await expect(locator).toBeVisible();
});

Then('User scrolls down the home page to see {string} disclaimer', async function (disclaimerText: string) {
    await page.getByText(disclaimerText).scrollIntoViewIfNeeded();
});

Given('User verifies the slider {string} has {string} headings value', async function (slideNum: string, headingsValue: string){
    const xpath = `(//div[contains(@aria-label,'${slideNum}')][1])//div[contains(@class,'elementor-slide-heading')][contains(text(),'${headingsValue}')]`
    const locator = page.locator(xpath);
    await expect(locator).toBeVisible()
});

Given('User verifies the slider {string} has {string} description', async function (slideNum: string, headingsValue: string){
    const xpath = `(//div[contains(@aria-label,'${slideNum}')][1])//div[contains(@class,'elementor-slide-description')][contains(text(),'${headingsValue}')]`
    const locator = page.locator(xpath);
    await expect(locator).toBeVisible()
});

Then('User verifies that {string} slider button is present', async function (btnName: string) {
    const xpath = `(//a[contains(@class,'elementor-button elementor-slide-button elementor-size-md')])[1][contains(text(),'${btnName}')]`
    const locator = page.locator(xpath);
    await expect(locator).toBeVisible()
});

Given('User hovers {string} navigation menu item', async function (menuItemName: string) {
    const xpath = `(//section[2]//li//a[contains(@class,'elementor-item menu-link')][contains(text(),'${menuItemName}')])[1]`;
    const locator = page.locator(xpath);
    await expect(locator).toBeVisible();
    await (locator).hover();
    await (locator).click();
});

Given('User sees the {string} sub-menu option in the navigation menu', async function (subMenuItemName: string){
    const xpath = `((//section[2]//li//a[contains(@class,'elementor-sub-item menu-link')][contains(text(),'${subMenuItemName}')])[1])`
    const locator = page.locator(xpath);
    await expect(locator).toBeVisible();
});

Given('User clicks {string} navigation menu item', async function (menuItemName: string) {
    const xpath = `(//section[2]//li//a[contains(@class,'elementor-item menu-link')][contains(text(),'${menuItemName}')])[1]`;
    const locator = page.locator(xpath);
    await expect(locator).toBeVisible();
    await (locator).click();
});

Given('User verifies landing on {string} page', async function(expectedUrl: string){
    const currentUrl = page.url();
    expect(currentUrl).toBe(expectedUrl);
});

Given('User sees {string} text', async function(text: string){
    const xpath = `//div[contains(@class,'elementor-widget-container')]//h2[contains(.,'${text}')]`
    const locator = page.locator(xpath);
    await expect(locator).toBeVisible();
});

Then('User applies {string} filter in open positions and prints them', async function (filterName: string) {
    const xpathDropDown = `//select[contains(@class,'facetwp-dropdown')]`;
    const xpathPositions = `//article[contains(@class,'elementor-post')]//h2//a`;
    const dropDown = await page.waitForSelector(xpathDropDown);  
    if (!dropDown) {
        throw new Error(`Dropdown element ${xpathDropDown} not found`);
    }
    // Click the dropdown to open it
    await dropDown.scrollIntoViewIfNeeded();
    await dropDown.hover();
    await dropDown.click();
    // Wait for the dropdown options to appear (if necessary)
    await page.waitForTimeout(2000); // Adjust timeout as needed
    // Select the option based on filterName
    const firstLetter = filterName.trim().charAt(0);
    await page.keyboard.press(firstLetter);
    await page.keyboard.press('Enter');;
    await page.waitForTimeout(2000);
    // Wait for positions to load
    await page.waitForSelector(xpathPositions);
    // Get position elements and print their text content
    const positionElements = await page.$$(xpathPositions);
    const positions = await Promise.all(positionElements.map(async (element:any) => {
        return await element.textContent();
    }));
    console.log('Positions:', positions);
});

Given('User finds {string} social media link and verifies the image is loaded', async function (socialMedia: string) {
    const xpath = `//span[contains(@class,'elementor-grid-item')]//a[span[contains(.,'${socialMedia}')]]`;
    const locator = page.locator(xpath);
    await expect(locator).toBeVisible();
});

Given('User clicks on {string} social media link and gets redirected to {string} url', async function (socialMediaLink: string, socialMediaLinkUrl: string) {
    const xpath = `//span[contains(@class,'elementor-grid-item')]//a[span[contains(.,'${socialMediaLink}')]]`
    const locator = page.locator(xpath);
    await expect(locator).toBeVisible();
    locator.click();
    const [pages] = await Promise.all([page.context().waitForEvent("page")]);
    const tabs = pages.context().pages();
    await tabs[1].waitForLoadState("load");
    let tabUrl = await tabs[1].url();
    expect(tabUrl).toEqual(socialMediaLinkUrl);
});
