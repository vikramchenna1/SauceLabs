import { Page, expect, Locator } from "playwright/test";
export class SauceProductsPage {

    readonly page: Page;
    readonly productpageName: Locator;
    readonly productPageText: Locator;
    readonly addToCartBtn: Locator;
    readonly productNames: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productpageName = page.getByText('Swag Labs');
        this.productPageText = page.getByText('Products');
        this.addToCartBtn = page.locator('.shopping_cart_link')
        this.productNames = page.locator("[data-test='inventory-item-name']");

    }
    async validateProductPageElements(){

        await expect(this.page).toHaveTitle('Swag Labs');
        await expect(this.productPageText).toContainText('Products');
        await expect(this.addToCartBtn).toBeVisible();

    }
    async printProductNames(){   
        
        // const count = await this.productNames.count();
        // console.log(`Total products: ${count}`);    
        // for (let i = 0; i < count; i++) {
        //     console.log(await this.productNames.nth(i).textContent());
        // }

        //Altermatively, we can also use allTextContents to get an array of all product names and print them
        const productNames = await this.productNames.allTextContents();
        productNames.forEach(name => console.log(name));
        

    }}