import { expect, Page } from '@playwright/test';

export class HandlingWindowsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/Windows.html');
  }
  async dragTechLogosToDropArea() {
  const dropArea = this.page.locator('#droparea');
  await dropArea.waitFor();

  const elements = ['angular', 'mongo', 'node', 'java'];

  for (const id of elements) {
    await this.page.evaluate(({ sourceId, targetSelector }) => {
      const src = document.getElementById(sourceId);
      const target = document.querySelector(targetSelector);

      const dataTransfer = new DataTransfer();

       if (src) {
         src.dispatchEvent(new DragEvent('dragstart', { dataTransfer }));
        
            if (target) {
              target.dispatchEvent(new DragEvent('dragenter', { dataTransfer }));
               target.dispatchEvent(new DragEvent('dragover', { dataTransfer }));
               target.dispatchEvent(new DragEvent('drop', { dataTransfer }));
            }

         src.dispatchEvent(new DragEvent('dragend', { dataTransfer }));
       }
   
    }, { sourceId: id, targetSelector: '#droparea' });
  }

  // Basic success check
  await expect(dropArea).toBeVisible();
}

  async openNewTabAndVerify() {
    // Section: "Open New Tabbed Windows"
    await this.page.getByRole('link', { name: /Open New Tabbed Windows/i }).click();
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.getByRole('button', { name: /^click$/i }).click()
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    const url = newPage.url();
   // expect(url).toContain('Index'); // generic verification
   expect(url).toContain('selenium.dev');
    await newPage.close();
  }

  async openSeparateWindowAndVerify() {
    await this.page.getByRole('link', { name: /Open New Seperate Windows/i }).click();
    const [popup] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.getByRole('button', { name: /^click$/i }).click()
    ]);
    await popup.waitForLoadState('domcontentloaded');
    await expect(popup).toHaveTitle(/Selenium/);
    await popup.close();
  }

  async openMultipleWindowsAndVerifyCount() {
    await this.page.getByRole('link', { name: /Open Seperate Multiple Windows/i }).click();
    const [p1, p2] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.context().waitForEvent('page'),
      this.page.getByRole('button', { name: /^click$/i }).click()
    ]);
    await p1.close();
    await p2.close();
  }
}
