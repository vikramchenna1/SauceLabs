import { Page, expect, Locator } from "playwright/test";
export class SauceLoginPage {

    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly usernameError: Locator;
    readonly passwordError: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.usernameError = page.getByText('Epic sadface: Username is required');
        this.passwordError = page.getByText('Epic sadface: Password is required');
    }

    async goto(){
        await this.page.goto("https://www.saucedemo.com/")
    }
    async login(username:string, password:string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click()
    }
    async emptyCredentialsLogin(username:string, password:string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click()
    }
    async loginWithoutPassword(username:string, password:string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click()
    }
    async loginWithoutUsername(username:string, password:string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click()
    }
    
}
