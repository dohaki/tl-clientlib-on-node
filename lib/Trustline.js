"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var bignumber_js_1 = require("bignumber.js");
var utils_1 = require("./utils");
/**
 * The Trustline class contains all relevant methods for retrieving, creating and
 * editing trustlines.
 */
var Trustline = /** @class */ (function () {
    function Trustline(params) {
        this.event = params.event;
        this.user = params.user;
        this.transaction = params.transaction;
        this.currencyNetwork = params.currencyNetwork;
        this.provider = params.provider;
    }
    /**
     * Prepares an ethereum transaction object for creating a trustline update request.
     * Called by initiator of update request.
     * @param networkAddress Address of a currency network.
     * @param counterpartyAddress Address of counterparty who receives trustline update request.
     * @param creditlineGiven Proposed creditline limit given by initiator to counterparty,
     *                        i.e. 1.23 if network has to 2 decimals.
     * @param creditlineReceived Proposed creditline limit received by initiator from counterparty,
     *                           i.e. 1.23 if network has to 2 decimals.
     * @param options Options for creating an `updateTrustline` ethereum transaction.
     *                See type `TrustlineUpdateOptions` for more information.
     * @param options.interestRateGiven Proposed interest rate given by initiator to counterparty in % per year.
     * @param options.interestRateReceived Proposed interest rate received by initiator from counterparty in % per year.
     * @param options.networkDecimals Decimals of currency network can be provided manually if known.
     * @param options.interestRateDecimals Decimals of interest rate in currency network can be provided manually if known.
     * @param options.gasLimit Custom gas limit.
     * @param options.gasPrice Custom gas price.
     */
    Trustline.prototype.prepareUpdate = function (networkAddress, counterpartyAddress, creditlineGiven, creditlineReceived, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var interestRateGiven, interestRateReceived, networkDecimals, interestRateDecimals, gasLimit, gasPrice, _a, decimals, _b, customInterests, defaultInterestRate, updateFuncName, updateFuncArgs, _c, rawTx, ethFees;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        interestRateGiven = options.interestRateGiven, interestRateReceived = options.interestRateReceived, networkDecimals = options.networkDecimals, interestRateDecimals = options.interestRateDecimals, gasLimit = options.gasLimit, gasPrice = options.gasPrice;
                        return [4 /*yield*/, Promise.all([
                                this.currencyNetwork.getDecimals(networkAddress, {
                                    interestRateDecimals: interestRateDecimals,
                                    networkDecimals: networkDecimals
                                }),
                                this.currencyNetwork.getInfo(networkAddress)
                            ])
                            // Contract function name and args to use, which can either be
                            // `updateTrustline` or `updateCreditlimits`.
                        ];
                    case 1:
                        _a = _d.sent(), decimals = _a[0], _b = _a[1], customInterests = _b.customInterests, defaultInterestRate = _b.defaultInterestRate;
                        updateFuncName = 'updateCreditlimits';
                        updateFuncArgs = [
                            counterpartyAddress,
                            utils_1.default.convertToHexString(utils_1.default.calcRaw(creditlineGiven, decimals.networkDecimals)),
                            utils_1.default.convertToHexString(utils_1.default.calcRaw(creditlineReceived, decimals.networkDecimals))
                        ];
                        // If interest rates were specified, use `updateTrustline`
                        if (interestRateGiven && interestRateReceived) {
                            updateFuncName = 'updateTrustline';
                            updateFuncArgs = updateFuncArgs.concat([
                                utils_1.default.convertToHexString(customInterests
                                    ? utils_1.default.calcRaw(interestRateGiven, decimals.interestRateDecimals)
                                    : defaultInterestRate.raw),
                                utils_1.default.convertToHexString(customInterests
                                    ? utils_1.default.calcRaw(interestRateReceived, decimals.interestRateDecimals)
                                    : defaultInterestRate.raw)
                            ]);
                        }
                        return [4 /*yield*/, this.transaction.prepFuncTx(this.user.address, networkAddress, 'CurrencyNetwork', updateFuncName, updateFuncArgs, {
                                gasLimit: gasLimit ? new bignumber_js_1.default(gasLimit) : undefined,
                                gasPrice: gasPrice ? new bignumber_js_1.default(gasPrice) : undefined
                            })];
                    case 2:
                        _c = _d.sent(), rawTx = _c.rawTx, ethFees = _c.ethFees;
                        return [2 /*return*/, {
                                ethFees: utils_1.default.convertToAmount(ethFees),
                                rawTx: rawTx
                            }];
                }
            });
        });
    };
    /**
     * Prepares an ethereum transaction object for accepting a trustline update request. Called
     * by receiver of initial update request.
     * @param networkAddress Address of a currency network.
     * @param initiatorAddress Address of user who initiated the trustline update request.
     * @param creditlineGiven Proposed creditline limit given by receiver to initiator,
     *                        i.e. 1.23 if network has to 2 decimals.
     * @param creditlineReceived Proposed creditline limit received by initiator from receiver,
     *                           i.e. 1.23 if network has to 2 decimals.
     * @param options Options for creating a ethereum transaction. See type `TLOptions` for more information.
     * @param options.interestRateGiven Proposed interest rate given by receiver to initiator in % per year.
     * @param options.interestRateReceived Proposed interest rate received by initiator from receiver in % per year.
     * @param options.interestRateDecimals Decimals of interest rate in currency network can be provided manually if known.
     * @param options.decimals Decimals of currency network can be provided manually if known.
     * @param options.gasLimit Custom gas limit.
     * @param options.gasPrice Custom gas price.
     */
    Trustline.prototype.prepareAccept = function (networkAddress, initiatorAddress, creditlineGiven, creditlineReceived, options) {
        if (options === void 0) { options = {}; }
        return this.prepareUpdate(networkAddress, initiatorAddress, creditlineGiven, creditlineReceived, options);
    };
    /**
     * Signs a raw transaction object as returned by `prepareAccept` or `prepareUpdate`
     * and sends the signed transaction.
     * @param rawTx Raw transaction object.
     */
    Trustline.prototype.confirm = function (rawTx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.transaction.confirm(rawTx)];
            });
        });
    };
    /**
     * Returns all trustlines of a loaded user in a currency network.
     * @param networkAddress Address of a currency network.
     */
    Trustline.prototype.getAll = function (networkAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, _a, trustlines, _b, networkDecimals, interestRateDecimals;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        endpoint = "networks/" + networkAddress + "/users/" + this.user.address + "/trustlines";
                        return [4 /*yield*/, Promise.all([
                                this.provider.fetchEndpoint(endpoint),
                                this.currencyNetwork.getDecimals(networkAddress)
                            ])];
                    case 1:
                        _a = _c.sent(), trustlines = _a[0], _b = _a[1], networkDecimals = _b.networkDecimals, interestRateDecimals = _b.interestRateDecimals;
                        return [2 /*return*/, trustlines.map(function (trustline) {
                                return _this._formatTrustline(trustline, networkDecimals, interestRateDecimals);
                            })];
                }
            });
        });
    };
    /**
     * Returns a trustline to a counterparty address in a specified currency network.
     * @param networkAddress Address of a currency network.
     * @param counterpartyAddress Address of counterparty of trustline.
     */
    Trustline.prototype.get = function (networkAddress, counterpartyAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, _a, trustline, _b, networkDecimals, interestRateDecimals;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        endpoint = "networks/" + networkAddress + "/users/" + this.user.address + "/trustlines/" + counterpartyAddress;
                        return [4 /*yield*/, Promise.all([
                                this.provider.fetchEndpoint(endpoint),
                                this.currencyNetwork.getDecimals(networkAddress)
                            ])];
                    case 1:
                        _a = _c.sent(), trustline = _a[0], _b = _a[1], networkDecimals = _b.networkDecimals, interestRateDecimals = _b.interestRateDecimals;
                        return [2 /*return*/, this._formatTrustline(trustline, networkDecimals, interestRateDecimals)];
                }
            });
        });
    };
    /**
     * Returns trustline update requests of loaded user in a currency network.
     * @param networkAddress Address of a currency network.
     * @param filter Event filter object. See `EventFilterOptions` for more information.
     */
    Trustline.prototype.getRequests = function (networkAddress, filter) {
        if (filter === void 0) { filter = {}; }
        return this.event.get(networkAddress, __assign({}, filter, { type: 'TrustlineUpdateRequest' }));
    };
    /**
     * Returns trustline updates of loaded user in a currency network. A update
     * happens when a user accepts a trustline update request.
     * @param networkAddress Address of a currency network.
     * @param filter Event filter object. See `EventFilterOptions` for more information.
     */
    Trustline.prototype.getUpdates = function (networkAddress, filter) {
        if (filter === void 0) { filter = {}; }
        return this.event.get(networkAddress, __assign({}, filter, { type: 'TrustlineUpdate' }));
    };
    /**
     * Prepares an ethereum transaction object for closing a trustline.
     * @param networkAddress Address of a currency network.
     * @param counterpartyAddress Address of counterparty to who the trustline should be settled.
     * @param options Payment options. See `PaymentOptions` for more information.
     * @param options.decimals Decimals of currency network can be provided manually.
     * @param options.maximumHops Max. number of hops for transfer.
     * @param options.maximumFees Max. transfer fees user if willing to pay.
     * @returns A transaction object for closing a trustline. See `CloseTxObject` for more information.
     */
    Trustline.prototype.prepareClose = function (networkAddress, counterpartyAddress, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var gasPrice, gasLimit, networkDecimals, decimals, _a, path, maxFees, estimatedGas, value, closeFuncName, closeFuncArgs, _b, rawTx, ethFees;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        gasPrice = options.gasPrice, gasLimit = options.gasLimit, networkDecimals = options.networkDecimals;
                        return [4 /*yield*/, this.currencyNetwork.getDecimals(networkAddress, {
                                networkDecimals: networkDecimals
                            })
                            // Get close path
                        ];
                    case 1:
                        decimals = _c.sent();
                        return [4 /*yield*/, this.getClosePath(networkAddress, this.user.address, counterpartyAddress, __assign({}, options, { networkDecimals: decimals.networkDecimals }))
                            // Determine which close function to call with which arguments.
                        ];
                    case 2:
                        _a = _c.sent(), path = _a.path, maxFees = _a.maxFees, estimatedGas = _a.estimatedGas, value = _a.value;
                        // If estimated value to be transferred for closing the trustline is
                        // ZERO, a triangulated transfer is NOT needed.
                        if (value.raw === '0') {
                            closeFuncName = 'closeTrustline';
                            closeFuncArgs = [counterpartyAddress];
                        }
                        else {
                            // If there is no path with enough capacity for triangulation throw.
                            if (path.length === 0) {
                                throw new Error('Could not find a path with enough capacity.');
                            }
                            closeFuncName = 'closeTrustlineByTriangularTransfer';
                            closeFuncArgs = [
                                counterpartyAddress,
                                utils_1.default.convertToHexString(new bignumber_js_1.default(maxFees.raw)),
                                path.slice(1)
                            ];
                        }
                        return [4 /*yield*/, this.transaction.prepFuncTx(this.user.address, networkAddress, 'CurrencyNetwork', closeFuncName, closeFuncArgs, {
                                gasLimit: gasLimit
                                    ? new bignumber_js_1.default(gasLimit)
                                    : new bignumber_js_1.default(estimatedGas).multipliedBy(1.5).integerValue(),
                                gasPrice: gasPrice ? new bignumber_js_1.default(gasPrice) : undefined
                            })];
                    case 3:
                        _b = _c.sent(), rawTx = _b.rawTx, ethFees = _b.ethFees;
                        return [2 /*return*/, {
                                ethFees: utils_1.default.convertToAmount(ethFees),
                                maxFees: maxFees,
                                path: path,
                                rawTx: rawTx
                            }];
                }
            });
        });
    };
    /**
     * Returns a path for closing a trustline between sender and counterparty.
     * @param networkAddress Address of a currency network.
     * @param senderAddress Address of sender.
     * @param counterpartyAddress Address of counterparty of trustline.
     * @param options Payment options. See `PaymentOptions` for more information.
     * @param options.networkDecimals Decimals of currency network can be provided manually.
     * @param options.maximumHops Max. number of hops for transfer.
     * @param options.maximumFees Max. transfer fees user if willing to pay.
     * @returns Relevant information for closing a trustline. See `ClosePathObject`.
     */
    Trustline.prototype.getClosePath = function (networkAddress, senderAddress, counterpartyAddress, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var networkDecimals, maximumHops, maximumFees, decimals, endpoint, data, _a, path, estimatedGas, fees, value;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        networkDecimals = options.networkDecimals, maximumHops = options.maximumHops, maximumFees = options.maximumFees;
                        return [4 /*yield*/, this.currencyNetwork.getDecimals(networkAddress, {
                                networkDecimals: networkDecimals
                            })
                            // Define the relay endpoint.
                        ];
                    case 1:
                        decimals = _b.sent();
                        endpoint = "networks/" + networkAddress + "/close-trustline-path-info";
                        data = {
                            from: senderAddress,
                            maxFees: maximumFees,
                            maxHops: maximumHops,
                            to: counterpartyAddress
                        };
                        return [4 /*yield*/, this.provider.fetchEndpoint(endpoint, {
                                body: JSON.stringify(data),
                                headers: new Headers({ 'Content-Type': 'application/json' }),
                                method: 'post'
                            })];
                    case 2:
                        _a = _b.sent(), path = _a.path, estimatedGas = _a.estimatedGas, fees = _a.fees, value = _a.value;
                        return [2 /*return*/, {
                                estimatedGas: new bignumber_js_1.default(estimatedGas),
                                maxFees: utils_1.default.formatToAmount(fees, decimals.networkDecimals),
                                path: path,
                                value: utils_1.default.formatToAmount(value, decimals.networkDecimals)
                            }];
                }
            });
        });
    };
    /**
     * Formats number values of trustline retrieved from the relay server.
     * @param trustline unformatted trustline
     * @param decimals decimals object of currency network
     */
    Trustline.prototype._formatTrustline = function (trustline, networkDecimals, interestDecimals) {
        return __assign({}, trustline, { balance: utils_1.default.formatToAmount(trustline.balance, networkDecimals), given: utils_1.default.formatToAmount(trustline.given, networkDecimals), interestRateGiven: utils_1.default.formatToAmount(trustline.interestRateGiven, interestDecimals), interestRateReceived: utils_1.default.formatToAmount(trustline.interestRateReceived, interestDecimals), leftGiven: utils_1.default.formatToAmount(trustline.leftGiven, networkDecimals), leftReceived: utils_1.default.formatToAmount(trustline.leftReceived, networkDecimals), received: utils_1.default.formatToAmount(trustline.received, networkDecimals) });
    };
    return Trustline;
}());
exports.Trustline = Trustline;
//# sourceMappingURL=Trustline.js.map