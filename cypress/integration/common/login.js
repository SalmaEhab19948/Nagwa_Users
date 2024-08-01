import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { get_value_by_key } from "./basicSteps";
global.Suffix = "";
global.portal_code = "";


Given(/^navigate to website$/, (environment) => {
  cy.visit(Cypress.config().baseUrl);
});



And(/^login with valid (admin|tutor) credentials$/, (roleType) => {
  cy.xpath(`//a[contains(text(),'Sign in with Username')]`).click();
  let mail = "";
  let password = "123456";

  switch (current_local) {
    case "ar-EG":
      if (roleType === "admin") 
      {
        mail = "school.um.ar@nagwa.com";  
        portal_code = 217137232645;
        Suffix = "@school2f";   
      }            
      if (roleType === "tutor") 
      {
        mail = "Ar_Automation@test.com";
        portal_code = 319128734589;
        Suffix = "@Tutor1";
      }
      break;

    case "fr-FR":
      if (roleType === "admin")  
      {
        mail = "school.fr@nagwa.com";
        Suffix = "@school5";
        portal_code = 104161602328;
      }
      if (roleType === "tutor") 
      {
        mail = "trans.markupspecialist@gmail.com";
        Suffix = "@TranslatorMS";
        portal_code = 670159637370;
      }
      break;

    default:
      if (roleType === "admin")
      {  
        mail = "school.en@nagwa.com";
        portal_code = 285191653136;
        Suffix = "@School3";
      }
      if (roleType === "tutor") 
      {
        mail = "EN_Automation@test.com";
        portal_code = 854120746451;
        Suffix = "@ENAutomation";
      }
  }
  cy.get("#username").type(mail);
  cy.get("#btn-verify").click();
  cy.wait(2000);
  cy.get("#password").type(password);
  cy.get("#signin").click();

  cy.wait(3000);

cy.url().should('contain', `https://${roleType}s.nagwa.com/`)
});



And(/^login with (user|student) first signin$/, (type) => {
  let mail = '';
  let password = "123456";

if(type === "student"){
  mail = expectedUsername;
}
else{
  mail = currentEmail;
}
  cy.xpath(`//a[contains(text(),'Sign in with Username')]`).click();
  cy.get("#username").type(mail);
  cy.get("#btn-verify").click();
  cy.wait(3000);
  cy.get("#newpassword").type(password);
  cy.get("#confirmpassword").type(password);
  cy.get("#reset_pass").click();
  cy.wait(2000);
});



And(/^login with (user|student) username$/, (type) => {
  let mail = '';
  let password = "123456";

if(type === "student"){
  mail = expectedUsername;
}
else{
  mail = currentEmail;
}
  cy.xpath(`//a[contains(text(),'Sign in with Username')]`).click();
  cy.get("#username").type(mail);
  cy.get("#btn-verify").click(); 
  cy.wait(3000);
});



And(/^Check user logged in$/, () => {
  cy.xpath("(//div[@class='user-actions']//li[@class='dropdown'][1])").should('contain', First_Name);
});