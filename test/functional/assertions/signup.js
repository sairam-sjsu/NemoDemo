var assert = require('assert');
var logger = require('winston');
var signupAssertions = module.exports = {

    assertTextFieldErrorMessage: function (nemo, field, expectedMessage) {
        nemo.view.signup[field]().getText().then(function(text) {
            assert.equal(text, expectedMessage, 'Error message Assertion Failed: ' + text);
        });
    }
};
