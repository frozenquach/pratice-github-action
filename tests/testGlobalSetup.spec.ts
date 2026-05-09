import {test,expect} from '@playwright/test'

test.describe('run test global', async () =>{
    test.use({storageState: 'authenticated.json'})
    test('Go to Dashboard', async ({page}) => {
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        expect(page).toHaveTitle('Dashboard ‹ Playwright practice site - Dev environment — WordPress')
        console.log('tests')
    })
    
})