import { test, expect } from '@playwright/test';

test('add two items and verify cart count, product names and prices', async ({ page }) => {
  // login
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');

  // ensure product list loaded
  const items = page.locator('.inventory_item');
  await expect(items.first()).toBeVisible();

  // capture names and prices of first two products on products page
  const name0 = (await items.nth(0).locator('.inventory_item_name').textContent())?.trim() || '';
  const price0 = parseFloat((await items.nth(0).locator('.inventory_item_price').textContent() || '').replace(/[^0-9.]/g, ''));
  const name1 = (await items.nth(1).locator('.inventory_item_name').textContent())?.trim() || '';
  const price1 = parseFloat((await items.nth(1).locator('.inventory_item_price').textContent() || '').replace(/[^0-9.]/g, ''));

  // add those two products to cart (click Add to cart buttons)
  await items.nth(0).locator('button').click();
  await items.nth(1).locator('button').click();

  // verify cart badge shows 2
  const badge = page.locator('.shopping_cart_badge');
  await expect(badge).toHaveText('2');

  // open cart and verify item count and details
  await page.click('.shopping_cart_link');
  await page.waitForURL('**/cart.html');

  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(2);

  // verify product names and prices in cart match the products page
  const cartName0 = (await cartItems.nth(0).locator('.inventory_item_name').textContent())?.trim() || '';
  const cartPrice0 = parseFloat((await cartItems.nth(0).locator('.inventory_item_price').textContent() || '').replace(/[^0-9.]/g, ''));
  const cartName1 = (await cartItems.nth(1).locator('.inventory_item_name').textContent())?.trim() || '';
  const cartPrice1 = parseFloat((await cartItems.nth(1).locator('.inventory_item_price').textContent() || '').replace(/[^0-9.]/g, ''));

  expect([cartName0, cartName1]).toEqual([name0, name1]);
  expect([cartPrice0, cartPrice1]).toEqual([price0, price1]);

//   // verify displayed subtotal equals sum of the two item prices
//   const sum = price0 + price1;
//   const subtotalText = await page.locator('.summary_subtotal_label').textContent();
//   const displayed = parseFloat((subtotalText || '').replace(/[^0-9.]/g, ''));
//   expect(sum).toBeCloseTo(displayed, 2);
});
