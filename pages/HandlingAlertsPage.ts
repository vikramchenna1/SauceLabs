import { expect, Page } from '@playwright/test';

export class HandlingAlertsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/Alerts.html');
  }

  async handleSimpleAlert() {
    await this.page.getByRole('button', { name: /click the button to display an alert box/i }).waitFor();
    this.page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      await dialog.accept();
    });
    await this.page.getByRole('button', { name: /display an alert box/i }).click();
  }

  async handleConfirmAlert(accept: boolean) {
    await this.page.getByRole('link', { name: /Alert with OK & Cancel/i }).click();
    this.page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      if (accept) await dialog.accept();
      else await dialog.dismiss();
    });
    await this.page.getByRole('button', { name: /click the button to display a confirm box/i }).click();

    const result = this.page.locator('#demo');
    await expect(result).toBeVisible();
    if (accept) {
      await expect(result).toContainText(/you pressed ok/i);
    } else {
      await expect(result).toContainText(/you pressed cancel/i);
    }
  }

  async handlePromptAlert(inputText: string) {
    await this.page.getByRole('link', { name: /Alert with Textbox/i }).click();
    this.page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept(inputText);
    });
    await this.page.getByRole('button', { name: /click the button to demonstrate the prompt box/i }).click();

    const result = this.page.locator('#demo1');
    await expect(result).toContainText(new RegExp(inputText, 'i'));
  }
}