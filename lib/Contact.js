"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var Contact = /** @class */ (function () {
    function Contact(params) {
        this.user = params.user;
        this.provider = params.provider;
    }
    Contact.prototype.getAll = function (networkAddress) {
        var endpoint = "networks/" + networkAddress + "/users/" + this.user.address + "/contacts";
        return this.provider.fetchEndpoint(endpoint);
    };
    Contact.prototype.createLink = function (address, username) {
        return new Promise(function (resolve, reject) {
            var params = ['contact', address, username];
            resolve(utils_1.default.createLink(params));
        });
    };
    return Contact;
}());
exports.Contact = Contact;
//# sourceMappingURL=Contact.js.map