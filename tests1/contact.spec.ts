import {test, expect } from "@playwright/test"

test.describe('Contact', () => {
    test('Fill contact form and verify success message', async ({page}) => {
        
        //open contact page
        await page.goto("https://practice.sdetunicorns.com/contact/")

        //Fill out input fields
        await page.locator('.contact-name input').fill('Test Name')
        await page.locator('.contact-email input').fill('test@amil.com')
        await page.locator('.contact-phone input').fill('123456768')
        await page.locator('.contact-message textarea').fill('Test Name content text area')

        //add a soft assertion
        await expect.soft(page.locator('.contact-message textarea')).toHaveText('Test Name content')
                
        //Click submit
        await page.locator('button[type="submit"]').click()
        expect(test.info().errors.length).toBeLessThan(1);

        //Verify success message
        const successAlert=page.locator('div[role="alert"]');
        await expect(successAlert).toHaveText('Thanks for contacting us! We will be in touch with you shortly');
        

    })
})