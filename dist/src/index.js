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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GlueStackPlugin = void 0;
var package_json_1 = __importDefault(require("../package.json"));
var PluginInstance_1 = require("./PluginInstance");
var attachGraphqlInstance_1 = require("./attachGraphqlInstance");
var GlueStackPlugin = (function () {
    function GlueStackPlugin(app, gluePluginStore) {
        this.type = "stateless";
        this.app = app;
        this.instances = [];
        this.gluePluginStore = gluePluginStore;
    }
    GlueStackPlugin.prototype.init = function () {
    };
    GlueStackPlugin.prototype.destroy = function () {
    };
    GlueStackPlugin.prototype.getName = function () {
        return package_json_1["default"].name;
    };
    GlueStackPlugin.prototype.getVersion = function () {
        return package_json_1["default"].version;
    };
    GlueStackPlugin.prototype.getType = function () {
        return this.type;
    };
    GlueStackPlugin.prototype.getTemplateFolderPath = function () {
        return "".concat(process.cwd(), "/node_modules/").concat(this.getName(), "/template");
    };
    GlueStackPlugin.prototype.getMigrationFolderPath = function () {
        return "".concat(process.cwd(), "/node_modules/").concat(this.getName(), "/hasura/migrations");
    };
    GlueStackPlugin.prototype.getInstallationPath = function (target) {
        return "./backend/functions/".concat(target);
    };
    GlueStackPlugin.prototype.runPostInstall = function (instanceName, target) {
        return __awaiter(this, void 0, void 0, function () {
            var graphqlPlugin, graphqlInstances, authInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graphqlPlugin = this.app.getPluginByName("@gluestack/glue-plugin-graphql");
                        if (!graphqlPlugin || !graphqlPlugin.getInstances().length) {
                            console.log("\x1b[36m");
                            console.log("Install graphql instance: `node glue add graphql graphql-backend`");
                            console.log("\x1b[31m");
                            throw new Error("Graphql instance not installed from `@gluestack/glue-plugin-graphql`");
                        }
                        graphqlInstances = [];
                        graphqlPlugin
                            .getInstances()
                            .forEach(function (graphqlInstance) {
                            if (!graphqlInstance.gluePluginStore.get("auth_instance")) {
                                graphqlInstances.push(graphqlInstance);
                            }
                        });
                        if (!graphqlInstances.length) {
                            throw new Error("There is no graphql instance where auth plugin can be installed");
                        }
                        return [4, this.app.createPluginInstance(this, instanceName, this.getTemplateFolderPath(), target)];
                    case 1:
                        authInstance = _a.sent();
                        if (!authInstance) return [3, 3];
                        return [4, (0, attachGraphqlInstance_1.attachGraphqlInstance)(authInstance, graphqlInstances)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    GlueStackPlugin.prototype.createInstance = function (key, gluePluginStore, installationPath) {
        var instance = new PluginInstance_1.PluginInstance(this.app, this, key, gluePluginStore, installationPath);
        this.instances.push(instance);
        return instance;
    };
    GlueStackPlugin.prototype.getInstances = function () {
        return this.instances;
    };
    return GlueStackPlugin;
}());
exports.GlueStackPlugin = GlueStackPlugin;
//# sourceMappingURL=index.js.map