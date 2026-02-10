import { Page, expect, Locator } from "playwright/test";
export class SauceProductsPage {

    readonly page: Page;
    readonly productpageName: Locator;
    readonly productPageText: Locator;
    readonly addToCartBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productpageName = page.getByText('Swag Labs');
        this.productPageText = page.getByText('Products');
        this.addToCartBtn = page.getByRole('button', { name: 'Add to cart' });
    }
    async validateProductPageElements(){

        await expect(this.page).toHaveTitle('Swag Labs');
        await expect(this.productPageText).toContainText('Products');
        await expect(this.addToCartBtn).toBeVisible();


    }

}