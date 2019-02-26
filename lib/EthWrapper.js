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
var bignumber_js_1 = require("bignumber.js");
var utils_1 = require("./utils");
var ETH_DECIMALS = 18;
/**
 * The class EthWrapper contains all methods for depositing, withdrawing and transferring wrapped ETH.
 */
var EthWrapper = /** @class */ (function () {
    function EthWrapper(params) {
        this.provider = params.provider;
        this.transaction = params.transaction;
        this.user = params.user;
    }
    /**
     * Returns all known ETH wrapper contract addresses from the relay server.
     */
    EthWrapper.prototype.getAddresses = function () {
        return this.provider.fetchEndpoint("exchange/eth");
    };
    /**
     * Returns the amount of already wrapped ETH on the given ETH wrapper contract.
     * @param ethWrapperAddress Address of ETH wrapper contract.
     */
    EthWrapper.prototype.getBalance = function (ethWrapperAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "tokens/" + ethWrapperAddress + "/users/" + this.user.address + "/balance";
                        return [4 /*yield*/, this.provider.fetchEndpoint(endpoint)];
                    case 1:
                        balance = _a.sent();
                        return [2 /*return*/, utils_1.default.formatToAmount(balance, ETH_DECIMALS)];
                }
            });
        });
    };
    /**
     * Prepares an ethereum transaction object for transferring wrapped ETH where the
     * loaded user is the sender.
     * @param ethWrapperAddress Address of ETH wrapper contract.
     * @param receiverAddress Address of receiver of transfer.
     * @param value Amount of wrapped ETH to transfer.
     * @param options Transaction options. See `TxOptions` for more information.
     * @param options.gasPrice Custom gas price.
     * @param options.gasLimit Custom gas limit.
     */
    EthWrapper.prototype.prepTransfer = function (ethWrapperAddress, receiverAddress, value, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var gasPrice, gasLimit, _a, rawTx, ethFees;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        gasPrice = options.gasPrice, gasLimit = options.gasLimit;
                        return [4 /*yield*/, this.transaction.prepFuncTx(this.user.address, ethWrapperAddress, 'UnwEth', 'transfer', [
                                receiverAddress,
                                utils_1.default.convertToHexString(utils_1.default.calcRaw(value, ETH_DECIMALS))
                            ], {
                                gasLimit: gasPrice ? new bignumber_js_1.default(gasLimit) : undefined,
                                gasPrice: gasPrice ? new bignumber_js_1.default(gasPrice) : undefined
                            })];
                    case 1:
                        _a = _b.sent(), rawTx = _a.rawTx, ethFees = _a.ethFees;
                        return [2 /*return*/, {
                                ethFees: utils_1.default.convertToAmount(ethFees),
                                rawTx: rawTx
                            }];
                }
            });
        });
    };
    /**
     * Prepares an ethereum transaction object for depositing/wrapping ETH.
     * @param ethWrapperAddress Address of ETH wrapper contract.
     * @param value Amount of ETH to deposit/wrap.
     * @param options Transaction options. See `TxOptions` for more information.
     * @param options.gasPrice Custom gas price.
     * @param options.gasLimit Custom gas limit.
     */
    EthWrapper.prototype.prepDeposit = function (ethWrapperAddress, value, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var gasPrice, gasLimit, _a, rawTx, ethFees;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        gasPrice = options.gasPrice, gasLimit = options.gasLimit;
                        return [4 /*yield*/, this.transaction.prepFuncTx(this.user.address, ethWrapperAddress, 'UnwEth', 'deposit', [], {
                                gasLimit: gasPrice ? new bignumber_js_1.default(gasLimit) : undefined,
                                gasPrice: gasPrice ? new bignumber_js_1.default(gasPrice) : undefined,
                                value: new bignumber_js_1.default(utils_1.default.calcRaw(value, ETH_DECIMALS))
                            })];
                    case 1:
                        _a = _b.sent(), rawTx = _a.rawTx, ethFees = _a.ethFees;
                        return [2 /*return*/, {
                                ethFees: utils_1.default.convertToAmount(ethFees),
                                rawTx: rawTx
                            }];
                }
            });
        });
    };
    /**
     * Prepares an ethereum transaction object for withdrawing/unwrapping ETH.
     * @param ethWrapperAddress Address of ETH wrapper contract.
     * @param value Amount of ETH to withdraw/unwrap.
     * @param options Transaction options. See `TxOptions` for more information.
     * @param options.gasPrice Custom gas price.
     * @param options.gasLimit Custom gas limit.
     */
    EthWrapper.prototype.prepWithdraw = function (ethWrapperAddress, value, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var gasPrice, gasLimit, _a, rawTx, ethFees;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        gasPrice = options.gasPrice, gasLimit = options.gasLimit;
                        return [4 /*yield*/, this.transaction.prepFuncTx(this.user.address, ethWrapperAddress, 'UnwEth', 'withdraw', [utils_1.default.convertToHexString(utils_1.default.calcRaw(value, ETH_DECIMALS))], {
                                gasLimit: gasLimit ? new bignumber_js_1.default(gasLimit) : undefined,
                                gasPrice: gasPrice ? new bignumber_js_1.default(gasPrice) : undefined
                            })];
                    case 1:
                        _a = _b.sent(), rawTx = _a.rawTx, ethFees = _a.ethFees;
                        return [2 /*return*/, {
                                ethFees: utils_1.default.convertToAmount(ethFees),
                                rawTx: rawTx
                            }];
                }
            });
        });
    };
    /**
     * Signs a raw transaction object as returned by `prepTransfer`, `prepDeposit` or `prepWithdraw`
     * and sends the signed transaction.
     * @param rawTx Raw transaction object.
     */
    EthWrapper.prototype.confirm = function (rawTx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.transaction.confirm(rawTx)];
            });
        });
    };
    /**
     * Returns event logs of the ETH wrapper contract for the loaded user.
     * @param ethWrapperAddress Address of the ETH wrapper contract.
     * @param filter Event filter object. See `EventFilterOptions` for more information.
     * @param filter.type Available event types are `Transfer`, `Deposit` and `Withdrawal`.
     * @param filter.fromBlock Start of block range for event logs.
     */
    EthWrapper.prototype.getLogs = function (ethWrapperAddress, filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var type, fromBlock, baseUrl, events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = filter.type, fromBlock = filter.fromBlock;
                        baseUrl = "tokens/" + ethWrapperAddress + "/users/" + this.user.address + "/events";
                        return [4 /*yield*/, this.provider.fetchEndpoint(utils_1.default.buildUrl(baseUrl, { type: type, fromBlock: fromBlock }))];
                    case 1:
                        events = _a.sent();
                        return [2 /*return*/, events.map(function (event) { return utils_1.default.formatEvent(event, ETH_DECIMALS, 0); })];
                }
            });
        });
    };
    return EthWrapper;
}());
exports.EthWrapper = EthWrapper;
//# sourceMappingURL=EthWrapper.js.map