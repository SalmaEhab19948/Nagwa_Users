import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
export { get_value_by_key };
export { read_localization_file };
export { clearField};
global.current_local = Cypress.env("local");
global.resource_file = read_localization_file(current_local);
global.randomText = "";
global.Code = "";
global.username = "";
global.username2 = "";
global.testEmail = "";
var saved_links_title = "";
var displayed_page_title = "";
var faker = require("faker");
randomText = faker.name.firstName();
Code = faker.random.alphaNumeric(5);
username = faker.name.firstName();
username2 = faker.name.firstName();
testEmail = faker.internet.email();

global.First_Name = "";
global.Last_Name = "";
global.Phone_Number = "";
global.Email = "";
global.Student_code = "";
global.currentEmail = "";
global.expectedUsername = "";
global.currentCode = "";



When(/^[I ]*wait [for "]*(\d+)[ "]*[second]{3,7}$/, (seconds) => {
  cy.wait(seconds * 1000);
});



When(/^pause$/, () => {
  document.write("Press Enter to continue!");
  cy.pause();
});



When(/^go back$/, () => {
  cy.go("back");
});



When(/^refresh the page$/, () => {
  cy.reload();
});



When(/^scroll down$/, () => {
  cy.scrollTo("bottom");
});



When(/^swipe right$/, () => {
  cy.get(".table-nav-right").click();
});



And(/^I fill the form with the following:$/, (dataTable) => {
  let data = dataTable.rawTable;
  let i;
  for (i of data) {
    fill_field_with(i);
  }
});



When(/^click on "([^"]*)" (link|button|tab|text|byXpath)$/, (element, field_type) => {
    if (field_type != "byXpath"){
      var element_value = resource_file.data.find((e) => e.key === element).value;
    }
    switch (field_type) {
      case "link":
        cy.get("a").contains(element_value).click({ force: true });
        break;
      case "button":
        cy.get("button").contains(element_value).click();
        break;
      case "tab":
        cy.get("h4").contains(element_value).click();
        break;
      case "text":
        cy.get("*").contains(element_value).click();
        break;
      case "byXpath":
        cy.xpath(element).click();
        break;
    }
  }
);



When(/^verify number of "([^"]*)" in listing page$/, (page_name) => {
  getCountInpagination(page_name);
});



Then(/^I should see "([^"]*)" within the field "([^"]*)"$/,(text_key, field_xpath) => {
    var text_value = get_value_by_key(text_key);
    cy.xpath(field_xpath).then(($text) => {
      let expectedValue = text_value.replace(/\s{1,}|[0-9]|[\u0660-\u0669]|[{|}]|(@\S+)/g, " ");
      let actualValue = $text.text().replace(/\s{1,}|[0-9]|[\u0660-\u0669]|[{|}]|(@\S+)/g, " ");
      expect(expectedValue.replace(/\s{1,}/g, " ").trim()).to.equal(actualValue.replace(/\s{1,}/g, " ").trim());
    });
  }
);



Then(/^I (verify|falsify) the appearance of the text "([^"]*)" on the page$/,(vision, text_key) => {
    if (vision === "verify")
      cy.get("*")
      
        .contains(resource_file.data.find((e) => e.key === text_key).value)
        .should("exist");
    if (vision === "falsify")
      cy.get("*")
        .contains(resource_file.data.find((e) => e.key === text_key).value)
        .should("not.exist");
  }
);



Then(/^I (verify|falsify) the appearance of the field "([^"]*)"$/, (vision, field_xpath) => {
    if (vision === "verify")
      cy.xpath(field_xpath).should("exist");
    if (vision === "falsify")
      cy.xpath(field_xpath).should("not.exist");
  }
);



Then(/^I (verify|falsify) the appearance of "([^"]*)" on the title header$/,(vision, text_key) => {
    var text_value = get_value_by_key(text_key);
    cy.log(text_value);
    cy.get("h1").then(($title) => {
      const temp = $title.text().split("[");
      let title = temp[0];
      if (vision === "verify") expect(text_value).to.equal(title.trim());
      if (vision === "falsify") expect(text_value).to.not.equal(title.trim());
    });
  }
);



