class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginBtn = page.locator('button[type="submit"]');
  }

  async login() {
    await this.page.goto(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      { waitUntil: 'domcontentloaded', timeout: 120000 }
    );

    await this.username.waitFor({ state: 'visible', timeout: 60000 });
    await this.username.fill('Admin');

    await this.password.fill('admin123');
    await this.loginBtn.click();

    // WAIT FOR DASHBOARD HEADER, NOT URL LOAD
    await this.page.locator('h6:has-text("Dashboard")')
      .waitFor({ timeout: 60000 });
  }
}

module.exports = LoginPage;
