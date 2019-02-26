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
var ethUtils = require("ethereumjs-util");
var utils_1 = require("./utils");
/**
 * The User class contains all user related functions, which also include keystore
 * related methods.
 */
var User = /** @class */ (function () {
    function User(params) {
        this.defaultPassword = 'ts';
        this.provider = params.provider;
        this.signer = params.signer;
        this.transaction = params.transaction;
        this.wallet = params.wallet;
    }
    Object.defineProperty(User.prototype, "address", {
        /**
         * Checksummed Ethereum address of currently loaded user/keystore.
         */
        get: function () {
            return this.wallet.address;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "pubKey", {
        /**
         * Public key of currently loaded user/keystore.
         */
        get: function () {
            return this.wallet.pubKey;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new user and the respective keystore using the configured signer.
     * Loads new user into the state and returns the created user object.
     * @param progressCallback Optional progress callback to call on encryption progress.
     */
    User.prototype.create = function (progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var createdAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.wallet.createAccount(this.defaultPassword, progressCallback)];
                    case 1:
                        createdAccount = _a.sent();
                        return [2 /*return*/, createdAccount];
                }
            });
        });
    };
    /**
     * Loads an existing user and respective keystore.
     * Returns the loaded user object.
     * @param serializedKeystore Serialized [eth-lightwallet](https://github.com/ConsenSys/eth-lightwallet) key store.
     * @param progressCallback Optional progress callback to call on encryption progress.
     */
    User.prototype.load = function (serializedKeystore, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var loadedAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.wallet.loadAccount(serializedKeystore, this.defaultPassword, progressCallback)];
                    case 1:
                        loadedAccount = _a.sent();
                        return [2 /*return*/, loadedAccount];
                }
            });
        });
    };
    /**
     * Digitally signs a message hash with the currently loaded user/keystore.
     * @param msgHash Hash of message that should be signed.
     */
    User.prototype.signMsgHash = function (msgHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.signer.signMsgHash(msgHash)];
            });
        });
    };
    /**
     * Returns ETH balance of loaded user.
     */
    User.prototype.getBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.signer.getBalance()];
            });
        });
    };
    /**
     * Encrypts a message with the public key of another user.
     * @param msg Plain text message that should get encrypted.
     * @param theirPubKey Public key of receiver of message.
     */
    User.prototype.encrypt = function (msg, theirPubKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.wallet.encrypt(msg, theirPubKey)];
            });
        });
    };
    /**
     * Decrypts an encrypted message with the private key of loaded user.
     * @param encMsg Encrypted message.
     * @param theirPubKey Public key of sender of message.
     */
    User.prototype.decrypt = function (encMsg, theirPubKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.wallet.decrypt(encMsg, theirPubKey)];
            });
        });
    };
    /**
     * Returns the 12 word seed of loaded user.
     */
    User.prototype.showSeed = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.wallet.showSeed()];
            });
        });
    };
    /**
     * Returns the private key of loaded user.
     */
    User.prototype.exportPrivateKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.wallet.exportPrivateKey()];
            });
        });
    };
    /**
     * Recovers user / keystore from 12 word seed.
     * @param seed 12 word seed phrase string.
     * @param progressCallback Optional progress callback to call on encryption progress.
     */
    User.prototype.recoverFromSeed = function (seed, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var recoveredUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.wallet.recoverFromSeed(seed, this.defaultPassword, progressCallback)];
                    case 1:
                        recoveredUser = _a.sent();
                        return [2 /*return*/, recoveredUser];
                }
            });
        });
    };
    /**
     * Returns a shareable link, which can be opened by other users who already have ETH
     * and are willing to send some of it to the new user. The function is called by a
     * new user who wants to get onboarded, respectively has no ETH or trustline.
     * @param username Name of new user who wants to get onboarded.
     * @param serializedKeystore Serialized [eth-lightwallet](https://github.com/ConsenSys/eth-lightwallet)
     *                           keystore of new user who wants to get onboarded.
     * @param progressCallback Optional progress callback to call on encryption progress.
     */
    User.prototype.createOnboardingMsg = function (username, serializedKeystore, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, address, pubKey, params;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.wallet.loadAccount(serializedKeystore, this.defaultPassword, progressCallback)];
                    case 1:
                        _a = _b.sent(), address = _a.address, pubKey = _a.pubKey;
                        params = ['onboardingrequest', username, address, pubKey];
                        return [2 /*return*/, utils_1.default.createLink(params)];
                }
            });
        });
    };
    /**
     * Returns an ethereum transaction object for onboarding a new user. Called by a user who already has ETH
     * and wants to onboard a new user by sending some of it.
     * @param newUserAddress Address of new user who wants to get onboarded.
     * @param initialValue Value of ETH to send, default is 0.1 ETH.
     */
    User.prototype.prepOnboarding = function (newUserAddress, initialValue) {
        if (initialValue === void 0) { initialValue = 0.1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.transaction.prepValueTx(this.address, // address of onboarder
                    newUserAddress, // address of new user who gets onboarded
                    utils_1.default.calcRaw(initialValue, 18))];
            });
        });
    };
    /**
     * Signs a raw transaction object as returned by `prepOnboarding`
     * and sends the signed transaction.
     * @param rawTx Raw transaction object.
     */
    User.prototype.confirmOnboarding = function (rawTx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.transaction.confirm(rawTx)];
            });
        });
    };
    /**
     * Returns a shareable link which can be send to other users.
     * Contains username and address.
     * @param username Custom username.
     */
    User.prototype.createLink = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = ['contact', this.address, username];
                return [2 /*return*/, utils_1.default.createLink(params)];
            });
        });
    };
    /**
     * @hidden
     * Gives some ETH to requesting address.
     * NOTE: Used only for dev purposes.
     */
    User.prototype.requestEth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                options = {
                    body: JSON.stringify({ address: this.address }),
                    headers: new Headers({ 'Content-Type': 'application/json' }),
                    method: 'POST'
                };
                return [2 /*return*/, this.provider.fetchEndpoint("request-ether", options)];
            });
        });
    };
    /**
     * @hidden
     * Verifies a signature.
     * @param message Signed message
     * @param signature Digital signature
     */
    User.prototype.verifySignature = function (message, signature) {
        var r = ethUtils.toBuffer(signature.slice(0, 66));
        var s = ethUtils.toBuffer("0x" + signature.slice(66, 130));
        var v = ethUtils.bufferToInt(ethUtils.toBuffer("0x" + signature.slice(130, 132)));
        var m = ethUtils.sha3(JSON.stringify(message));
        var pub = ethUtils.ecrecover(m, v, r, s);
        var adr = "0x" + ethUtils.pubToAddress(pub).toString('hex');
        return message.address === adr;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map