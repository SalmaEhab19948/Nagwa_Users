Feature: Staff Feature

    Background: Open the website page and login
        Given navigate to website
        And   I wait 2 seconds
        And   login with valid admin credentials
        And   click on "Users" link


    Scenario: Verify required fields' validations
        Given click on "Staff" link
        And   click on "Create_Staff_Member" link
        When  click on "Create" button
        Then  I should see "Required_Field" within the field "//*[@id= 'firstName-error']"
        And   I should see "Required_Field" within the field "//*[@id= 'lastName-error']"
        And   I should see "Required_Field" within the field "//*[@id= 'username-error']"
        And   I should see "Required_Field" within the field "//*[@id= 'mobile-error']"
        And   I should see "Please select one or more role to proceed" within the field "//*[@id= 'roles-error']"


    Scenario: Verify create a new member with firstname and lastname exceed max chars
        Given click on "Staff" link
        And   click on "Create_Staff_Member" link
        When  I fill the form with the following:
            | field     | type | value          |
            | firstName | text | randomlongText |
            | lastName  | text | randomlongText |
        Then  I should see "First_Name_Validation" within the field "//*[@id= 'firstName-error']"
        And   I should see "Last_Name_Validation" within the field "//*[@id= 'lastName-error']"


    Scenario: Verify create a new member with firstname and lastname less than min chars
        Given click on "Staff" link
        And   click on "Create_Staff_Member" link
        When  I fill the form with the following:
            | field     | type | value |
            | firstName | text | Lu    |
            | lastName  | text | Lu    |
        Then  I should see "First_Name_Validation" within the field "//*[@id= 'firstName-error']"
        And   I should see "Last_Name_Validation" within the field "//*[@id= 'lastName-error']"


    Scenario: Verify create a new staff member with invalid data
        Given click on "Staff" link
        And   click on "Create_Staff_Member" link
        When  I fill the form with the following:
            | field                 | type            | value        |
            | firstName             | fristName       | $aly#1'      |
            | lastName              | lastName        | Moha@med's   |
            | username              | email           | $aly.moh@med |
            | mobile                | phoneNumber     | 123          |
            | choosing-roles        | dropdown        | 3            |
        Then  I should see "Enter_Valid_Email" within the field "//*[@id= 'username-error']"
        And   I should see "Name_Alphanumeric_Validation" within the field "//*[@id= 'firstName-error']"
        And   I should see "Name_Alphanumeric_Validation" within the field "//*[@id= 'lastName-error']"


    Scenario: Verify grade and subject fields appear when selecting teacher role
        Given click on "Staff" link
        And   click on "Create_Staff_Member" link
        When  I fill the form with the following:
            | field     | type                  | value           |
            | firstName | fristName             | randomfristName |
            | lastName  | lastName              | randomlastName  |
            | username  | email                 | randomEmail     |
            | mobile    | phoneNumber           | 123             |
            | search    | search_dropdown_byKey | Teacher         | 
        Then I verify the appearance of the text "Grades_Subjects_Teacher" on the page
        And  I verify the appearance of the field "//*[@id='gradesDLL_Teacher']"
        And  I verify the appearance of the field "//*[@id='subjectsDDl_Teacher']"
        And  I remove "Teacher" option
        And  I falsify the appearance of the text "Grades_Subjects_Teacher" on the page
        And  I falsify the appearance of the field "//*[@id='gradesDLL_Teacher']"
        And  I falsify the appearance of the field "//*[@id='subjectsDDl_Teacher']"


    Scenario: Verify grade and subject fields appear when selecting HOD role
        Given click on "Staff" link
        And   click on "Create_Staff_Member" link
        When  I fill the form with the following:
            | field     | type                  | value              |
            | firstName | fristName             | randomfristName    |
            | lastName  | lastName              | randmlastName      |
            | username  | email                 | randomEmail        |
            | mobile    | phoneNumber           | 123                |
            | search    | search_dropdown_byKey | Head of Department |
        Then I verify the appearance of the text "Grades_Subjects_Head" on the page
        And  I verify the appearance of the field "//*[@id='gradesDLL_Head']"
        And  I verify the appearance of the field "//*[@id='subjectsDDl_Head']"
        When I remove "Head of Department" option
        Then I falsify the appearance of the text "Grades_Subjects_Head" on the page
        And  I falsify the appearance of the field "//*[@id='gradesDLL_Head']"
        And  I falsify the appearance of the field "//*[@id='subjectsDDl_Head']"


    Scenario: Verify grade and subject fields don't apppear when selecting role other than teacher/HOD
        Given click on "Staff" link
        And   click on "Create_Staff_Member" link
        When  I fill the form with the following:
            | field     | type                  | value                 |
            | firstName | fristName             | randomfristName       |
            | lastName  | lastName              | randomlastName        |
            | username  | email                 | randomEmail           |
            | mobile    | phoneNumber           | 123                   |
            | search    | search_dropdown_byKey | Admin                 |
            | search    | search_dropdown_byKey | Manager               |
            | search    | search_dropdown_byKey | Attendance Coordinator|
            | search    | search_dropdown_byKey | Admission Supervisor  |
        Then I falsify the appearance of the text "Grades_Subjects_Teacher" on the page
        And  I falsify the appearance of the field "//*[@id='gradesDLL_Teacher']"
        And  I falsify the appearance of the field "//*[@id='subjectsDDl_Teacher']"        
        And  I falsify the appearance of the text "Grades_Subjects_Head" on the page
        And  I falsify the appearance of the field "//*[@id='gradesDLL_Head']"
        And  I falsify the appearance of the field "//*[@id='subjectsDDl_Head']"
   

    Scenario: Verify create a new staff member with all roles
        Given click on "Staff" link
        And   click on "Create_Staff_Member" link
        When  I fill the form with the following:
            | field               | type                  | value                 |
            | firstName           | fristName             | randomfristName       |
            | lastName            | lastName              | randomlastName        |
            | username            | email                 | testEmail             |
            | mobile              | phoneNumber           | 01156898765           |
            | search              | search_dropdown_byKey | Admin                 | 
            | search              | search_dropdown_byKey | Teacher               | 
            | gradesDLL_Teacher   | dropdown              | 1                     |     
            | subjectsDDl_Teacher | dropdown              | 1                     | 
            | search              | search_dropdown_byKey | Manager               |  
            | search              | search_dropdown_byKey | Head of Department    |
            | gradesDLL_Head      | dropdown              | 1                     |     
            | subjectsDDl_Head    | dropdown              | 1                     | 
            | search              | search_dropdown_byKey | Admission Supervisor  |
            | search              | search_dropdown_byKey | Attendance Coordinator|
        And   click on "Create" button
        Then  I verify the appearance of the success Msg "User_Added_Successfully"
        And   I wait 2 seconds
        And   Get member data from database
        And   I verify that member data displayed properly in list


    Scenario: Verify create a new staff member using existing email
        Given click on "Staff" link
        And   click on "Create_Staff_Member" link
        When  I fill the form with the following:
            | field               | type                  | value                 |
            | firstName           | fristName             | randomfristName       |
            | lastName            | lastName              | randomlastName        |
            | username            | email                 | testEmail             |
            | mobile              | text                  | 01156898765           |
            | search              | search_dropdown_byKey | Admin                 | 
        And   click on "Create" button
        Then  error message should contains message "Already_Exists"


    Scenario: Verify Update staff member by removing roles
        Given click on "Staff" link
        And   click the created member "Edit_Option"
        And   I wait 4 seconds
        When  clear member data
        And   I fill the form with the following:
            | field     | type        | value             |
            | firstName | fristName   | randomfristName   |
            | lastName  | lastName    | randomlastName    |
            | mobile    | phoneNumber | randomPhoneNumber |
        And   I remove "Attendance Coordinator" option
        And   I remove "Admission Supervisor" option
        And   click on "Update" button
        # Then  I verify the appearance of the success Msg "User Updated Successfully"
        Then  Get member data from database
        And   I verify that member data displayed properly in list

    
    Scenario: Verify Update staff member by adding additional grades and subjects
        Given click on "Staff" link
        And   click the created member "Edit_Option"
        And   I wait 3 seconds
        When  I add Grade and Subject row of "Teacher" role
        And   I add Grade and Subject row of "Head" role
        And   I fill the form with the following:
            | field                 | type             | value |
            | Grade_for_Teacher_2   | dropdownByClass  | 1     |     
            | Subject_for_Teacher_2 | dropdownByClass  | 1     |  
            | Grade_for_Head_2      | dropdownByClass  | 1     |     
            | Subject_for_Head_2    | dropdownByClass  | 1     | 
        And   click on "Update" button
        # Then  I verify the appearance of the success Msg "User Updated Successfully"


    Scenario: Verify Update staff member by removing grades and subjects
        Given click on "Staff" link
        And   click the created member "Edit_Option"
        And   I wait 5 seconds
        When  I remove Grade and Subject row of "Teacher" role
        And   I wait 3 seconds
        And   I remove Grade and Subject row of "Head" role
        And   I wait 3 seconds
        And   click on "Update" button
        And   I wait 3 seconds
        # Then  I verify the appearance of the success Msg "User Updated Successfully"


    Scenario: Verify deactivating staff member
        Given click on "Staff" link
        When  click the created member "Deactivate_Option"
        And   click on "//a[@id='statusbtn']" byXpath
        And   I wait 2 second
        And   navigate to website
        And   login with user username
        Then  error message should contains message "Deactivated_Account"


    Scenario: Verify activating staff member
        Given click on "Staff" link
        When  click the created member "Activate_Option"
        And   click on "//a[@id='statusbtn']" byXpath
        And   I wait 2 second
        And   navigate to website
        And   login with user first signin
        Then  Check user logged in


    Scenario: Verify reset password of staff member
        Given click on "Staff" link
        When  click the created member "Reset_Option"
        And   click on "Reset" link
        And   I wait 2 second
        And   navigate to website
        And   login with user first signin


    Scenario: Verify deleting staff member
        Given click on "Staff" link
        When  click the created member "Delete_Option"
        And   click on "Confirm_Delete" link
        And   I wait 3 second
        And   search about staff member "email"
        Then  I should see "No_Staff_Memebers_Yet" within the field "//div[@class='message']"
