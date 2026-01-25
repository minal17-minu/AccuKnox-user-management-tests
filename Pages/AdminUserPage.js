class AdminUserPage {
  constructor(page) {
    this.page = page;
    this.adminMenu = page.locator('span:has-text("Admin")');
    this.addBtn = page.locator('button:has-text("Add")');
    this.saveBtn = page.locator('button:has-text("Save")');
    this.searchBtn = page.locator('button:has-text("Search")');
  }

  async navigateToAdmin() {
  await this.adminMenu.click();

  // wait for admin page URL (stable)
  await this.page.waitForURL('**/admin/viewSystemUsers', { timeout: 60000 });

  // wait for Add button which confirms page is ready
  await this.addBtn.waitFor({ state: 'visible', timeout: 60000 });
}


 async addUser() {
  // User Role
  await this.page
    .locator('label:has-text("User Role")')
    .locator('..')
    .locator('div[role="button"]')
    .click();
  await this.page.keyboard.press('ArrowDown');
  await this.page.keyboard.press('Enter');

  // Employee Name (must select from dropdown)
  await this.page
    .locator('input[placeholder="Type for hints..."]')
    .fill('manda');
  await this.page.waitForTimeout(2000);
  await this.page.keyboard.press('ArrowDown');
  await this.page.keyboard.press('Enter');

  // Status
  await this.page
    .locator('label:has-text("Status")')
    .locator('..')
    .locator('div[role="button"]')
    .click();
  await this.page.keyboard.press('ArrowDown');
  await this.page.keyboard.press('Enter');

  // Username (UNIQUE every run)
  const username = `manda_user_${Date.now()}`;
  await this.page
    .locator('label:has-text("Username")')
    .locator('..')
    .locator('input')
    .fill(username);

  // Password
  await this.page
    .locator('label:has-text("Password")')
    .locator('..')
    .locator('input')
    .fill('Test@12345');

  // Confirm Password
  await this.page
    .locator('label:has-text("Confirm Password")')
    .locator('..')
    .locator('input')
    .fill('Test@12345');

  // Save
  await this.page.locator('button:has-text("Save")').click();

  // Wait for redirect back to user list
  await this.page.waitForURL('**/admin/viewSystemUsers', { timeout: 60000 });
}


  async searchUser() {
    await this.page.locator('label:has-text("Username") >> .. >> input')
      .fill('testuser98765');

    await this.searchBtn.click();
    await this.page.waitForTimeout(5000);
  }

  async deleteUser() {
    await this.page.locator('input[type="checkbox"]').first().click();
    await this.page.locator('button:has-text("Delete")').click();
    await this.page.locator('button:has-text("Yes, Delete")').click();
    await this.page.waitForTimeout(5000);
  }
}

module.exports = AdminUserPage;

