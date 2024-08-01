Feature: Assistant feature

    Background: Open the website page and login
        Given navigate to website
        And   login with valid tutor credentials


Scenario: Verify required fields' validations
    Given click on "Assistants" link
    And   click on "New Assistant" link
    When  click on "Create" button
    Then  I should see "Required_Field" within the field "//*[@id= 'firstName-error']"
    And   I should see "Required_Field" within the field "//*[@id= 'lastName-error']"
    And   I should see "Required_Field" within the field "//*[@id= 'email-error']"
    And   I should see "Required_Field" within the field "//*[@id= 'mobile-error']"


Scenario: Verify create a new assistant with firstname and lastname exceed max chars
    Given click on "Assistants" link
    And   click on "New Assistant" link
    When  I fill the form with the following:
        | field     | type     | value          |
        | firstName | text     | randomlongText |
        | lastName  | text     | randomlongText |
    And   I wait 2 second
    Then  I should see "First_Name_Validation" within the field "//*[@id= 'firstName-error']"
    And   I should see "Last_Name_Validation" within the field "//*[@id= 'lastName-error']"


Scenario: Verify create a new assistant with firstname and lastname less than min chars
    Given click on "Assistants" link
    And   click on "New Assistant" link
    When  I fill the form with the following:
        | field     | type | value |
        | firstName | text | Jo    |
        | lastName  | text | Jo    |
    And   I wait 2 second
    Then  I should see "First_Name_Validation" within the field "//*[@id= 'firstName-error']"
    And   I should see "Last_Name_Validation" within the field "//*[@id= 'lastName-error']"


Scenario: Verify create a new assistant with invalid data
    Given click on "Assistants" link
    And   click on "New Assistant" link
    When  I fill the form with the following:
        | field     | type        | value        |
        | firstName | text        | $aly#1'      |
        | lastName  | text        | Moha@med's   |
        | userName  | text        | $aly.moh@med |
        | mobile    | text        | 123          |
    And   I wait 2 second
    Then  I should see "Enter_Valid_Email" within the field "//*[@id= 'email-error']"
    And   I should see "Name_Alphanumeric_Validation" within the field "//*[@id= 'firstName-error']"
    And   I should see "Name_Alphanumeric_Validation" within the field "//*[@id= 'lastName-error']"


Scenario: Verify create a new assistant
    Given click on "Assistants" link
    And   click on "New Assistant" link
    When  I fill the form with the following:
        | field     | type        | value             |
        | firstName | fristName   | randomfristName   |
        | lastName  | lastName    | randomlastName    |
        | userName  | email       | testEmail         |
        | mobile    | phoneNumber | randomPhoneNumber |
    And   click on "Create" button
    Then  I verify the appearance of the success Msg "User_Added_Successfully"
    And   I wait for 5 seconds
    And   Get assistant data from database
    And   I verify that assistant data displayed properly in list
    
    
Scenario: Verify edit existing assistant
    Given click on "Assistants" link
    When  click the created assistant "Edit_Option"
    And   clear assistant data
    When  I fill the form with the following:
        | firstName | fristName   | randomfristName   |
        | lastName  | lastName    | randomlastName    |
        | mobile    | phoneNumber | randomPhoneNumber |
    And   click on "Update" button
    And   I wait for 5 seconds
    And   Get assistant data from database
    And   I verify that assistant data displayed properly in list


Scenario: Verify create a new assistant with existing email
    Given click on "Assistants" link
    And   click on "New Assistant" link
    When  I fill the form with the following:
        | field     | type        | value             |
        | firstName | fristName   | randomfristName   |
        | lastName  | lastName    | randomlastName    |
        | userName  | email       | testEmail         |
        | mobile    | phoneNumber | randomPhoneNumber |         
    And   click on "Create" button
    Then  error message should contains message "Username_Exists"


Scenario: Verify deleting assistant
    Given click on "Assistants" link
    When  click the created assistant "Delete_Option"
    And   click on "Confirm_Delete" link
    And   I wait 3 second
    And   search about assistant "firstName"
    Then  I should see "No_Assistants_Yet" within the field "//div[@class='message']"