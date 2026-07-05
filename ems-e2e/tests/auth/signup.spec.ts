import { expect } from "@playwright/test";
import test from "@playwright/test";

//Run test cases serially
test.describe.serial("User Authentication", () => {

    test('Signup test', async ({ page }) => {
        await page.goto("http://localhost:90/signup");
        await page.locator("[formcontrolname='firstName']").fill("Monika");
        await page.locator("[formcontrolname='lastName']").fill("Khade");
        await page.locator("[formcontrolname='email']").fill("monika1@gmail.com");
        await page.locator("[formcontrolname='password']").fill("Monika@123");
        await page.locator("[formcontrolname='phone']").fill("8484565623");
        //Select Admin option from Role dropdown
        await page.locator("[formcontrolname='role']").click();
        await page.getByRole("option", { name: "Admin" }).click();
        await page.getByRole("button", { 'name': " Create Account → " }).click();
    });

        test('login test', async ({ page }) => {
            await page.goto("http://localhost:90/login");
            await page.locator('[formcontrolname="email"]').fill("monika1@gmail.com");
            await page.locator('[formcontrolname="password"]').fill("Monika@1234");
            await page.getByRole('button', { name: 'Sign In' }).click();
            await expect(page).toHaveURL('http://localhost:90/dashboard');
        })
})