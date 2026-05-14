import { faker } from '@faker-js/faker'
import { Locator, Page } from "@playwright/test"

export class AddTransactionsPage {

    private readonly page: Page
    private readonly addTransactionButton: Locator
    private readonly dateTextBox: Locator
    private readonly amountTextBox: Locator
    private readonly descriptionTextBox: Locator
    private readonly saveTransactionButton: Locator
    

    constructor(page: Page) {
        this.page = page
        this.addTransactionButton = page.locator('//button[contains(text(),"Añadir transacción")]')
        this.dateTextBox = page.locator('#date')
        this.amountTextBox = page.locator('#amount')
        this.descriptionTextBox = page.locator('#description')
        this.saveTransactionButton = page.locator('//button[contains(text(),"Guardar")]')
    }

    private async clickAddTransactionButton() {
        await this.addTransactionButton.click()
    }

    private randomDate(): string {

        const randomDate = new Date(
            new Date(2020, 0, 1).getTime() +
            Math.random() * (
                new Date(2030, 11, 31).getTime() -
                new Date(2020, 0, 1).getTime()
            )
        )

        return randomDate.toISOString().split("T")[0]
    }

    private async fillDate(date: string) {
        await this.dateTextBox.fill(date)
    }

    private async fillAmount() {
        await this.amountTextBox.fill(faker.number.int({ min: 20, max: 50 }).toString())
    }

    private async fillDescription() {
        await this.descriptionTextBox.fill(faker.lorem.sentence())
    }

    private async clickSaveTransactionButton() {
        await this.saveTransactionButton.click()
    }

    async addTransaction() {
        for (let i = 0; i < 5; i++) {
            await this.clickAddTransactionButton()
            await this.fillDate(this.randomDate())
            await this.fillAmount()
            await this.fillDescription()
            await this.clickSaveTransactionButton()
        }
    }

    async getActualAmount(row: string) {
        const actualAmountRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[2]`)
        return await actualAmountRow.textContent()
    }

    async getActualDescription(row: string) {
        const actualDescription = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[3]`)
        return await actualDescription.textContent()
    }

    async getActualDate(row: string) {
        const actualDate = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[1]`)
        return await actualDate.textContent()
    }
}