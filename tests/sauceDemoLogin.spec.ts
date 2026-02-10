import { test, expect } from "playwright/test";
import creds from '../test-data/credentials.json';
test.describe("Sauce Demo - Login Tests without POM", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.saucedemo.com/")
        await expect(page).toHaveURL("https://www.saucedemo.com/")
    })


    test.only("should login successfully with valid credentials", async ({ page }) => {
        test.slow();
        const usernameInput = page.getByPlaceholder('Username');
        await expect(usernameInput).toBeVisible();
        await usernameInput.fill(creds.username);

        //Locate and fill the password field
        const passwordInput = page.getByPlaceholder('Password')
        await passwordInput.fill(creds.password);

        //verify footer page links or any element to ensure page is fully loaded before clicking login
        const verificationText = page.getByText('Accepted usernames are:');
        await expect(verificationText).toBeVisible()
        const verificationText2 = page.getByText('standard_user')
        await expect(verificationText2).toBeVisible();
        const verficationText3 = page.getByText('performance_glitch_user');
        await expect(verficationText3).toBeVisible()

        //click login button
        const loginButton = page.getByRole('button', { name: 'Login' });
        await loginButton.click();

        //verify successful login by checking the url
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        //verify successful login by checking for page text on the inventory page
        const pageText = page.getByText('Swag Labs')
        await expect(pageText).toBeVisible();

        // Click on a product 
        const product1 = page.getByText('Sauce Labs Bike Light');
        await product1.click();
        await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();

        //check for Add to Cart button
        const addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        await expect(addToCartButton).toBeVisible();
        addToCartButton.click();

        //Verify that the cart has 1 item
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect.soft(cartBadge).toHaveText('2');

        //click on the cart icon to go to the cart page
        const cartIcon = page.locator('[data-test="shopping-cart-link"]')
        await cartIcon.click();

        // check that added product is in the cart
        await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();

        //Check for the Checkout button
        const checkoutButton = page.getByRole('button', { name: 'Checkout' });
        await expect(checkoutButton).toBeVisible({timeout:5000});






    })


})