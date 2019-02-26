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
var ethers_1 = require("ethers");
var TrustlinesContractsAbi = require("trustlines-contracts-abi");
var utils_1 = require("./utils");
var ETH_DECIMALS = 18;
/**
 * The Transaction class contains functions that are needed for Ethereum transactions.
 */
var Transaction = /** @class */ (function () {
    function Transaction(params) {
        this.signer = params.signer;
        this.provider = params.provider;
    }
    /**
     * Returns transaction fees and the raw transaction object for calling a contract function.
     * @param userAddress address of user that calls the contract function
     * @param contractAddress address of deployed contract
     * @param contractName name of deployed contract
     * @param functionName name of contract function
     * @param parameters arguments of function in same order as in contract
     * @param gasPrice (optional)
     * @param gasLimit (optional)
     * @returns A ethereum transaction object and the estimated transaction fees in ETH.
     */
    Transaction.prototype.prepFuncTx = function (userAddress, contractAddress, contractName, functionName, args, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var txInfos, abi, rawTx, ethFees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.provider.getTxInfos(userAddress)];
                    case 1:
                        txInfos = _a.sent();
                        abi = new ethers_1.ethers.utils.Interface(TrustlinesContractsAbi[contractName].abi);
                        rawTx = {
                            data: abi.functions[functionName].encode(args),
                            from: userAddress,
                            gasLimit: options.gasLimit || new bignumber_js_1.BigNumber(600000),
                            gasPrice: options.gasPrice || txInfos.gasPrice,
                            nonce: txInfos.nonce,
                            to: contractAddress,
                            value: options.value || new bignumber_js_1.BigNumber(0)
                        };
                        ethFees = rawTx.gasLimit.multipliedBy(rawTx.gasPrice);
                        return [2 /*return*/, {
                                ethFees: utils_1.default.formatToAmountInternal(ethFees, ETH_DECIMALS),
                                rawTx: rawTx
                            }];
                }
            });
        });
    };
    /**
     * Returns transaction fees and raw transaction object for transferring ETH.
     * @param senderAddress address of user sending the transfer
     * @param receiverAddress address of user receiving the transfer
     * @param rawValue transfer amount in wei
     * @param gasPrice (optional)
     * @param gasLimit (optional)
     * @returns A ethereum transaction object containing and the estimated transaction fees in ETH.
     */
    Transaction.prototype.prepValueTx = function (senderAddress, receiverAddress, rawValue, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var txInfos, rawTx, ethFees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.provider.getTxInfos(senderAddress)];
                    case 1:
                        txInfos = _a.sent();
                        rawTx = {
                            from: senderAddress,
                            gasLimit: options.gasLimit || new bignumber_js_1.BigNumber(21000),
                            gasPrice: options.gasPrice || txInfos.gasPrice,
                            nonce: txInfos.nonce,
                            to: receiverAddress,
                            value: rawValue
                        };
                        ethFees = rawTx.gasLimit.multipliedBy(rawTx.gasPrice);
                        return [2 /*return*/, {
                                ethFees: utils_1.default.formatToAmountInternal(ethFees, ETH_DECIMALS),
                                rawTx: rawTx
                            }];
                }
            });
        });
    };
    /**
     * Signs and sends the given transaction object.
     * @param rawTx Raw transaction object.
     */
    Transaction.prototype.confirm = function (rawTx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.signer.confirm(rawTx)];
            });
        });
    };
    return Transaction;
}());
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map