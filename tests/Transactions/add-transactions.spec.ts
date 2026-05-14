import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Login/LoginPage';
import { AddTransactionsPage } from '../../pages/Transactions/AddTransactionsPage';
import {faker } from '@faker-js/faker'

test('add transactions', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const addTransactionPage = new AddTransactionsPage(page)

    await page.goto('http://127.0.0.1:5502/login.html')
    await loginPage.doLogin('user', 'pass')
    await addTransactionPage.addTransaction()
    const transactionAmount = faker.number.int({min:20, max:50}).toString()
    const transactionDescription = faker.commerce.productDescription()

    expect( await addTransactionPage.getActualDate("1")).toEqual('2023-01-08')
    expect( await addTransactionPage.getActualAmount("1")).toEqual(transactionAmount)
    expect( await addTransactionPage.getActualDescription("1")).toEqual(transactionDescription)
    /*

    for (let i = 0; i <5; i++) {for (let i = 0; i <5; i++) {
        const randomDescription = `description_${Math.floor(Math.random() * 10000)}`
        const randomAmount = Math.floor(Math.random() * 100 )

        const generateRandomDate = (
            start: Date = new Date(2020, 0, 1),
            end: Date = new Date(2030, 11, 31)
        ): string => {
        const randomDate = new Date(
            start.getTime() +
            Math.random() * (end.getTime() - start.getTime())
        );

        return randomDate.toISOString().split("T")[0]; // yyyy-mm-dd
        };

        const RANDOM_DATE: string = generateRandomDate();

        await page.locator('//button[contains(text(),"Añadir transacción")]').click()
        const date = await page.locator('//input[@id= "date"]').fill(RANDOM_DATE)
        
        await page.locator('//input[@id= "amount"]').fill(faker.number.int({min:20, max:50}).toString())
        //await page.locator('//input[@id= "description"]').fill(faker.commerce.productDescription()faker.commerce.productDescription())
        //await page.locator('//input[@id= "amount"]').fill(randomAmount.toString())
        await page.locator('//input[@id= "description"]').fill(randomDescription)
        await page.locator('//button[contains(text(),"Guardar")]').click()

        //expect(date).toEqual('2025-05-08')

    }
        */
    await page.pause()
    
});

