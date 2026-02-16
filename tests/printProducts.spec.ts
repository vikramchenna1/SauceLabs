import { test } from '@playwright/test';

test('print all products on inventory page', async ({ page }) => {
  // go to login and sign in with the demo account
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // wait for inventory page
  await page.waitForURL('**/inventory.html');

  // locate product name elements and print them
  const products = page.locator("[data-test='inventory-item-name']");
  await products.first().waitFor();
  const names = await products.allTextContents();
  for (const name of names) 
    console.log(name.trim());
});
