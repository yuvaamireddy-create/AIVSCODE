const { test, expect } = require('@playwright/test');

test('Login and add iPhone X to cart', async ({ page }) => {
  // Maximize browser window
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Navigate to login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // Sign in
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('Learning@830$3mK2');
  await page.locator('#signInBtn').click();

  // Wait for shop page products to load
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('.card', { timeout: 15000 });

  // Find iPhone X card and click Add to cart
  const iphoneCard = page.locator('.card').filter({ hasText: 'iphone X' });
  await expect(iphoneCard).toBeVisible();
  await iphoneCard.locator('button').click();

  // Verify Checkout button shows 1 item added successfully
  await expect(page.getByText(/Checkout \( 1 \)/)).toBeVisible({ timeout: 10000 });
});


