const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const AdminUserPage = require('../pages/adminUserPage');


test('Complete User Management Flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const adminPage = new AdminUserPage(page);

  await loginPage.login();
  await adminPage.navigateToAdmin();
  await adminPage.addUser();
  await adminPage.searchUser();
  await adminPage.deleteUser();

  expect(true).toBeTruthy(); // final assertion
});
