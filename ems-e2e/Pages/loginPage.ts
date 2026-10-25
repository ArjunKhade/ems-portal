import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly emailLocator: Locator;
    readonly passwordLocator: Locator;
    readonly signInButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailLocator = page.locator('[formcontrolname="email"]');
        this.passwordLocator = page.locator('[formcontrolname="password"]');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.errorMessage = page.locator("#toast-container");
    }

    async login(email: string, password: string) {
        await this.page.goto("/login");
        await this.emailLocator.fill(email);
        await this.passwordLocator.fill(password);
        await this.signInButton.click();
    }

}

