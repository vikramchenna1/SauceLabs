import { expect, Page } from '@playwright/test';

export class HandlingDragDropPage {
  constructor(private page: Page) {}

  async goto() {
    // This page has draggable items to drop in a box
    await this.page.goto('/Static.html');
  }

  async dragTechLogosToDropArea() {
    const dropArea = this.page.locator('#droparea');
    await expect(dropArea).toBeVisible();

    // Example draggable elements by id (common on this page)
    const sources = [
      this.page.locator('#angular'),
      this.page.locator('#mongo'),
      this.page.locator('#node'),
      this.page.locator('#java')
    ];

    for (const src of sources) {
      if (await src.isVisible()) {
        await src.dragTo(dropArea);
      }
    }

    // Verify at least one item appears inside drop area (by image count or text)
    await expect(await dropArea.locator('img, a, div').count()).toBeGreaterThan(0);
  }
}