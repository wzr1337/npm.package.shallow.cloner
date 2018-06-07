"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.error = function (scope) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log.apply(console, ["\x1b[31m[Error]\x1b[0m", scope].concat(args));
    };
    Logger.success = function (scope) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log.apply(console, ["\x1b[32m[Success]\x1b[0m", scope].concat(args));
    };
    Logger.info = function (scope) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log.apply(console, ["\x1b[33m[Info]\x1b[0m", scope].concat(args));
    };
    Logger.debug = function (scope) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log.apply(console, ["\x1b[34m[Debug]\x1b[0m", scope].concat(args));
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map