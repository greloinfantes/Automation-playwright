import { Locator, Page } from "@playwright/test"

export class LoginPage {

    private readonly page: Page
    private readonly usernameTextBox: Locator
    private readonly passwordTextBox: Locator
    private readonly loginButton: Locator

    constructor(page: Page) {

        this.page = page

        this.usernameTextBox = page.locator('#username')
        this.passwordTextBox = page.locator('#password')
        this.loginButton = page.locator('button[type="submit"]')
    }

    private async fillUsername(username:string) {
        await this.usernameTextBox.fill(username)
    }

    private async fillPassword(password:string) {
        await this.passwordTextBox.fill(password)
    }

    private async clickLoginButton() {
        //await this.loginButton.click()
        await Promise.all([
          this.loginButton.click(),
            this.page.waitForURL('**/transactions.html')  
        ])
    }

    

    async doLogin(username:string, password:string) {
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickLoginButton()
    }
}