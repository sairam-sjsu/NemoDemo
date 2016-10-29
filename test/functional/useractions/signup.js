var logger = require('winston');

var signupUseractions = module.exports = {

    enterEmail: function (nemo, email) {
        try {
            nemo.view.signup.emailWaitVisible(3000).sendKeys(email);
            logger.info("Entered email: " + email);
        } catch(exception) {
            throw new Error(exception);
        };
    },

    enterPassword: function(nemo, password) {
        try {
            nemo.view.signup.passwordWaitVisible(3000).sendKeys(password);
            logger.info("Entered password: " + password);
        } catch(exception) {
            throw new Error(exception);
        };
    },

    enterConfirmPassword: function(nemo, confirmPassword) {
        try {
            nemo.view.signup.confirmPasswordWaitVisible(3000).sendKeys(confirmPassword);
            logger.info("Entered confirmPassword: " + confirmPassword);
        } catch(exception) {
            throw new Error(exception);
        };
    },

    clickNextButton: function(nemo) {
        try {
            nemo.view.signup.nextButton().click();
            logger.info("Next Button Clicked");
        } catch(exception) {
            throw new Error(exception);
        };
    },

    enterPhoneNumber: function(nemo, phoneNumber) {
        try {
            nemo.view.signup.phoneNumberWaitVisible().sendKeys(phoneNumber);
            logger.info("Entered Phone Number: " + phoneNumber);
        } catch(exception) {
            throw new Error(exception);
        };
    },

    enterZip: function(nemo, zip) {
        try {
            nemo.view.signup.zipWaitVisible().sendKeys(zip);
            logger.info("Entered Zip: " + zip);
        } catch(exception) {
            throw new Error(exception);
        };
    }

};
