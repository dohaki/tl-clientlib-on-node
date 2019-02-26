"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var CURRENCY_NETWORK = 'CurrencyNetwork';
var TOKEN = 'Token';
/**
 * The Event class contains all methods related to retrieving event logs.
 */
var Event = /** @class */ (function () {
    function Event(params) {
        this.currencyNetwork = params.currencyNetwork;
        this.provider = params.provider;
        this.user = params.user;
    }
    /**
     * @hidden
     * Returns event logs of loaded user in a specified currency network.
     * @param networkAddress Address of a currency network.
     * @param filter Event filter object. See `EventFilterOptions` for more information.
     * @param filter.type Available event types are `Transfer`, `TrustlineUpdateRequest` and `TrustlineUpdate`.
     * @param filter.fromBlock Start of block range for event logs.
     */
    Event.prototype.get = function (networkAddress, filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, parameterUrl, _a, events, _b, networkDecimals, interestRateDecimals;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        baseUrl = "networks/" + networkAddress + "/users/" + this.user.address + "/events";
                        parameterUrl = utils_1.default.buildUrl(baseUrl, filter);
                        return [4 /*yield*/, Promise.all([
                                this.provider.fetchEndpoint(parameterUrl),
                                this.currencyNetwork.getDecimals(networkAddress)
                            ])];
                    case 1:
                        _a = _c.sent(), events = _a[0], _b = _a[1], networkDecimals = _b.networkDecimals, interestRateDecimals = _b.interestRateDecimals;
                        return [2 /*return*/, events.map(function (event) {
                                return utils_1.default.formatEvent(event, networkDecimals, interestRateDecimals);
                            })];
                }
            });
        });
    };
    /**
     * Returns event logs of loaded user in all currency networks.
     * @param filter Event filter object. See `EventFilterOptions` for more information.
     * @param filter.type Available event types are:
     *                    CurrencyNetwork -> `Transfer`, `TrustlineUpdateRequest` and `TrustlineUpdate`
     *                    EthWrapper -> `Transfer`, `Deposit` and `Withdrawal`
     *                    Exchange -> `LogFill` and `LogCancel`
     * @param filter.fromBlock Start of block range for event logs.
     */
    Event.prototype.getAll = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, parameterUrl, events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "users/" + this.user.address + "/events";
                        parameterUrl = utils_1.default.buildUrl(endpoint, filter);
                        return [4 /*yield*/, this.provider.fetchEndpoint(parameterUrl)];
                    case 1:
                        events = _a.sent();
                        return [2 /*return*/, this.setDecimalsAndFormat(events)];
                }
            });
        });
    };
    /**
     * @hidden
     */
    Event.prototype.updateStream = function () {
        var _this = this;
        return this.provider
            .createWebsocketStream('streams/events', 'subscribe', {
            event: 'all',
            user: this.user.address
        })
            .mergeMap(function (event) {
            if (event.hasOwnProperty('networkAddress')) {
                return _this.currencyNetwork
                    .getDecimals(event.networkAddress)
                    .then(function (_a) {
                    var networkDecimals = _a.networkDecimals, interestRateDecimals = _a.interestRateDecimals;
                    return utils_1.default.formatEvent(event, networkDecimals, interestRateDecimals);
                });
            }
            else {
                return Promise.resolve(event);
            }
        });
    };
    /**
     * Fetches decimals for given event logs and formats them so that all numerical
     * values are `Amount` objects.
     * @param rawEvents trustlines network events
     */
    Event.prototype.setDecimalsAndFormat = function (rawEvents) {
        return __awaiter(this, void 0, void 0, function () {
            var addressesMap, decimalsMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addressesMap = this._getUniqueAddressesMap(rawEvents);
                        return [4 /*yield*/, this.getDecimalsMap(addressesMap)];
                    case 1:
                        decimalsMap = _a.sent();
                        return [2 /*return*/, rawEvents.map(function (event) {
                                if (event.networkAddress) {
                                    return utils_1.default.formatEvent(event, decimalsMap[event.networkAddress]
                                        .networkDecimals, decimalsMap[event.networkAddress]
                                        .interestRateDecimals);
                                }
                                if (event.tokenAddress) {
                                    return utils_1.default.formatEvent(event, decimalsMap[event.tokenAddress].networkDecimals, decimalsMap[event.tokenAddress]
                                        .interestRateDecimals);
                                }
                                if (event.exchangeAddress) {
                                    var _a = event, makerTokenAddress = _a.makerTokenAddress, takerTokenAddress = _a.takerTokenAddress;
                                    return utils_1.default.formatExchangeEvent(event, decimalsMap[makerTokenAddress].networkDecimals, decimalsMap[takerTokenAddress].networkDecimals);
                                }
                                return event;
                            })];
                }
            });
        });
    };
    /**
     * Returns a mapping from address to decimals
     * @param addressesMap mapping from address to whether given address is a CurrencyNetwork
     *                     or Token contract.
     */
    Event.prototype.getDecimalsMap = function (addressesMap) {
        return __awaiter(this, void 0, void 0, function () {
            var addresses, decimalsList;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addresses = Object.keys(addressesMap);
                        return [4 /*yield*/, Promise.all(addresses.map(function (address) {
                                if (addressesMap[address] === CURRENCY_NETWORK) {
                                    return _this.currencyNetwork.getDecimals(address);
                                }
                                if (addressesMap[address] === TOKEN) {
                                    // TODO: find different way to get decimals of token
                                    // NOTE: only expecting WrappedEthEvents for now
                                    return _this.currencyNetwork.getDecimals(address, {
                                        interestRateDecimals: 0,
                                        networkDecimals: 18
                                    });
                                }
                            }))];
                    case 1:
                        decimalsList = _a.sent();
                        return [2 /*return*/, addresses.reduce(function (decimalsMap, network, i) {
                                decimalsMap[network] = decimalsList[i];
                                return decimalsMap;
                            }, {})];
                }
            });
        });
    };
    /**
     * Returns unique addresses from a list of event logs and maps to whether the address
     * is a CurrencyNetwork or Token contract.
     * @param events trustlines network events
     */
    Event.prototype._getUniqueAddressesMap = function (events) {
        var _this = this;
        return events.reduce(function (result, e) {
            if (e.networkAddress) {
                result[e.networkAddress] = CURRENCY_NETWORK;
            }
            else if (e.tokenAddress) {
                result[e.tokenAddress] = TOKEN;
            }
            else if (e.exchangeAddress) {
                var _a = e, makerTokenAddress = _a.makerTokenAddress, takerTokenAddress = _a.takerTokenAddress;
                if (!result[makerTokenAddress]) {
                    result[makerTokenAddress] = _this.currencyNetwork.isNetwork(makerTokenAddress)
                        ? CURRENCY_NETWORK
                        : TOKEN;
                }
                if (!result[takerTokenAddress]) {
                    result[takerTokenAddress] = _this.currencyNetwork.isNetwork(takerTokenAddress)
                        ? CURRENCY_NETWORK
                        : TOKEN;
                }
            }
            return result;
        }, {});
    };
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=Event.js.map