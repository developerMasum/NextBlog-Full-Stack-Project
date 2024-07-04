"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPError = void 0;
var HTTPError = /** @class */ (function (_super) {
    __extends(HTTPError, _super);
    function HTTPError(statusCode, message, stack) {
        if (stack === void 0) { stack = ''; }
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        _this.statusCode = statusCode;
        _this.stack = stack;
        if (stack) {
            _this.stack = stack;
        }
        else {
            Error.captureStackTrace(_this, _this.constructor);
        }
        return _this;
    }
    return HTTPError;
}(Error));
exports.HTTPError = HTTPError;
