 import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { HandlingFramesPage } from '../pages/HandlingFramesPage'; // Ensure the file '../pages/FramesPage.ts' exists and is correctly named
import { HandlingWindowsPage } from '../pages/HandlingWindowsPage';
import { HandlingAlertsPage } from '../pages/HandlingAlertsPage'; // Ensure the file exists and matches the case
import { HandlingDragDropPage } from '../pages/HandlingDragDropPage';
import * as path from 'path';

test.describe('Automation Demo Site - POM Flow', () => {

  test('Registration Form - Fill all fields, reset and verify, upload file', async ({ page }) => {
    const register = new RegistrationPage(page);
    await register.goto();

    await register.fillForm({
      firstName: 'Joseph Vikram',
      lastName: 'Chenna',
      address: 'Plot B1-B2, Ramamurthy Nagar\nBengaluru, Karnataka',
      email: 'vikram.chenna@capgemini.com',
      phone: '9999992332',
      gender: 'Male',
      hobbies: ['Cricket', 'Hockey'],
      languages: ['Arabic', 'English'],
      skills: 'C',            // visible text from dropdown
      country: 'India',       // simple country dropdown
      selectCountry: 'India', // searchable select2
      year: '1991',
      month: 'June',
      day: '13',
      password: 'StrongPass@123',
      confirmPassword: 'StrongPass@123',
    });

    // Upload file (add a small image to your project root or use any existing file)
    const fileToUpload = path.resolve(__dirname, '../assets/sample.png');
    // If you don’t have a file, create 'assets/sample.png' or point to any local file.
    await register.uploadFile(fileToUpload);

    // Now reset and verify fields are cleared
    await register.resetForm();
    await register.assertFormReset();
  });

  test('Frames Handling', async ({ page }) => {
    const frames = new HandlingFramesPage(page);
    await frames.goto();
    await frames.interactSingleFrame();
    await frames.interactNestedFrames();
  });

  test('Windows Handling', async ({ page }) => {
    const windows = new HandlingWindowsPage(page);
    await windows.goto();
    await windows.openNewTabAndVerify();
    await windows.openSeparateWindowAndVerify();
    await windows.openMultipleWindowsAndVerifyCount();
  });

  test('Handling Alerts', async ({ page }) => {
    const alerts = new HandlingAlertsPage(page);
    await alerts.goto();
    await alerts.handleSimpleAlert();
    await alerts.handleConfirmAlert(true);  // accept
    await alerts.handleConfirmAlert(false); // dismiss
    await alerts.handlePromptAlert('Playwright Rocks!');
  });

  test('Drag & Drop Handling', async ({ page }) => {
    const dragDrop = new HandlingDragDropPage(page);
    await dragDrop.goto();
    await dragDrop.dragTechLogosToDropArea();
  });

});
``