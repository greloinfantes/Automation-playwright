import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/Login/LoginPage'
import { NavigateTo } from '../../pages/Navigate/NavigateTo'

test('login', async ({ page }) => {

    const loginPage = new LoginPage(page)
    const navigateTo = new NavigateTo(page)

    await navigateTo.navigateToLoginPage()
    await loginPage.doLogin('user', 'pass')

})