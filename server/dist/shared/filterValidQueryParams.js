"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterValidQueryParams = void 0;
var filterValidQueryParams = function (params, validParams) {
    var filteredParams = {};
    for (var _i = 0, validParams_1 = validParams; _i < validParams_1.length; _i++) {
        var key = validParams_1[_i];
        if (Object.hasOwnProperty.call(params, key) && params[key]) {
            filteredParams[key] = params[key];
        }
    }
    return filteredParams;
};
exports.filterValidQueryParams = filterValidQueryParams;
