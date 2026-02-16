import { expect, Locator, Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;

  // Locators
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly genderMale: Locator;
  readonly genderFemale: Locator;
  readonly hobbiesCricket: Locator;
  readonly hobbiesMovies: Locator;
  readonly hobbiesHockey: Locator;
  readonly languagesDropdown: Locator;
  readonly languagesOptions: Locator;
  readonly skills: Locator;
  readonly country: Locator;          // simple select
  readonly selectCountryBox: Locator; // select2 combobox
  readonly select2SearchInput: Locator;
  readonly year: Locator;
  readonly month: Locator;
  readonly day: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly uploadInput: Locator;
  readonly submitBtn: Locator;
  readonly resetBtn: Locator;

  constructor(page: Page) {
    this.page = page;

this.firstName = page.getByPlaceholder('First Name');
this.lastName = page.getByPlaceholder('Last Name');

this.address = page.locator("textarea[ng-model='Adress']");
this.email = page.locator("input[ng-model='EmailAdress']");
this.phone = page.locator("input[ng-model='Phone']");

this.genderMale = page.locator("input[value='Male']");
this.genderFemale = page.locator("input[value='FeMale']");

this.hobbiesCricket = page.locator("input[value='Cricket']");
this.hobbiesMovies = page.locator("input[value='Movies']");
this.hobbiesHockey = page.locator("input[value='Hockey']");

    // Languages (multi-select)
    this.languagesDropdown = page.locator('#msdd');
    // The languages options are rendered in a separate <ul class="ui-autocomplete"> element
    // so locate the list items directly (they become visible after clicking #msdd).
    this.languagesOptions = page.locator('ul.ui-autocomplete li');

    // Skills or Country 
    this.skills = page.locator('select#Skills');
    this.country = page.locator('select#countries');

    // Select Country (searchable select2)
    this.selectCountryBox = page.locator('span[role="combobox"]');
    this.select2SearchInput = page.locator('input.select2-search__field');

    // DOB
    this.year = page.locator('select#yearbox');
    this.month = page.locator('select[placeholder="Month"]');
    this.day = page.locator('select#daybox');

    // Passwords
    this.password = page.locator('input#firstpassword');
    this.confirmPassword = page.locator('input#secondpassword');

    // File upload
    this.uploadInput = page.locator('input#imagesrc');

    // Buttons
    this.submitBtn = page.locator('button#submitbtn').or(page.getByRole('button', { name: 'Submit' }));
    this.resetBtn = page.locator('button#Button1').or(page.getByRole('button', { name: 'Refresh' }));
  }

  async goto() {
    await this.page.goto('/Register.html', { waitUntil: 'domcontentloaded' });
    await expect(this.firstName).toBeVisible();
  }

  async fillForm(data: {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phone: string;
    gender: 'Male' | 'Female';
    hobbies?: Array<'Cricket' | 'Movies' | 'Hockey'>;
    languages?: string[]; // e.g., ['English','Arabic']
    skills?: string;      // exact visible text
    country?: string;     // exact visible text (simple select)
    selectCountry?: string; // for searchable select2 dropdown (e.g., 'India')
    year?: string;
    month?: string; // e.g., 'April'
    day?: string;   // e.g., '10'
    password: string;
    confirmPassword: string;
  }) {
    const {
      firstName, lastName, address, email, phone,
      gender, hobbies = [],
      languages = [],
      skills, country, selectCountry,
      year, month, day,
      password, confirmPassword
    } = data;

    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.address.fill(address);
    await this.email.fill(email);
    await this.phone.fill(phone);

    if (gender === 'Male') await this.genderMale.check();
    else await this.genderFemale.check();

    // Hobbies
    for (const h of hobbies) {
      if (h === 'Cricket') await this.hobbiesCricket.check();
      if (h === 'Movies') await this.hobbiesMovies.check();
      if (h === 'Hockey') await this.hobbiesHockey.check();
    }

    // --- Languages (multi-select) ---
    if (languages.length) {
      await this.languagesDropdown.click();

      for (const lang of languages) {
        const option = this.page.locator('.ui-autocomplete li a').filter({ hasText: lang }).first();
        await option.click();
      }

      // Click outside to close the dropdown
      await this.page.click('body', { position: { x: 0, y: 0 } });
    }

    // Skills & Country (simple <select>)
    if (skills) await this.skills.selectOption({ label: skills });
    if (country) {
      
      await this.country.waitFor({ state: 'visible', timeout: 10000 });
      const countryOption = this.country.locator('option', { hasText: country }).first();
      try {
        // prefer selectOption (works when option is present in the select)
        await countryOption.waitFor({ state: 'attached', timeout: 5000 });
        await this.country.selectOption({ label: country });
      } catch (e) {
        // Fallback: set the option via JS. This finds the option whose visible text matches
        // and sets the select's value, then dispatches a change event. This works when
        // options are not exposed as visible DOM nodes that Playwright can click.
        await this.page.evaluate(({ selSelector, visibleText }) => {
          const sel = document.querySelector(selSelector) as HTMLSelectElement | null;
          if (!sel) return;
          const opt = Array.from(sel.options).find(o => o.text.trim() === visibleText || o.text.includes(visibleText));
          if (opt) {
            sel.value = opt.value;
            sel.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }, { selSelector: 'select#countries', visibleText: country });
       }
     }

    // Select Country (select2 searchable)
    if (selectCountry) {
      await this.selectCountryBox.first().click();
      await this.select2SearchInput.fill(selectCountry);
      await this.select2SearchInput.press('Enter');
    }

    // DOB
    if (year) await this.year.selectOption({ label: year });
    if (month) await this.month.selectOption({ label: month });
    if (day) await this.day.selectOption({ label: day });

    // Password
    await this.password.fill(password);
    await this.confirmPassword.fill(confirmPassword);
  }

  async uploadFile(filePath: string) {
    await this.uploadInput.setInputFiles(filePath);
  }

  async resetForm() {
    await this.resetBtn.click();
  }

  async assertFormReset() {
    await expect(this.firstName).toHaveValue('');
    await expect(this.lastName).toHaveValue('');
    await expect(this.address).toHaveValue('');
    await expect(this.email).toHaveValue('');
    await expect(this.phone).toHaveValue('');

    await expect(this.genderMale).not.toBeChecked();
    await expect(this.genderFemale).not.toBeChecked();

    await expect(this.hobbiesCricket).not.toBeChecked();
    await expect(this.hobbiesMovies).not.toBeChecked();
    await expect(this.hobbiesHockey).not.toBeChecked();

    // Languages widget shows selected tags as <span>
    await expect(this.page.locator('#msdd .ui-autocomplete-multiselect-item')).toHaveCount(0);

    // Simple selects should be at defaults
    await expect(this.skills).toHaveValue(''); // default empty option exists
    await expect(this.country).toHaveValue(''); // default empty
    await expect(this.year).toHaveValue('');
    await expect(this.month).toHaveValue('');
    await expect(this.day).toHaveValue('');

    await expect(this.password).toHaveValue('');
    await expect(this.confirmPassword).toHaveValue('');

    // File input clears (implementation depends on browser; verify value empty)
    await expect(this.uploadInput).toHaveJSProperty('value', '');
  }
}