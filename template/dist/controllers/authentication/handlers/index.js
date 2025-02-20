"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signin_1 = require("./signin");
const signup_1 = require("./signup");
const user_1 = require("./user");
const socialSignin_1 = require("./socialSignin");
class Authentication {
    signin(req, res) {
        return signin_1.default.handle(req, res);
    }
    signup(req, res) {
        return signup_1.default.handle(req, res);
    }
    user(req, res) {
        return user_1.default.handle(req, res);
    }
    socialSigninSuccess(req, res) {
        return socialSignin_1.default.success(req, res);
    }
    socialSigninFailure(req, res) {
        return socialSignin_1.default.failure(req, res);
    }
}
exports.default = new Authentication;
//# sourceMappingURL=index.js.map