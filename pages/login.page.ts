import { BasePage } from "./base.page";


export class LoginPage extends BasePage{
    
    constructor(){
        super();
    }

    /*-----locators-----*/
     loginButton():string{
        return `//*[text()='Login']`;
     }

     emailInput():string{
        return `//*[@id='email']`;
     }

     passwordInput():string{
        return `//*[@id='password']`;
     }

     remembermeCheckBox():string{
        return `//*[@id='rememberme']`;
     }

     getStartedButton():string{
        return `//*[text()='Get Started']`;
     }

          isDashboardDisplayed(): string {
         return `//*[@id="content-page"]/div[1]/div/div/div/a/span`;
          }  

      /*** Actions***/

      waitForLoginPageToBeLoaded(){
        this.wd.waitForPageToLoad();
        this.wait(0);
        return this;
      }

       navigateToLoginPage(){
        this.allure.startStep(`click on the "LogIn" button`)
        this.wd.click(this.loginButton());
          try {    
          this.waitForLoginPageToBeLoaded();
          } catch (e) {
            const screenShot=browser.takeScreenshot();
            const image = Buffer.from(screenShot, 'base64');
            this.allure.addAttachment('screenshot', image, 'image/png');
            throw new Error(e);
         }
            this.allure.endStep();
             return this;
        }

         fillCredentials(email: string,password:string)
            {
            this.allure.startStep(`fill the login Credential`);
            this.wd.setValue(this.emailInput(),email);
            this.wd.setValue(this.passwordInput(),password);
            this.wd.click(this.remembermeCheckBox());
            this.allure.endStep();
            return this;
              }

          submitCredentials()
          {
            this.allure.startStep(`login with valid credential`);
            this.wd.click(this.getStartedButton());
            this.wait(10);
            this.allure.endStep();
            return this;
            }

         verifySubmission() {
            this.allure.startStep(`Verify that submission is done`);
            const currentUrl = browser.getUrl();
            console.log(`Current URL: ${currentUrl}`);
            if (!currentUrl.includes('dashboard')) {
                const screenShot = browser.takeScreenshot();
                const image = Buffer.from(screenShot, 'base64');
                this.allure.addAttachment('screenshot', image, 'image/png');
            }
            this.expect(currentUrl).to.include('dashboard');
            this.allure.endStep();
            return this;
        }
        
         verifyLoginPage() {
         this.allure.startStep(`Verify that login page is being displayed.`);
         this.expect(browser.getUrl()).contain('login');
         this.allure.endStep();
         return this;
         }
}
      export const  loginPage = new LoginPage();