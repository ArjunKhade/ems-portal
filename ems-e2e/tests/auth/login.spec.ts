import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/loginPage";

test.describe("Login tests", () => {
    test("Valid login navigates to dashboard", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login("monika1@gmail.com", "Monika@123");
        await expect(page).toHaveURL('/dashboard');
    });

    test("Invalid login gives error message", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login("monika12@gmail.com", "Monika@123");
        await expect(loginPage.errorMessage).toBeVisible();
    });
})