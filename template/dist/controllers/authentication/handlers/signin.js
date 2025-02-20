"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const commons_1 = require("../../commons");
const helpers_1 = require("../helpers");
const queries_1 = require("../graphql/queries");
const locals_1 = require("../../../providers/locals");
class Signin {
    static handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body.input || req.body;
            try {
                // graphql query
                const { data } = yield commons_1.default.GQLRequest({
                    variables: { email: email.toLowerCase() },
                    query: queries_1.default.UserByEmail,
                });
                // error handling
                if (!data || !data.data || !data.data.users) {
                    const error = (data.errors && data.errors) || "Something went wrong!";
                    return commons_1.default.Response(res, false, error, null);
                }
                // check if users response is empty
                if (data.data.users.length === 0) {
                    return commons_1.default.Response(res, false, "no user registered with this email address", null);
                }
                // check password with the hashed password
                const validPassword = yield bcrypt.compare(password, data.data.users[0].password);
                if (!validPassword) {
                    return commons_1.default.Response(res, false, "Invalid Password", null);
                }
                // create Token for authentication
                const token = yield helpers_1.default.CreateToken({
                    id: data.data.users[0].id,
                    role: locals_1.default.config().hasuraGraphqlUserRole,
                });
                return res.json({
                    success: true,
                    message: "Sign in successfully!",
                    data: Object.assign({ id: data.data.users[0].id, name: data.data.users[0].name, email: data.data.users[0].email, created_at: data.data.users[0].created_at, updated_at: data.data.users[0].updated_at }, token),
                });
            }
            catch (error) {
                return commons_1.default.Response(res, false, error.message, null);
            }
        });
    }
}
exports.default = Signin;
//# sourceMappingURL=signin.js.map