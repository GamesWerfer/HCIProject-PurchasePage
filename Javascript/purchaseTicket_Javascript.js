var div_errorMessages = null;

var name;
var email;
var phoneNumber;
var address;
var ticketType_TypeList;
var ticketType;

var errorMessages = [];
var div_errorMessages = null;
var div_successMessage = null

function loadBody() {
    div_errorMessages = document.getElementById('div_errorMessages');
    div_successMessage = document.getElementById('div_successMessage');
    div_errorMessages.hidden = true;
    div_successMessage.hidden = true;
}

function btn_Reset_onClick() {
    name = null;
    email = null;
    phoneNumber = null;
    address = null;
    ticketType_TypeList = null;
    ticketType = null;

    emptyErrorMessages();
    div_errorMessages.innerHTML = "";
    div_errorMessages.hidden = true;
    div_successMessage.innerHTML = "";
    div_successMessage.hidden = true;
    //window.alert("Form resetted");
}

function btn_Submit_onClick() {

    div_errorMessages.hidden = true;

    name = document.getElementById('textBox_Name').value;
    email = document.getElementById('textBox_Email').value;
    phoneNumber = document.getElementById('textBox_PhoneNumber').value;
    address = document.getElementById('textArea_Address').value;
    ticketType_TypeList = document.getElementsByName('ticketType');
    for (var i = 0; i < ticketType_TypeList.length; i++) {
        if (ticketType_TypeList[i].checked) {
            ticketType = ticketType_TypeList[i].value;
            break;
        }
        else if (!ticketType_TypeList[i].checked) {
            ticketType = null;
        }
    }


    userAgreement = document.getElementById('termsAndService_checkBox').checked;
    div_errorMessages.innerHTML = "";

    //package = document.getElementById('')
    /*
    window.alert("Hello World");
    window.alert("Name: " + name);
    window.alert("Email: " + email);
    window.alert("Phone Number: " + phoneNumber);
    window.alert("Address: " + address);
    window.alert("Ticket Type: " + ticketType);
    window.alert("User Agreement: " + userAgreement);
    */

    //window.alert(package_value);
    var allFieldsAreFilled = requiredFieldValidation();
    var allFieldsAreValid;
    if (allFieldsAreFilled) {
        allFieldsAreValid = validateUserInput();
    }

    if (allFieldsAreValid) {
        confirmOrder();
    }
}

function requiredFieldValidation() {

    emptyErrorMessages();
    var nameIsFilled = false;
    var emailIsFilled = false;
    var phoneNumberIsFilled = false;
    var addressIsFilled = false;
    var ticketTypeIsFilled = false;

    if (name == "") {
        nameIsFilled = false;
        errorMessages.push("Please fill in your name");
    }
    else {
        nameIsFilled = true;
    }

    if (email == "") {
        emailIsFilled = false;
        errorMessages.push("Please fill in your email");
    }
    else {
        emailIsFilled = true;
    }

    if (phoneNumber == "") {
        phoneNumberIsFilled = false;
        errorMessages.push("Please fill in your phone number");
    }
    else {
        phoneNumberIsFilled = true;
    }

    if (address == "") {
        addressIsFilled = false;
        errorMessages.push("Please fill in your address");
    }
    else {
        addressIsFilled = true;
    }

    if (ticketType == null) {
        ticketTypeIsFilled = false;
        errorMessages.push("Please choose your ticket type");
    }
    else {
        ticketTypeIsFilled = true;
    }

    if (nameIsFilled && emailIsFilled && phoneNumberIsFilled && addressIsFilled && ticketTypeIsFilled) {
        div_errorMessages.hidden = true;
        return true;
    }
    else {
        div_errorMessages.innerHTML = "";
        div_errorMessages.hidden = false;

        var messages = "<h2>You have not filled all required fields</h2>";

        for (var i = 0; i < errorMessages.length; i++) {
            var newMessage = '<h5>' + errorMessages[i] + '</h5>'

            messages += newMessage;
        }

        div_errorMessages.innerHTML = messages;

    }
}

function validateUserInput() {
    emptyErrorMessages();

    var nameIsValid = false;
    var emailIsValid = false;
    var phoneNumberIsValid = false;
    var addressIsValid = false;
    var agreementIsValid = false;

    //window.alert("validation begins")

    nameIsValid = validateName();
    //window.alert("name validation: " + nameIsValid);

    emailIsValid = validateEmail();
    //window.alert("email validation: " + emailIsValid);

    phoneNumberIsValid = validatePhoneNumber();
    //window.alert("phone number validation: " + phoneNumberIsValid);

    addressIsValid = validateAddress();
    //window.alert("Address validation: " + addressIsValid);
    agreementIsValid = validateUserAgreement();
    //window.alert("Agreement validation: " + agreementIsValid);


    if (nameIsValid && emailIsValid && phoneNumberIsValid && addressIsValid && agreementIsValid) {
        //window.alert("All data is valid");
        div_errorMessages.innerHTML = "";
        div_errorMessages.hidden = true;
        return true;

    }
    else {
        div_errorMessages.innerHTML = "";
        div_errorMessages.hidden = false;

        //window.alert("not all data is valid");
        //errorMessages.forEach(displayErrors);



        var messages = "<h2>Your Data Is Invalid</h2>";

        for (var i = 0; i < errorMessages.length; i++) {
            var newMessage = '<h5>' + errorMessages[i] + '</h5>'

            messages += newMessage;
        }

        div_errorMessages.innerHTML = messages;
        return false;

    }
}

