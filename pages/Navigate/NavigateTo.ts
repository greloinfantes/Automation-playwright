import { faker } from '@faker-js/faker'
import { Locator, Page } from "@playwright/test"

export class NavigateTo{
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigateToLoginPage() {
        await this.page.goto('http://127.0.0.1:5502/login.html')
    }

   
}