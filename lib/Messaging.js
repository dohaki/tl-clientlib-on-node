"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var Messaging = /** @class */ (function () {
    function Messaging(params) {
        this.user = params.user;
        this.currencyNetwork = params.currencyNetwork;
        this.provider = params.provider;
    }
    Messaging.prototype.paymentRequest = function (network, user, value, subject) {
        var _this = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.currencyNetwork.getDecimals(network).then(function (dec) {
            var type = 'PaymentRequest';
            var options = {
                body: JSON.stringify({
                    message: "{\n            \"type\": \"" + type + "\",\n            \"networkAddress\": \"" + network + "\",\n            \"from\": \"" + _this.user.address + "\",\n            \"to\": \"" + user + "\",\n            \"direction\": \"received\",\n            \"user\": \"" + user + "\",\n            \"counterParty\": \"" + _this.user.address + "\",\n            \"amount\": \"" + utils_1.default.calcRaw(value, dec.networkDecimals).toString() + "\",\n            \"subject\": \"" + subject + "\",\n            \"nonce\": \"" + utils_1.default.generateRandomNumber(40) + "\"\n          }",
                    type: type // (optional) hint for notifications
                }),
                headers: headers,
                method: 'POST'
            };
            return _this.provider.fetchEndpoint("messages/" + user, options);
        });
    };
    Messaging.prototype.messageStream = function () {
        var _this = this;
        return this.provider
            .createWebsocketStream("/streams/messages", 'listen', {
            type: 'all',
            user: this.user.address
        })
            .mergeMap(function (data) {
            if (data.type) {
                return [data];
            }
            var message = __assign({}, JSON.parse(data.message), { timestamp: data.timestamp });
            return _this.currencyNetwork
                .getDecimals(message.networkAddress)
                .then(function (_a) {
                var networkDecimals = _a.networkDecimals, interestRateDecimals = _a.interestRateDecimals;
                return utils_1.default.formatEvent(message, networkDecimals, interestRateDecimals);
            });
        });
    };
    return Messaging;
}());
exports.Messaging = Messaging;
//# sourceMappingURL=Messaging.js.map