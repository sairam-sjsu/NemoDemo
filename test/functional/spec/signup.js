var basedir = require('path').resolve(__dirname, '..');
var Nemo = require('nemo');
var logger = require('winston');
var signupUseractions = require('../useractions/signup');
var signupAssertions = require('../assertions/signup');
var testData = require('../testData/signupTestData.json');
var signupAssertionData = require('../testData/signupAssertionData.json');
var chance = require('chance');
var nemo, random;
describe('@signup_form_validatons@', function () {
    before(function (done) {
        nemo = Nemo(basedir, function (err) {
            if (err) {
                return done(err);
            }
            done();
        });
        random = new chance();
    });
    after(function (done) {
        nemo.driver.quit().then(done);
    });
    /*beforeEach(function(){
     nemo.cookie.deleteAll();
     })*/
    it('Should not accept invalid Email', function (done) {
        try {
            nemo.driver.get(nemo.data.baseUrl);
            nemo.driver.manage().window().maximize();
            nemo.view.signup.signupButtonWaitVisible(3000).click();
            nemo.view.signup.ctaButtonWaitVisible(3000).click();
            signupUseractions.enterEmail(nemo, testData.invalidEmail);
            signupUseractions.clickNextButton(nemo);
            signupUseractions.enterEmail(nemo, '');
            signupAssertions.assertTextFieldErrorMessage(nemo, "errorMessageSpan", signupAssertionData.emailErrorMsg);
            nemo.driver.sleep(3000).then(function () {
                done();
            });
        } catch (err) {
            logger.error(err);
            done(err);
        }
    })

    it('Password should meet the criteria', function (done) {

        try {
            nemo.driver.get(nemo.data.signupUrl);
            nemo.driver.manage().window().maximize();
            signupUseractions.enterPassword(nemo, testData.invalidPassword);
            signupUseractions.enterEmail(nemo, testData.email);
            signupUseractions.enterPassword(nemo, '');
            signupAssertions.assertTextFieldErrorMessage(nemo, "errorMessageSpan", signupAssertionData.passwordCriteriaErrorMsg);
            nemo.driver.sleep(3000).then(function () {
                done();
            });
        } catch (err) {
            logger.error(err);
            done(err);
        }
    })

    it('Password should not contain sequence of characters', function (done) {

        try {
            nemo.driver.get(nemo.data.signupUrl);
            nemo.driver.manage().window().maximize();
            signupUseractions.enterPassword(nemo, testData.seqofCharacters);
            signupUseractions.enterEmail(nemo, testData.email);
            signupUseractions.enterPassword(nemo, testData.empty);
            signupAssertions.assertTextFieldErrorMessage(nemo, "errorMessageSpan", signupAssertionData.passwordSequenceErrorMsg);
            nemo.driver.sleep(3000).then(function () {
                done();
            });
        } catch (err) {
            logger.error(err);
            done(err);
        }
    })

    it('Password and Confirm Password shoud match', function (done) {
        try {
            nemo.driver.get(nemo.data.signupUrl);
            nemo.driver.manage().window().maximize();
            signupUseractions.enterPassword(nemo, testData.password);
            signupUseractions.enterConfirmPassword(nemo, testData.invalidPassword);
            signupAssertions.assertTextFieldErrorMessage(nemo, "errorMessageSpan", signupAssertionData.confirmPasswordErrorMsg);
            nemo.driver.sleep(3000).then(function () {
                done();
            });
        } catch (err) {
            logger.error(err);
            done(err);
        }
    })

    it('Phone number must be 10 digits', function (done) {
        try {
            nemo.driver.get(nemo.data.signupUrl);
            nemo.driver.manage().window().maximize();
            signupUseractions.enterEmail(nemo, random.email({domain: "sample.com"}));
            signupUseractions.enterPassword(nemo, testData.password);
            signupUseractions.enterConfirmPassword(nemo, testData.confirmPassword);
            signupUseractions.clickNextButton(nemo);
            nemo.driver.sleep(5000).then(function () {
                signupUseractions.enterPhoneNumber(nemo, testData.invalidPhoneNumber);
                signupUseractions.enterZip(nemo, random.zip());
                signupUseractions.enterPhoneNumber(nemo, testData.empty);
            });
            signupAssertions.assertTextFieldErrorMessage(nemo, "errorMessageSpan", signupAssertionData.phoneNumberErrorMsg);
            nemo.driver.sleep(3000).then(function () {
                done();
            });
        } catch (err) {
            logger.error(err);
            done(err);
        }
    });
});
