"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePaginateAndSortOptions = void 0;
var generatePaginateAndSortOptions = function (paginateAndSortOptions) {
    var page = Number(paginateAndSortOptions.page) || 1;
    var limit = Number(paginateAndSortOptions.limit) || 10;
    var skip = (Number(page) - 1) * limit;
    var sortBy = paginateAndSortOptions.sortBy || 'createdAt';
    var sortOrder = paginateAndSortOptions.sortOrder || 'desc';
    return {
        page: page,
        limit: limit,
        skip: skip,
        sortBy: sortBy,
        sortOrder: sortOrder,
    };
};
exports.generatePaginateAndSortOptions = generatePaginateAndSortOptions;
