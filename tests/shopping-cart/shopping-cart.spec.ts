import { test, expect } from '@playwright/test';

import { faker, Faker } from '@faker-js/faker';

test('addToCart', async ({ page }) => {

    await page.goto('http://127.0.0.1:5500/')
    //Busca el div con clase card-body que tenga dentro un h5 con texto "Producto 1" y luego encuentra su botón.
    // Lo que hace el .(punto ) : “de esos divs, quédate solo con el que tenga dentro un h5 con texto Producto 1” 

    for (let i = 0; i <=5; i++) {
        await page.locator('//div[contains(@class,"card-body")][.//h5[contains(.,"Producto 1")]]//button').click()
    }

    await page.locator('//div[contains(@class,"card-body")][.//h5[contains(.,"Producto 2")]]//button').click()
    await page.locator('//div[contains(@class,"card-body")][.//h5[contains(.,"Producto 3")]]//button').click()

    await page.getByRole('button', { name: 'Ver Carrito' }).click();

    const quantityProduct1 = await page.locator("//tbody//tr[1]//td[3]").textContent()
    const quantityProduct2 = await page.locator("//tbody//tr[2]//td[3]").textContent()
    const quantityProduct3 = await page.locator("//tbody//tr[3]//td[3]").textContent()

    expect(quantityProduct1,'6')
    expect(quantityProduct2,'1')
    expect(quantityProduct3,'1')

    await page.locator("id,checkout-btn").click()

    await page.locator('//input[@id = "name"]').fill(faker.person.fullName())
    await page.locator('//input[@id = "email"]').fill(faker.internet.email())
    await page.locator('//input[@id = "address"]').fill(faker.location.streetAddress())
    
    await page.locator('//div[contains(@class,"card-header")][.//a[contains(.,"Información de pago")]]').click()
    await page.locator('//input[@id = "card-number"]').fill(faker.finance.creditCardNumber())
    await page.locator('//input[@id = "id="card-expiry""]').fill('03/30')
    await page.locator('//input[@id = "id="card-cvc""]').fill(faker.finance.creditCardCVV())
    await page.locator('//button[@id = "place-order-btn"]').click()
    //await page.pause()
    
});