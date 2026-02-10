import {test, expect } from "@playwright/test"
import HomePage from '../pages/home.page';

test.describe('Home', () => {
    let homePage:HomePage;
    test('Open Homepage and verify title', async ({page}) => {
        homePage =new HomePage(page);
        
        //Navigate to Home Page
        await page.goto("https://practice.sdetunicorns.com")
        //Verify Title
        await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns")
    })
    
    test('Open About Page and verify title', async ({page}) => {

         //Navigate to About page
        await page.goto("https://practice.sdetunicorns.com/about")
        //Verify Title
        await expect(page).toHaveTitle("About – Practice E-Commerce Site")
    })
    test('Click on get started button and verify title', async ({page}) => {
        homePage =new HomePage(page);
        //Navigate to About page
        await page.goto("https://practice.sdetunicorns.com")
        //Click get started button
        //await page.locator('#get-started').click()
        await homePage.getStartedBtn.click()
        //Verify Title
        await expect(page).toHaveURL('https://practice.sdetunicorns.com/#get-started')
    })
    test('Verify page text using text locator', async ({ page }) => {
        homePage =new HomePage(page);
        //Navigate to web page
        await page.goto("https://practice.sdetunicorns.com")

        //const headingText = await page.locator('text="Think different. Make different."');
        const headingText=homePage.homeText;
        await expect(headingText).toBeVisible();

    })

        test('Verify Home link is eanbled using CSS and text locators', async ({ page }) => {
        homePage =new HomePage(page);
           //Navigate to web page
           await page.goto("https://practice.sdetunicorns.com")
           //Find home text
           // const homeText = await page.locator('//*[@id="zak-primary-menu"]/li[1]/a')
           //const homeText = await page.locator('#zak-primary-menu:has-text("Home")')

           //const homeText = await page.locator('#zak-primary-menu >> text=Home')
           const homeText=homePage.homeText
           await expect(homeText).toBeEnabled();
                      
        })
        test('Verify text of nav menu', async ({ page }) => {
            homePage=new HomePage(page);
            const expectedLinks= ["Home","About","Shop","Blog","Contact","My account"];
            //Navigate to web page
           await page.goto("https://practice.sdetunicorns.com")
           //Find the nav Links
           //const NavLinks = page.locator('#zak-primary-menu li[id*=menu]');
           const NavLinks= await homePage.NavLinks;
           //Verify Nav Links text
           expect(await NavLinks.allTextContents()).toEqual(expectedLinks);
          // expect(await NavLinks.textContent()).toEqual(expectedLinks[3]);
            // print out all the links
           //    for(const el of await NavLinks.elementHandles()){
        //     console.log(await el.textContent())
        //    }

            
        })
        
        
        
    })
    


