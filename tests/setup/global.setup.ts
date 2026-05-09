import { expect, test as setup} from '@playwright/test'
// setup('setup before run test', async () =>{
//     console.log('global setup')
// })
setup("Setup Login", async ({ page }) => {
        const testData = {
            username: "betterbytes.academy.admin",
            password: "StrongPass@BetterBytesAcademy"
        };

        const locator = {
            loginPage: {
                username: page.locator("//input[@id='user_login']"),
                password: page.locator("//input[@id='user_pass']"),
                loginBtn: page.locator("//input[@id='wp-submit']"),
            },

            dashboardPage: {
                dashboardTitle: page.locator("(//h1)[1]"),
                atGalence: page.locator("//h2[text()='At a Glance']"),
                activity: page.locator("//h2[text()='Activity']"),
            },
        }
        const loginPage = locator.loginPage;

        await setup.step("Nhập vào thông tin username, password bị sai", async () => {
            // Act
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
            await loginPage.username.fill(testData.username);
            await loginPage.password.fill(testData.password);

            // TODO: Assert
            await expect(loginPage.username).toHaveValue(testData.username);
            await expect(loginPage.password).toHaveValue(testData.password);
        });

        await setup.step("Click button login", async () => {
            // Arrange
            const dashboardPage = locator.dashboardPage;

            // Act
            await loginPage.loginBtn.click();

            // Assert
            // Chuyển tới trang có url là /wp-admin
            await expect(page).toHaveURL(/wp-admin/)

            // Có heading h1 ""Dashboard"" hiển thị
            await expect(dashboardPage.dashboardTitle).toBeVisible();

            // Có 2 heading h2 là ""At a Glance"" và ""Activity"" hiển thị"
            await expect(dashboardPage.activity).toBeVisible();
            await expect(dashboardPage.atGalence).toBeVisible();
            await page.context().storageState({path: 'authenticated.json'})
        });
});