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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var fs_1 = require("fs");
var Logger_1 = require("./Logger");
var child_process_1 = require("child_process");
var path = require("path");
var fs_2 = require("fs");
var rimraf_1 = require("rimraf");
var repositoryURL = require("get-repository-url");
var semver = require("semver");
;
var Cloner = /** @class */ (function () {
    function Cloner() {
    }
    Cloner.loadProject = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("not implemented .. yet");
            });
        });
    };
    Cloner.parsePackageJSON = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var pkg;
            return __generator(this, function (_a) {
                path = path || "./package.json";
                try {
                    pkg = JSON.parse(fs_1.readFileSync(path, "utf-8").toString());
                    Logger_1.Logger.info("Cloner parsing:", pkg.name);
                    return [2 /*return*/, {
                            dependencies: pkg.dependencies || {},
                            devDependencies: pkg.devDependencies || {}
                        }];
                }
                catch (error) {
                    Logger_1.Logger.error("Cloner", error.message);
                }
                return [2 /*return*/];
            });
        });
    };
    Cloner.cloneShallow = function (deps, only, outDir) {
        if (outDir === void 0) { outDir = "./tmp/"; }
        return __awaiter(this, void 0, void 0, function () {
            var errors, promises, _deps, _a, _b, _i, repoName, url, repoVersion, repoUrl;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        promises = [];
                        _deps = {};
                        switch (only) {
                            case "prod":
                                _deps = deps.dependencies;
                                break;
                            case "dev":
                                _deps = deps.devDependencies;
                                break;
                            default:
                                _deps = Object.assign(deps.dependencies, deps.devDependencies);
                                break;
                        }
                        _a = [];
                        for (_b in _deps)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        repoName = _a[_i];
                        url = _deps[repoName];
                        if (!(null === url.match(/^(git)?\+?(https?|ssh)\:\/\/\S*$/))) return [3 /*break*/, 3];
                        // this not a direct url
                        repoVersion = semver.valid(semver.coerce(url));
                        return [4 /*yield*/, repositoryURL(repoName)];
                    case 2:
                        repoUrl = _c.sent();
                        Logger_1.Logger.success(repoUrl, repoVersion);
                        return [3 /*break*/, 4];
                    case 3:
                        repoUrl = url.split("#")[0].replace('git+', '');
                        repoVersion = url.split("#")[1];
                        _c.label = 4;
                    case 4:
                        Logger_1.Logger.info("Cloner cloning", repoUrl, "@", repoVersion);
                        promises.push(Cloner.cloneRepo(repoName, repoUrl, repoVersion, outDir).catch(function (reason) {
                            errors = errors || [];
                            errors.push(reason);
                        }));
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: 
                    // try {
                    return [4 /*yield*/, Promise.all(promises)];
                    case 7:
                        // try {
                        _c.sent();
                        if (errors) {
                            throw new Error("There were errors cloning: " + errors.map(function (err) {
                                return err.message;
                            }));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Cloner.cloneRepo = function (name, url, tagOrBranch, outDir) {
        if (outDir === void 0) { outDir = "./tmp/"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                outDir = path.join(outDir, name);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (fs_2.existsSync(outDir))
                            rimraf_1.sync(outDir);
                        var cmd = "git clone -b " + tagOrBranch + " --depth 1 " + url + " " + outDir;
                        child_process_1.exec(cmd, function (error) {
                            if (error) {
                                reject(error);
                            }
                            resolve();
                        });
                    })];
            });
        });
    };
    return Cloner;
}());
exports.Cloner = Cloner;
//# sourceMappingURL=index.js.map