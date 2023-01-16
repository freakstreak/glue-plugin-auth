"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const dotenv = require("dotenv");
class Locals {
    /**
     * Initialize all env variables
     */
    static config() {
        dotenv.config({ path: path.join(__dirname, "../../.env") });
        const port = process.env.APP_PORT || "";
        const authTokenExpiresIn = process.env.AUTH_TOKEN_EXPIRES_IN || "7D";
        const resetPasswordExpiresIn = process.env.RESET_PASSWORD_EXPIRES_IN || "24H";
        const hasuraGraphqlUnauthorizedRole = process.env.HASURA_GRAPHQL_UNAUTHORIZED_ROLE || "";
        const hasuraGraphqlURL = process.env.HASURA_GRAPHQL_URL || "";
        const hasuraAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET || "";
        const hasuraGraphqlUserRole = process.env.HASURA_GRAPHQL_USER_ROLE || "";
        const jwtSecret = process.env.HASURA_GRAPHQL_JWT_SECRET || "";
        const jwtKey = process.env.HASURA_GRAPHQL_JWT_KEY || "";
        const googleClientId = process.env.AUTH_GOOGLE_CLIENT_ID || "";
        const googleClientSecret = process.env.AUTH_GOOGLE_CLIENT_SECRET || "";
        const googleCallbackUrl = process.env.AUTH_GOOGLE_CALLBACK_URL || "";
        const microsoftClientId = process.env.AUTH_MICROSOFT_CLIENT_ID || "";
        const microsoftClientSecret = process.env.AUTH_MICROSOFT_CLIENT_SECRET || "";
        const microsoftCallbackUrl = process.env.AUTH_MICROSOFT_CALLBACK_URL || "";
        const githubClientId = process.env.AUTH_GITHUB_CLIENT_ID || "";
        const githubClientSecret = process.env.AUTH_GITHUB_CLIENT_SECRET || "";
        const githubCallbackUrl = process.env.AUTH_GITHUB_CALLBACK_URL || "";
        const providers = [
            "google",
            "microsoft",
            "github"
        ];
        return {
            port,
            authTokenExpiresIn,
            resetPasswordExpiresIn,
            hasuraGraphqlUnauthorizedRole,
            hasuraAdminSecret,
            hasuraGraphqlUserRole,
            hasuraGraphqlURL,
            jwtSecret,
            jwtKey,
            providers,
            //google
            googleClientId,
            googleClientSecret,
            googleCallbackUrl,
            //microsoft
            microsoftClientId,
            microsoftClientSecret,
            microsoftCallbackUrl,
            //github
            githubClientId,
            githubClientSecret,
            githubCallbackUrl,
        };
    }
    /**
     * Injects config in app's locals
     */
    static init(_express) {
        _express.locals.app = this.config();
        return _express;
    }
}
exports.default = Locals;
//# sourceMappingURL=locals.js.map