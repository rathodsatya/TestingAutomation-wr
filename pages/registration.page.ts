import { BasePage } from "./base.page";

export class RegistrationPage extends BasePage {
    constructor() {
        super();
    }

    /** locators **/

    signupButton(): string {
        return `//*[text()='Sign Up']`;
    }

    nameField(): string {
        return `//input[@name='name']`;
    }

    phoneNumberField(): string {
        return `//div[@id="custom_phone_input"]/div/input`;
    }

    emailField(): string {
        return `//input[@placeholder='Enter Email Address']`;
    }

    websiteDomainField(): string {
        return `//input[@placeholder='Website Domain']`;
    }

    createPasswordField(): string {
        return `//input[@placeholder='Enter Password']`;
    }

    confirmPasswordField(): string {
        return `//input[@placeholder='Enter Confirm Password']`;
    }

    termsCheckbox(): string {
        return `//input[@name='rememberme']`;
    }

    getStartedButton(): string {
        return `//*[@class='form-group text-center mb-3']//parent::button[text()='Get Started']`;
    }

    /** actions **/

    waitForRegistrationPageToBeLoaded() {
        this.wd.waitForPageToLoad();
        this.wait(1);
        return this;
    }
    
    navigateToRegistrationPage() {
        this.allure.startStep(`click on the "signup" button`);
        this.wd.click(this.signupButton());
        try {
            this.waitForRegistrationPageToBeLoaded();
        }
        catch (e) {
            const screenShot = browser.takeScreenshot();
            const image = Buffer.from(screenShot, 'base64');
            this.allure.addAttachment('screenshot', image, 'image/png');
            throw new Error(e);
        }
        this.allure.endStep();
        return this;
    }

    fillRegistrationForm(name: string, phone: string, email: string, domain: string, password: string, confirmPassword: string) {
        this.allure.startStep(`Fill the registration form with provided details`);
        this.wd.setValue(this.nameField(), name);
        this.wd.setValue(this.phoneNumberField(), phone);
        this.wd.setValue(this.emailField(), email);
        this.wd.setValue(this.websiteDomainField(), domain);
        this.wd.setValue(this.createPasswordField(), password);
        this.wd.setValue(this.confirmPasswordField(), confirmPassword);
        this.wd.click(this.termsCheckbox());
        this.allure.endStep();
        return this;
    }

    submitRegistrationForm() {
        this.allure.startStep(`Submit the registration form`);
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
}

export const registrationPage = new RegistrationPage();
