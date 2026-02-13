import { test, expect } from "playwright/test"
import { SauceLoginPage } from "../pages1/sauceLogin.page.ts"
import { SauceProductsPage } from "../pages1/sauceProducts.page.ts";
import creds from '../test-data/credentials.json';

test.describe("Sauce Demo Loing Tests with POM", () => {

    let sauceloginPage: SauceLoginPage;
    let sauceproductsPage: SauceProductsPage;

    test.beforeEach(async ({ page }) => {
        sauceloginPage = new SauceLoginPage(page);
        sauceproductsPage = new SauceProductsPage(page);


    })

    test.afterEach(async ({ page }) => {
        //await page.waitForTimeout(5000);
    });

    test.only("should not login without credentials", async ({ page }) => {
        await sauceloginPage.goto();
        // leave both fields empty to validate the username-required error
        await sauceloginPage.emptyCredentialsLogin('', '');
        // To check error message get displayed when login with empty credentials
        await expect(sauceloginPage.usernameError).toBeVisible()
        //To print the error message on console
        console.log(await sauceloginPage.usernameError.textContent())
        expect(sauceloginPage.usernameError).toHaveText('Epic sadface: Username is required');
    })
    test("should not login without password", async ({ page }) => {
        await sauceloginPage.goto();
        await sauceloginPage.loginWithoutPassword('standard_user', '')

        // To check error message is displayed when login is performed without password
        await expect(sauceloginPage.passwordError).toBeVisible();
        //To print the error message on console
        console.log(await sauceloginPage.passwordError.textContent())
    })
    test("should not login without username", async ({ page }) => {
        await sauceloginPage.goto();
        await sauceloginPage.loginWithoutUsername('', 'secret_sauce')
        //To check username error message is diaplayed when login is performed without username
        await expect(sauceloginPage.usernameError).toBeVisible();
    })

    test("should login successfully with valid credentails", async ({ page }) => {
        await sauceloginPage.goto();
        await sauceloginPage.login(creds.username, creds.password);
        // To check successful login by verifying the url
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })
    test("should verify product page elements", async ({ page }) => {

        await sauceproductsPage.validateProductPageElements();
    })

    test("print all the products on console", async ({ page }) => {
        const products = page.locator("[data-test='inventory-item-name']");
        await products.first().waitFor();
        console.log(await products.allTextContents())
    })
})