import { expect, Page } from '@playwright/test';

export class HandlingFramesPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/Frames.html');
    await expect(this.page.getByRole('heading', { name: /iframes?/i })).toBeVisible({ timeout: 5000 }).catch(() => {});
  }

  async interactSingleFrame() {
    const frame = this.page.frameLocator('#singleframe');
    await expect(frame.locator('input[type="text"]')).toBeVisible();
    await frame.locator('input[type="text"]').fill('Playwright single frame');
  }

  async interactNestedFrames() {
    // Click tab: "Iframe with in an Iframe"
    await this.page.getByRole('link', { name: /Iframe with in an Iframe/i }).click();

    const outer = this.page.frameLocator('iframe[src="MultipleFrames.html"]');
    const inner = outer.frameLocator('iframe[src="SingleFrame.html"]');
    await expect(inner.locator('input[type="text"]')).toBeVisible();
    await inner.locator('input[type="text"]').fill('Nested frame works!');
  }
}
``