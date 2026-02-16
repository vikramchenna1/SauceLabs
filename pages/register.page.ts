import { Page, Locator, expect } from "playwright/test";

export class RegisterPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly genderMaleRadio: Locator;
    readonly genderFemaleRadio: Locator;
    readonly hobbiesCricketCheckbox: Locator;
    readonly hobbiesMoviesCheckbox: Locator
    readonly hobbiesHockeyCheckbox: Locator;
    readonly languagesInput: Locator;
    readonly skillsSelect: Locator;
    readonly countrySelect: Locator;
    readonly selectCountrySelect: Locator;
    readonly dobYearSelect: Locator;
    readonly dobMonthSelect: Locator;
    readonly dobDaySelect: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator
    readonly submitButton: Locator;
    readonly refreshButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name')
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.addressInput = page.locator('textarea[ng-model="Adress"]');
        this.emailInput = page.locator('input[ng-model="EmailAdress"]');
        this.phoneInput = page.locator('input[ng-model="Phone"]');
        this.genderMaleRadio = page.getByLabel('Male');
        this.genderFemaleRadio = page.getByLabel('Female');
        this.hobbiesCricketCheckbox = page.getByLabel('Cricket');
        this.hobbiesMoviesCheckbox = page.getByLabel('Movies');
        this.hobbiesHockeyCheckbox = page.getByLabel('Hockey');
        this.languagesInput = page.locator('#msdd');
        this.skillsSelect = page.locator('select#Skills');
        this.countrySelect = page.locator('select#countries');// simple select
        this.selectCountrySelect = page.locator('span[role="combobox"]');// select2
        this.dobYearSelect = page.getByPlaceholder('Year');//Year
        this.dobMonthSelect = page.getByPlaceholder('Month');//Month
        this.dobDaySelect = page.getByPlaceholder('Day');//Day
        this.passwordInput = page.locator('input[id="firstpassword"]');
        this.confirmPasswordInput = page.locator('input[id="secondpassword"]');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.refreshButton = page.getByRole('button', { name: 'Refresh' });

    }
    async goto(){
        await this.page.goto("https://demo.automationtesting.in/Register.html");
    }
    async fillForm(firstName: string, lastName: string, address: string, email: string, phone: string){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.addressInput.fill(address);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
        await this.languagesInput.click();
        
    }

}