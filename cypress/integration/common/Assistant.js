import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { get_value_by_key } from "./basicSteps";
import { clearField} from "./basicSteps";


  Then(/^Get assistant data from database$/, () => {
    cy.sqlServer(
      `select u.FirstName, LastName, Email, PhoneNumber, ur.RoleID from dbo.[User] u, Portal p ,UserPortal up , UserRole ur
      where u.id = up.userid and up.PortalID = p.ID and u.id = ur.UserID
      and p.Code = ${portal_code}
      And u.UserName = '${currentEmail}'`
    )
      .wait(1000)
      .then((result) => {
        First_Name = result[0];
        Last_Name = result[1];
        Email = result[2];
        Phone_Number = result[3];
        cy.log("firstname", First_Name);
        cy.log("lastname", Last_Name);
        cy.log("email", Email);
        cy.log("mobile", Phone_Number)
        var environment = Cypress.env("test_environment");
      });
  });



  And(/^I verify that assistant data displayed properly in list$/, () => {
    cy.log(currentEmail);

    cy.xpath(`//td[contains(text(),'${currentEmail}')]/preceding-sibling::td[2]`)
      .should("contain", First_Name);
  
    cy.xpath(`//td[contains(text(),'${currentEmail}')]/preceding-sibling::td[1]`)
      .should("contain", Last_Name);

    cy.xpath(`//td[contains(text(),'${currentEmail}')]/following-sibling::td[1]`)
      .should("contain", Phone_Number);
  });



  Then(/^populated data should exist in view mode for the assistant$/,(dataTable) => {
    let data = dataTable.rawTable;
    let row;
    for (row of data) {
      const field = row[0];
      const value = row[1];
      switch (field) {
        case "firstName":
          cy.xpath(`//tr[1]/td[1]`)
            .contains(value)
            .should("exist");
          break;
        case "lastName":
          cy.xpath(`//tr[1]/td[2]`)
            .contains(value)
            .should("exist");
          break;
        case "mobile":
          cy.xpath(`//tr[1]/td[4]`)
            .contains(value)
            .should("exist");
          break;
      }
    }
  });



  And(/^clear assistant data$/, () => {
    clearField("firstName");
    clearField("lastName");
    clearField("mobile");
  });



  Given(/^search about assistant "([^"]*)"$/, (searchType) => {
    if (searchType == "firstName") {
      cy.get("#assistant-search").click().type(`${First_Name}`);
    }
     else if (searchType == "lastName") {
      cy.get("#assistant-search").click().type(`${Last_Name}`);
    } 
    else {
      cy.get("#assistant-search").click().type(`${searchType}`);
    }
    cy.get("#btnSearch").click();
  });

  

  When(/^click the created assistant "([^"]*)"$/, (option) => {
    cy.xpath(`//td[contains(text(),'${currentEmail}')]/following-sibling::td[2]//a[@class='dropdown-btn actions']`).click();

    if (option == "Edit_Option") {
      cy.xpath(`//td[contains(text(),'${currentEmail}')]/following-sibling::td[2]//i[@class='f-icon pen-icon']/parent::a`).click(); 
    }
    else if (option == "Delete_Option") {
      cy.xpath(`//td[contains(text(),'${currentEmail}')]/following-sibling::td[2]//a[@class='text-red delete-assistant']`).click(); 
    } 
  });