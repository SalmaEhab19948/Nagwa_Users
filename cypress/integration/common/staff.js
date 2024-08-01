import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { get_value_by_key } from "./basicSteps";
import { clearField} from "./basicSteps";

global.Role ="";


var RolesCount;
Then(/^Get member data from database$/, (keyword) => {

  cy.sqlServer(
    `select COUNT(ur.RoleID) as Count from dbo.[User] u, UserRole ur, [Role] r 
    where u.id = ur.UserID and ur.RoleID = r.ID 
    And u.UserName = '${currentEmail}'`
  ).wait(3000).then((result) => {
    RolesCount = result
    cy.log("roles count", RolesCount)
  }),

  cy.sqlServer(
    `select u.FirstName, LastName, Email, PhoneNumber, r.DisplayName as Role 
    from dbo.[User] u, Portal p ,UserPortal up , UserRole ur, [Role] r 
    where u.id = up.userid and up.PortalID = p.ID and u.id = ur.UserID and ur.RoleID = r.ID 
    and p.Code = ${portal_code}
    And u.UserName = '${currentEmail}'
    ORDER BY ROLE ASC`
  ) .wait(5000)
    .then((result) => {

      if (RolesCount == 1){
        First_Name = result[0];
        Last_Name = result[1];
        Email = result[2];
        Phone_Number = result[3];
        Role = result[4]
      }

      else{      
        First_Name = result[0][0];
        Last_Name = result[0][1];
        Email = result[0][2];
        Phone_Number = result[0][3];
        Role = result[0][4];

        for (let i=1; i<RolesCount; i++)
        {
         var res = `,${result[i][4]}`;
         Role += `${res}`
        } 
      };

      cy.log("firstname", First_Name);
      cy.log("lastname", Last_Name);
      cy.log("email", Email);
      cy.log("mobile", Phone_Number);
      cy.log("role", Role);
    });
});



And(/^I verify that member data displayed properly in list$/, () => {
  cy.log(currentEmail);

  cy.xpath(`//td[contains(text(),'${currentEmail}')]/preceding-sibling::td[2]`)
    .should("contain", First_Name);

  cy.xpath(`//td[contains(text(),'${currentEmail}')]/preceding-sibling::td[1]`)
    .should("contain", Last_Name);

  cy.xpath(`//td[contains(text(),'${currentEmail}')]/following-sibling::td[1]`)
    .should("contain", Role);
});



Given(/^search about staff member "([^"]*)"$/, (searchType) => {
  if (searchType == "email") {
    cy.get("#searchText").click().type(`${Email}`);
  }
  else if (searchType == "firstName") {
    cy.get("#searchText").click().type(`${First_Name}`);
  }
   else if (searchType == "lastName") {
    cy.get("#searchText").click().type(`${Last_Name}`);
  } 
  else {
    cy.get("#searchText").click().type(`${searchType}`);
  }
  cy.get("#searchbtn").click();
}); 



Then(/^I remove "([^"]*)" option$/, (text_key) => {
  cy.log(text_key);
  let text_value = get_value_by_key(text_key);
  cy.log(text_value);
  cy.xpath(`//li[contains(text(),'${text_value}')]//span[@class='select2-selection__choice__remove']`).click();
});



And(/^clear member data$/, () => {
  clearField("firstName");
  clearField("lastName");
  clearField("mobile");
});



When(/^I (add|remove) Grade and Subject row of "([^"]*)" role$/, (validation_case, RoleIdentifier) => {

  if(validation_case === "add"){
    cy.xpath(`//div[@id='for${RoleIdentifier}']/div[last()]//a[@id='addRoleNeedRow']`).click();    
  }

  if(validation_case === "remove"){
    cy.xpath(`//div[@id='for${RoleIdentifier}']/div[last()]//a[@class='btn btn-outline btn-red icon delete id=']`).click();    
  }
});



When(/^click the created member "([^"]*)"$/, (option) => {
  cy.xpath(`//td[contains(text(),'${currentEmail}')]/following-sibling::td[2]//a[@class='dropdown-btn actions']`).click();

  if (option == "Edit_Option") {
    cy.xpath(`//td[contains(text(),'${currentEmail}')]/following-sibling::td[2]//i[@class='f-icon pen-icon']/parent::a`).click(); 
  }
  else if (option == "Delete_Option") {
    cy.xpath(`//td[contains(text(),'${currentEmail}')]/following-sibling::td[2]//a[@class='text-red  delete-user']`).click(); 
  } 
  else if (option == "Activate_Option") {
    cy.xpath(`//td[contains(text(),'${currentEmail}')]/following-sibling::td[2]//a[@class='deactivate-user']`).click(); 
  } 
  else if (option == "Deactivate_Option") {
    cy.xpath(`//td[contains(text(),'${currentEmail}')]/following-sibling::td[2]//a[@class='deactivate-user']`).click(); 
  }
  else if (option == "Reset_Option") {
    cy.xpath(`//td[contains(text(),'${currentEmail}')]/following-sibling::td[2]//a[@class='reset-password']`).click(); 
  }   
});