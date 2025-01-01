import { test, expect } from '@playwright/test';

test('Login to OrangeHRM', async ({ page }) => {
   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
   await page.waitForTimeout(1000);
   await page.getByPlaceholder('Username').fill('Admin');
   await page.getByPlaceholder('Password').fill('admin123');
   await page.getByRole('button', { name: 'Login' }).click();
   await page.waitForTimeout(1000);
   await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
   await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});