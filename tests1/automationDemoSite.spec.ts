import {test, expect} from 'playwright/test' ;
test ('automation demo site Form',async({ page }) => {

    await page.goto('https://demo.automationtesting.in/Register.html');

    await expect(page.getByRole('link',{ name: 'Register' })).toBeVisible;
    //First Name
    await page.getByPlaceholder('First Name').fill('Joseph Vikram');
    await page.getByPlaceholder('Last Name').fill('Chenna');
    await page.locator('//textarea[@ng-model="Adress"]').fill('Address details are mentioned as per')
    await page.locator('//input[@ng-model="EmailAdress"]').fill('abcd@gmail.com')
    await page.locator('//input[@ng-model="Phone"]').fill('9494993393')
    await page.locator('//input[@value="Male"]').click()
    await page.locator('//input[@value="Cricket"]').check()
    //click Languages dropdown
    await page.locator('//div[@id="msdd"]').click();
    //Selct Languages
    await page.getByRole('link',{name : 'Russian'}).click()






})
