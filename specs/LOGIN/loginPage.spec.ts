import { loginPage } from "../../pages/login.page";
import { landingPage } from "../../pages/landing.page";

describe('Tests for login page of the website ranking',()=>
{

    it ('[C66] Navigate to login page and veirfy that it is displayed', ()=>
    {
     landingPage.navigateToHomePage().verifyHomePage();
    loginPage.navigateToLoginPage().verifyLoginPage();
    });

    it('[C67] Fill credential and submit the login page',() =>{
     
        loginPage
         .fillCredentials('john.doe@example.com','password123');
        loginPage.submitCredentials().verifySubmission();  
    });
});