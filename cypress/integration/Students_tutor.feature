Feature: Student feature

    Background: Open the website page and login
        Given navigate to website
        And   login with valid tutor credentials
        And   I wait 3 second


    Scenario: Verify required fields' validations
        Given click on "//i[@class='f-icon user-alt-icon']" byXpath
        And   click on "Create Students" link
        When  click on "Create" button
        Then  I should see "Required_Field" within the field "//*[@id= 'StudentCode-error']"
        And   I should see "Required_Field" within the field "//*[@id= 'FirstName-error']"
        And   I should see "Required_Field" within the field "//*[@id= 'LastName-error']"
        And   I should see "Required_Field" within the field "//*[@id= 'GradeID-error']"
        And   check "ClassroomId" field is disabled


    Scenario: Verify create a new student with firstname and lastname exceed max chars
        Given click on "//i[@class='f-icon user-alt-icon']" byXpath
        And   click on "Create Students" link
        When  I fill the form with the following:
            | field     | type | value          |
            | FirstName | text | randomlongText |
            | LastName  | text | randomlongText |
        And   click on "Create" button
        Then  I should see "First_Name_Validation" within the field "//*[@id= 'FirstName-error']"
        And   I should see "Last_Name_Validation" within the field "//*[@id= 'LastName-error']"


    Scenario: Verify create a new student with firstname and lastname less than min chars
        Given click on "//i[@class='f-icon user-alt-icon']" byXpath
        And   click on "Create Students" link
        When  I fill the form with the following:
            | field     | type | value |
            | FirstName | text | Jo    |
            | LastName  | text | Jo    |
        And   click on "Create" button
        Then  I should see "First_Name_Validation" within the field "//*[@id= 'FirstName-error']"
        And   I should see "Last_Name_Validation" within the field "//*[@id= 'LastName-error']"


    Scenario: Verify create a new student with invalid data
        Given click on "//i[@class='f-icon user-alt-icon']" byXpath
        And   click on "Create Students" link
        When  I fill the form with the following:
            | field       | type     | value        |
            | StudentCode | code     | st#1         |
            | FirstName   | text     | $aly#1'      |
            | LastName    | text     | Moha@med's   |
            | UserName    | text     | $aly.moh@med |
            | GradeID     | dropdown | 1            |
            | ClassroomId | dropdown | 1            |
        And  click on "Create" button
        Then I should see "Student_code_validation" within the field "//*[@id= 'StudentCode-error']"
        And  I should see "Name_Alphanumeric_Validation" within the field "//*[@id= 'FirstName-error']"
        And  I should see "Name_Alphanumeric_Validation" within the field "//*[@id= 'LastName-error']"
        # And  I should see "Suffix_validation" within the field "//*[@id= 'UserName-error']"


    Scenario: Verify create a new student
        Given click on "//i[@class='f-icon user-alt-icon']" byXpath
        And   click on "Create Students" link
        When  I fill the form with the following:
            | field       | type      | value           |
            | StudentCode | code      | testCode        |
            | FirstName   | fristName | randomfristName |
            | LastName    | lastName  | randomlastName  |
            | UserName    | userName  | randomUsername  |
            | GradeID     | dropdown  | 1               |
            | ClassroomId | dropdown  | 1               |
        And   click on "Create" button
        # Then  I verify the appearance of the success Msg "User_Added_Successfully"
        And   I wait for 3 seconds
        And   Get student data from database
        And   I verify the student data displayed properly in list


    Scenario: Verify create a new student with existing username
        Given click on "//i[@class='f-icon user-alt-icon']" byXpath
        And   click on "Create Students" link
        When  I fill the form with the following:
            | field       | type     | value           |
            | StudentCode | code     | randomCode      |
            | FirstName   | fristName| randomfristName |
            | LastName    | lastName | randomlastName  |
            | UserName    | userName | randomUsername  |
            | GradeID     | dropdown | 1               |
            | ClassroomId | dropdown | 1               |
        And  click on "Create" button
        Then error message should contains message "Username_Exists"


    Scenario: Verify create a new student with existing code
        Given click on "//i[@class='f-icon user-alt-icon']" byXpath
        And   click on "Create Students" link
        When  I fill the form with the following:
            | field       | type     | value           |
            | StudentCode | code     | testCode        |
            | FirstName   | fristName| randomfristName |
            | LastName    | lastName | randomlastName  |
            | GradeID     | dropdown | 1               |
            | ClassroomId | dropdown | 1               |
        And   click on "Create" button
        Then  error message should contains message "Code_Exists"


    Scenario: Verify deactivating student
        Given click on "//i[@class='f-icon user-alt-icon']" byXpath  
        When  click the created student "Deactivate_Option"
        And   click on "Confirm_Deactivate" link
        And   navigate to website
        And   login with student username
        Then  error message should contains message "Deactivated_Account"


    Scenario: Verify activating student
        Given click on "//i[@class='f-icon user-alt-icon']" byXpath 
        When  click the created student "Activate_Option"
        And   click on "Confirm_Activate" link
        And   navigate to website
        And   login with student first signin
        Then  Check user logged in


    Scenario: Verify reset student password
        Given click on "//i[@class='f-icon user-alt-icon']" byXpath  
        When  click the created student "Reset_Option"
        And   click on "Reset" link
        And   navigate to website
        And   login with student first signin
        Then  Check user logged in


    Scenario: Verify edit existing student
        Given click on "//i[@class='f-icon user-alt-icon']" byXpath
        And   click the created student "Edit_Option"
        And   clear student data
        When  I fill the form with the following:
            | FirstName | text     | Updated_FirstName|
            | LastName  | text     | Updated_LastName |
            | UserName  | userName | randomUsername2  |
        And   click on "Update" button
        Then  populated data should exist in view mode for the student
            | field     | value             |
            | FirstName | Updated_FirstName |
            | LastName  | Updated_LastName  |
            | UserName  | expectedUsername  |


    Scenario: Verify deleting student
        Given click on "//i[@class='f-icon user-alt-icon']" byXpath
        When  click the created student "Delete_Option"
        And   click on "Confirm_Delete" link
        And   I wait 3 second
        And   search for student code
        Then  I should see "EmptyViewMessage" within the field "//div[@class='message']"
        When  navigate to website
        And   login with student username
        Then  error message should contains message "Invalid_login_information"