function confirmOrder() {

    console.log("confirming order");

    var newLine = "\r\n";
    var confirmationMessage = "Order Confirmation" + newLine;
    confirmationMessage += "Name: " + name + newLine;
    confirmationMessage += "Email: " + email + newLine;
    confirmationMessage += "Phone Number: " + phoneNumber + newLine;
    confirmationMessage += "Address: " + address + newLine;
    confirmationMessage += "Ticket Type: " + ticketType + newLine;

    var orderConfirmed = window.confirm(confirmationMessage);

    if (orderConfirmed) {
        var successMessage = "<h2>Purchase Success</h2>"
        successMessage += "<h5>Your ticket details have been sent to " + email + ". Thank you for your purchase</h5>";
        div_successMessage.innerHTML = successMessage;
        div_successMessage.hidden = false;
    }
}
///////////////////////////////SUB-VALIDATION FUNCTIONS///////////////////////////////
function validateName() {
    var inputIsValid = false;

    if (inputIsMinimal(name.length, 5)) {
        console.log("number of characters for input reached the minimal of 5");
        inputIsValid = true;

        if (containsNumber(name)) {
            console.log("The name contains a number");
            errorMessages.push("Your name should not contain a number");
            inputIsValid = false;
        }
        else {
            console.log("The name does not contain a number")

            inputIsValid = true;
        }
    }
    else {
        console.log("number of characters for input does not reach the minimal of 5")
        errorMessages.push("Your name should have a minimal of 5 characters");
        inputIsValid = false;
    }

    return inputIsValid;
}

function validateEmail() { //FIXME: This is bad code.
    var inputIsValid = false;

    var atIndex = null;
    var dotIndex = null;
    var comIndex = null;

    for (var i = 0; i < email.length; i++) {
        if (email.charAt(i) == "@") {
            atIndex = i;
        }

        if (email.charAt(i) == ".") {
            dotIndex = i;
            if (email.charAt(i + 1) == "c" && email.charAt(i + 2) == "o" && email.charAt(i + 3) == "m") {
                comIndex = i + 1;
            }
        }
    }

    if (atIndex != null) {
        console.log("Email contains an @ symbol");
        inputIsValid = true;
    }
    else {
        errorMessages.push("Your email does not contain an @ symbol");
        console.log("Email does not contain an @ symbol")
        inputIsValid = false;
        return inputIsValid;
    }

    if (dotIndex != null && comIndex != null) {
        console.log("Email contains a .com");
        inputIsValid = true;
    }
    else {
        errorMessages.push("Your email does not contain a .com");
        console.log("Email does not contain a .com");
        inputIsValid = false;
        return inputIsValid;
    }

    if (atIndex < dotIndex) {

        console.log("@ and .com positions are valid");
        inputIsValid = true;
    }
    else {
        console.log("@ and .com positions are not valid")
        errorMessages.push("@ and .com positions are not valid");
        inputIsValid = false;
        return inputIsValid;
    }


    return inputIsValid;
}

function validatePhoneNumber() {
    var inputIsValid = true;

    if (phoneNumber.charAt(0) != "+") {
        console.log("Invalid Phone Number (The first character the phone number is not a '+')");
        errorMessages.push("Invalid Phone Number (The first character of your phone number is not a '+')");
        inputIsValid = false;
        return inputIsValid;
    }

    for (var i = 1; i < phoneNumber.length; i++) {
        if (isNaN(phoneNumber.charAt(i))) {
            console.log("Invalid Phone Number (A character that is not a number has been detected)");
            errorMessages.push("Invalid Phone Number (Your phone number has a character that is not a number)")
            inputIsValid = false;
            return inputIsValid;
        }
    }

    console.log("Phone Number is valid");
    return inputIsValid;
}

function validateAddress() {
    if (wordCount(address) >= 5) {
        console.log("Address word count has reached the minimum value");
        return true;
    }
    else {
        console.log("Address word count has not reached the minimum value");
        errorMessages.push("Your address should have at least 5 words");
        return false;
    }

    return false;
}

function validateUserAgreement() {
    if (userAgreement) {
        console.log("User has checked the terms and conditions");
        return userAgreement;
    }
    else if (!userAgreement) {
        console.log("User has not checked the terms and conditions");
        errorMessages.push("Please check the terms and conditions");
        return userAgreement;
    }
}
///////////////////////////////END SUB-VALIDATION FUNCTIONS///////////////////////////////

///////////////////////////////SELF MADE TOOLS///////////////////////////////
function displayErrors(item, index) {
    console.log("the " + index + " item is " + item);

    /*var messages =  '<h5>' + item
                    '</h5>'

    
                    errorMessages_box.innerHTML += messages;*/


}

function inputIsBetween(a, b, input) {
    if (input >= a && input <= b) {
        return true;
    }
    else false;
}

function wordCount(str) {
    return str.split(" ").length; //split the string into an ARRAY OF SUBSTRINGS
}

function inputIsMinimal(input, minimalValue) {
    if (input >= minimalValue) {
        return true;
    }
    else return false;
}

function containsNumber(input) {
    for (var i = 0; i < input.length; i++) {
        if (input.charAt(i) == " ") {
            continue;
        }
        else if (!isNaN(input.charAt(i))) {
            console.log("the Number " + input.charAt(i) + " is at char " + i);
            return true;
        }
    }

    return false;
}

function emptyErrorMessages() {
    do {
        errorMessages.pop();
    }
    while (errorMessages[0] != null);
}

///////////////////////////////END SELF MADE TOOLS///////////////////////////////