When(/^I click on the following links:$/, (dataTable) => {
  let links = dataTable.rawTable;
  let i;
  let link_name;
  for (i of links) {
    link_name = get_value_by_key(i[0]);
    cy.get("a").contains(link_name).click();
    saved_links_title.push(link_name);
    cy.xpath("//h1").should(($div) => {
      displayed_page_title.push($div.text());
    });
  }
});



Then(/^all pages should be displayed correctly$/, () => {
  for (let i in saved_links_title) {
    try {
      expect(displayed_page_title[i]).to.contain(saved_links_title[i]);
    } catch (err) {
      cy.log(err.message);
    }
  }
});



Then(/^I verify the appearance of the success Msg "([^"]*)"$/, (text_key) => {
  var text_value = get_value_by_key(text_key);
  // cy.xpath('//div[@id="SuccessMsg" or @class="alert alert-success visible"]')
  cy.xpath('//div[contains(@class,"alert alert-success") or @id="SuccessMsg"]')
    .contains(text_value)
    .should("exist");
});



Then(/^error message should contains message "([^"]*)"$/, (text_key) => {
  let text_value = get_value_by_key(text_key);
  cy.get(".alert-error").invoke("text").should("contains", text_value);
});



Then(/^Error tooltip appears with text "([^"]*)" within the field "([^"]*)"$/,(text, field_id) => {
    let text_value = get_value_by_key(text_key);
    cy.get(`#${field_id}-error`).should("contain", text_value);
  }
);



When(/^the error message should be (visible|hidden)$/, (vision) => {
  if (vision == "visible") cy.get(".alert-error").should("be.visible");
  if (vision == "hidden") cy.get(".alert-error").should("not.be.visible");
});



function read_localization_file(local) {
  var file = "";
  switch (local) {
    case "ar-EG":
      file = require("./resource_files/SharedResource_ar_EG.json");
      break;
    case "en-GB":
      file = require("./resource_files/SharedResource_en_GB.json");
      break;
    case "en-US":
      file = require("./resource_files/SharedResource_en_US.json");
      break;
    case "fr-FR":
      file = require("./resource_files/SharedResource_fr_FR.json");
      break;
  }
  return file;
}

function get_value_by_key(text_key) {
  var value = "";
  try {
    value = resource_file.data.find((e) => e.key === text_key).value;
  } catch (err) {
    value = text_key;
  }
  return value;
}

function fill_field_with(row ) {

  const field = row[0];
  const type = row[1];
  const value = row[2];

  switch (type) {
    case "code":
      if (value === "testCode") {
        cy.get(`#${field}`).type(Code);
        currentCode = Code;
      } else if (value == "randomCode") {
        cy.get(`#${field}`).type(faker.random.alphaNumeric(5));
      } else {
        cy.get(`#${field}`).type(value);
      }
      break;

    case "email":
      if (value === "randomEmail") {
        cy.get(`#${field}`).type(faker.internet.email());
      } else if (value === "testEmail") {
        cy.get(`#${field}`).type(testEmail);
        currentEmail = testEmail;
      } else {
        cy.get(`#${field}`).type(value);
      }
      break;

    case "userName":
      if (value === "randomUsername") {
        cy.get(`#${field}`).type(username + Suffix);
        expectedUsername = username + Suffix;
      } else if (value === "randomUsername2") {
        cy.get(`#${field}`).type(username2 + Suffix);
        expectedUsername = username2 + Suffix;
      } else {
        cy.get(`#${field}`).type(value);
      }
      break;

    case "fristName":
      if (value === "randomfristName") {
        cy.get(`#${field}`).type(faker.name.firstName());
      } else {
        cy.get(`#${field}`).type(value);
      }
      break;

    case "lastName":
      if (value === "randomlastName") {
        cy.get(`#${field}`).type(faker.name.lastName());
      } else {
        cy.get(`#${field}`).type(value);
      }
      break;

    case "phoneNumber":
      if (value === "randomPhoneNumber") {
        cy.get(`#${field}`).type(faker.phone.phoneNumber("012########"));
      } else {
        cy.get(`#${field}`).type(value);
      }
      break;

    case "text":
      if (value === "randomText") {
        cy.get(`#${field}`).type(randomText);
      } else if(value === "randomlongText"){
        cy.get(`#${field}`).type(faker.lorem.words(25));
      } else {
        cy.get(`#${field}`).type(value);
      } 
      break;
      
    case "dropdown":
      cy.get(`#${field}`).select(Number(value),{ force: true });
      break;
    case "dropdownByClass":
      if (String(value).includes("random")) {
        cy.get(`.${field}>option`).then((listing) => {
          const randomNumber = getRandomInt(1, listing.length - 1);
          cy.log("randomNumber ", randomNumber, listing.length); //generate a rendom number between 0 and length-1. In this case 0,1,2
          cy.get(`.${field}> option`)
            .eq(randomNumber)
            .then(($select) => {
              //choose an option randomly
              const text = $select.text();
              cy.log("text8888 ", text); //get the option's text. For ex. "A"
              cy.get(`.${field}`).select(text); // select the option on UI
            });
        });
      } else {
        cy.get(`.${field}`).select(Number(value));
        //    we get the select/option by finding the select by id
      }
      cy.wait(3000);
      break;

    case "search_dropdown":
      cy.get("[type='search']").click();
      cy.wait(2000);
      cy.xpath(`//li[contains(text(),'${value}')]`).click();
      break;

      case "search_dropdown_byKey":
      cy.xpath("(//*[@type='search'])[1]").click({ multiple: true }, { force: true });
      cy.wait(2000);
      cy.xpath(`//li[contains(text(),'${get_value_by_key(value)}')]`).click();
      cy.get('h1').click();
      break;
  }
}

function getCountInpagination(String) {
  let text_value = get_value_by_key(String);
  cy.get("h1").then((Details) => {
    const details = Details.text();
    let currentCount = 0;
    if (details.includes("Of")) {
      currentCount = Number(details.split("Of")[1].split(` ${text_value}`)[0]);
    } else {
      currentCount = Number(details.split("[")[1].split(` ${text_value}`)[0]);
    }

    cy.log(currentCount);
    let CountInListingPage = 0;
    let numOfclickingOnNext = parseInt(currentCount / 100);
    cy.log("number of next button ", numOfclickingOnNext);
    cy.get("tbody").then((tag_name) => {
      CountInListingPage = tag_name.find("tr").length;
      cy.log("Number of items in listing page are : ", CountInListingPage);
      if (currentCount <= 100)
        expect(CountInListingPage).to.equal(currentCount);
    });

    let temp;
    for (let i = 1; i <= numOfclickingOnNext; i++) {
      cy.get(".next").click();
      cy.get("tbody").then((tag_name) => {
        temp = tag_name.find("tr").length;
        CountInListingPage = CountInListingPage + temp;
        cy.log("numberOfItems : ", CountInListingPage);
        if (i == numOfclickingOnNext) {
          expect(CountInListingPage).to.equal(currentCount);
        }
      });
    }
  });
}

function clearField(field) {
  cy.get(`#${field}`).clear()
};



And(/^clear data$/, () => {
  cy.get("#FirstName").clear();
  cy.get("#LastName").clear();
  cy.get("#UserName").clear();
});



Then(/^check "([^"]*)" field is (disabled|enabled)$/, (field, validation_case) => {
    if (validation_case === "disabled")
      cy.get(`#${field}`).should("be.disabled");
    if (validation_case === "enabled")
      cy.get(`#${field}`).should("not.be.disabled");
  }
);



Then(/^"([^"]*)" button is (disabled|enabled)$/, (text_key, validation_case) => {
    var text_value = get_value_by_key(text_key);
    if (validation_case === "disabled")
      cy.xpath(`//button[contains(text(),'${text_value}')]`).should(
        "be.disabled"
      );
    if (validation_case === "enabled")
      cy.xpath(`//button[contains(text(),'${text_value}')]`).should(
        "not.be.disabled"
      );
  });




