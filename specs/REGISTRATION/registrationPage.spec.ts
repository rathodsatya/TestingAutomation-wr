import { registrationPage } from "../../pages/registration.page";
import { landingPage } from "../../pages/landing.page";


describe('Tests for registration page of the website ranking', () => {

    it('[C64] Navigate to registration page and verify it is displayed', () => {
        landingPage.navigateToHomePage().verifyHomePage();
        registrationPage.navigateToRegistrationPage();
    });

    it('[C65] Fill and submit the registration form', () => {
        registrationPage
            .fillRegistrationForm('John Doe', '1235567890', 'john.oe@example.com', 'example.com', 'password123', 'password123');
            registrationPage.submitRegistrationForm().verifySubmission();
    });
});
