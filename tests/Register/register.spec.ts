import { test, expect } from '@playwright/test';

test('register', async ({ page }) => {

    // await se usa con funicones async, El test espera que cada acción termine correctamente.
    await page.goto('http://127.0.0.1:5500/register.html')

    const name = 'Greis'
    const lastName = 'Loyaga'
    const age = '30'
    const country = 'Peru' 
    const gender = 'F'
    const email = 'greis@joinnus.com'

    await page.locator('//input[@id= "name"]').fill(name)
    await page.locator('//input[@id= "last-name"]').fill(lastName)
    await page.locator('xpath= //label[contains(., "Edad")]/following-sibling::input').fill(age)
    await page.locator('id=country').selectOption(country)
    await page.locator(`[value="${gender}"]`).click()
    await page.locator('id=email').fill(email)
    await page.locator('id=monday').click()
    await page.locator('id=picture').setInputFiles('images/image-test.jpg')

    await page.screenshot({path: 'screenshots/register1.png', fullPage:true})

    const [pageSummary] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('id=save-btn').click()
    ])

    await pageSummary.waitForLoadState()
    await expect(pageSummary).toHaveTitle('Summary')

    const currentName = await pageSummary.locator('//strong[contains(.,"Nombre")]/ancestor::p').textContent()
    const currentLastName = await pageSummary.locator('//strong[contains(.,"Apellido")]/ancestor::p').textContent()
    const currentAge = await pageSummary.locator('//strong[contains(.,"Edad")]/ancestor::p').textContent()

        await pageSummary.screenshot({path: 'screenshots/register2.png', fullPage:true})


    //Aserciones (validaciones)
    await expect(currentName).toContain(name)
    await expect(currentLastName).toContain(lastName)
    await expect(currentAge).toContain(age)
    //await page.pause()
    
});

test('register fail', async ({ page }) => {

    // await se usa con funicones async, El test espera que cada acción termine correctamente.
    await page.goto('http://127.0.0.1:5500/register.html')

    const name = 'Greis'
    const lastName = 'Loyaga'
    const age = '30'
    const country = 'Peru' 
    const gender = 'F'
    const email = 'greis@joinnus.com'

    await page.locator('//input[@id= "name"]').fill(name)

    expect(true).toEqual(false)
    
    
});