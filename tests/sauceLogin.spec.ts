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
        await page.waitForTimeout(5000);
    });

    test("should not login without credentials", async ({ page }) => {
        await sauceloginPage.goto();
        await sauceloginPage.emptyCredentialsLogin("", "");
        // To check error message get displayed when login with empty credentialsl
        await expect(sauceloginPage.usernameError).toBeVisible();
    })
    test("should not login without password", async ({ page }) => {
        await sauceloginPage.goto();
        await sauceloginPage.loginWithoutPassword('standard_user', '')

        // To check error message is displayed when login is performed without password
        await expect(sauceloginPage.passwordError).toBeVisible();
    })
    test("should not login without username", async ({ page }) => {
        await sauceloginPage.goto();
        await sauceloginPage.loginWithoutUsername('', 'secret_sauce')
        //To check username error message is diaplayed when login is performed without username
        await expect(sauceloginPage.usernameError).toBeVisible();
    })

    test.only("should login successfully with valid credentails", async ({ page }) => {
        await sauceloginPage.goto();
        await sauceloginPage.login(creds.username, creds.password);
        // To check successful login by verifying the url
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })
    test("should verify product page elements", async ({ page }) => {

        await sauceproductsPage.validateProductPageElements();
    })

    test("XXXXXXshould verify product details page elements", async ({ page }) => {

        await sauceproductsPage.validateProductPageElements();
    })
})