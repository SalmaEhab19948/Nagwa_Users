import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { get_value_by_key } from "./basicSteps";
import { clearField } from "./basicSteps";


Then(/^Get student data from database$/, () => {
  cy.sqlServer(
    `select u.FirstName, LastName, StudentCode ,ur.RoleID from dbo.[User] u, Portal p ,UserPortal up , UserRole ur
where u.id = up.userid and up.PortalID = p.ID and u.id = ur.UserID
and p.Code = ${portal_code}
And u.UserName = '${expectedUsername}'`
  )
    .wait(2000)
    .then((result) => {
      First_Name = result[0];
      Last_Name = result[1];
      Student_code = result[2];
      // cy.log("username", expectedUsername);
      // cy.log("firstname", First_Name);
      // cy.log("lastname", Last_Name);
      // cy.log("student code", Student_code);
      // cy.log("current code",currentCode);
    });
});



Then(/^populated data should exist in view mode for the student$/,(dataTable) => {
  let data = dataTable.rawTable;
  let row;
  cy.log("expected username ", expectedUsername);
  var expectedData;
  expectedData = currentCode;
  for (row of data) {
    const field = row[0];
    const value = row[1];
    switch (field) {

      case "UserName":
        if(value === "expectedUsername"){
        cy.xpath(`//td[contains(text(),'${expectedData}')]/following-sibling::td[3]`)
          .contains(expectedUsername)
          .should("exist");}
        else{
          cy.xpath(`//td[contains(text(),'${expectedData}')]/following-sibling::td[3]`)
            .contains(expectedUsername)
            .should(value);}
        break;

      case "FirstName":
        cy.xpath(`//td[contains(text(),'${expectedData}')]/following-sibling::td[1]`)
          .contains(value)
          .should("exist");
        break;

      case "LastName":
        cy.xpath(`//td[contains(text(),'${expectedData}')]/following-sibling::td[2]`)
          .contains(value)
          .should("exist");
        break;

      case "Classroom":
        cy.xpath(`//td[contains(text(),'${expectedData}')]/following-sibling::td[4]`)
          .contains(value)
          .should("exist");
        break;

      case "Grade":
        cy.xpath(`//td[contains(text(),'${expectedData}')]/following-sibling::td[5]`)
          .contains(value)
          .should("exist");
        break;
    }
  }
}
);



And(/^I verify the student data displayed properly in list$/, () => {
  cy.log(expectedUsername);

  cy.xpath(
    `//td[contains(text(),'${expectedUsername}')]/preceding-sibling::td[3]`
  ).should("contain", Student_code);

  cy.xpath(
    `//td[contains(text(),'${expectedUsername}')]/preceding-sibling::td[2]`
  ).should("contain", First_Name);

  cy.xpath(
    `//td[contains(text(),'${expectedUsername}')]/preceding-sibling::td[1]`
  ).should("contain", Last_Name);
});



When(/^search for student code$/, () => {
  cy.get("#searchText").click().type(`${currentCode}`);
  cy.get("#searchbtn").click();
});



And(/^clear student data$/, () => {
  clearField("FirstName");
  clearField("LastName");
  clearField("UserName");
});



When(/^click the created student "([^"]*)"$/, (option) => {
  cy.xpath(`//td[contains(text(),'${currentCode}')]/following-sibling::td[6]//a[@class='dropdown-btn actions']`).click();

  if (option == "Edit_Option") {
    cy.xpath(`//td[contains(text(),'${currentCode}')]/following-sibling::td[6]//i[@class='f-icon pen-icon']/parent::a`).click(); 
  }
  else if (option == "Delete_Option") {
    cy.xpath(`//td[contains(text(),'${currentCode}')]/following-sibling::td[6]//a[@class='delete-student text-red']`).click(); 
  } 
  else if (option == "Activate_Option") {
    cy.xpath(`//td[contains(text(),'${currentCode}')]/following-sibling::td[6]//a[@class='deactivate-student']`).click(); 
  } 
  else if (option == "Deactivate_Option") {
    cy.xpath(`//td[contains(text(),'${currentCode}')]/following-sibling::td[6]//a[@class='deactivate-student']`).click(); 
  }
  else if (option == "Reset_Option") {
    cy.xpath(`//td[contains(text(),'${currentCode}')]/following-sibling::td[6]//a[@class='reset-password']`).click(); 
  }
      
});