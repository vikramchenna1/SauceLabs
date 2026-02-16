import {test,expect} from '@playwright/test';
import { SauceLoginPage } from '../pages/sauceLogin.page';
import { SauceProductsPage } from '../pages/sauceProducts.page';

test.describe('Sauce Demo Products page Tests',()=>{

    let sauceloginPage:SauceLoginPage;
    let sauceproductsPage:SauceProductsPage;
    let context: any
    let page;

    test.beforeAll(async ({ browser })=>{
       context = await browser.newContext();
        page = await context.newPage();
        sauceloginPage = new SauceLoginPage(page);
        sauceproductsPage = new SauceProductsPage(page);
        await sauceloginPage.goto();
        await sauceloginPage.login('standard_user', 'secret_sauce');
    })

    test.afterAll(async ()=>{
        await context.close();
    })

    test('should verify Product page elements',async()=>{
        await sauceproductsPage.validateProductPageElements();
    })

    test('should print all the product names on console',async()=>{
        await sauceproductsPage.printProductNames();
    })

})