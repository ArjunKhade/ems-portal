import { Page, Locator } from "@playwright/test";

export class SignupPage {
    readonly page: Page;
    readonly firstNameLocator: Locator;
    readonly lastNameLocator: Locator;
    readonly emailLocator: Locator;
    readonly passwordLocator: Locator;
    readonly phoneLocator: Locator;
    readonly roleDropdownLocator: Locator;
    readonly createAccountLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameLocator = page.locator("[formcontrolname='firstName']");
        this.lastNameLocator = page.locator("[formcontrolname='lastName']");
        this.emailLocator = page.locator("[formcontrolname='email']");
        this.passwordLocator = page.locator("[formcontrolname='password']");
        this.phoneLocator = page.locator("[formcontrolname='phone']");
        this.roleDropdownLocator = page.locator("[formcontrolname='role']");
        this.createAccountLocator = page.getByRole("button", { 'name': " Create Account → " });
    }

    async signup(firstName: string, lastName: string, email: string, password: string, phone: string, role: string) {
        await this.page.goto("/signup");
        await this.firstNameLocator.fill(firstName);
        await this.lastNameLocator.fill(lastName);
        await this.emailLocator.fill(email);
        await this.passwordLocator.fill(password);
        await this.phoneLocator.fill(phone);
        await this.selectRole(role);
        await this.createAccountLocator.click();
    }

    async selectRole(role: string) {
        //Select Admin option from Role dropdown
        await this.roleDropdownLocator.click();
        await this.page.getByRole("option", { name: role }).click();
    }
}