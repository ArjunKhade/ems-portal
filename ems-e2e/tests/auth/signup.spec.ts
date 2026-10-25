import { test, expect } from "@playwright/test";
import { SignupPage } from "../../Pages/signupPage";

//Run test cases serially
test.describe.serial("User Authentication", () => {

    test('Signup test', async ({ page }) => {
        const signupPage = new SignupPage(page);
       await signupPage.signup("Raj", "Kapoor", "raj1@gmail.com", "Raj@12345", "8888888888", "Admin")
    });
})