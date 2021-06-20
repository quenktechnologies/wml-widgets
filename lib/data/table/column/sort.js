"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortById = exports.SortRequest = void 0;
var path_1 = require("@quenk/noni/lib/data/record/path");
var sort_1 = require("@quenk/noni/lib/data/array/sort");
/**
 * SortRequest contains the info needed to preform a sort.
 */
var SortRequest = /** @class */ (function () {
    function SortRequest(column, data, key) {
        this.column = column;
        this.data = data;
        this.key = key;
    }
    return SortRequest;
}());
exports.SortRequest = SortRequest;
/**
 * sortById sorts a dataset by a column using the columns id.
 *
 * Data is only sorted by one column at a time.
 */
exports.sortById = function (cols, key, data, id) {
    var spec = cols[id];
    var current = data[0], original = data[1];
    if (spec === undefined)
        return [current, key];
    if (!spec.sort)
        return [current, key];
    if (key[0] === id) {
        return [current.reverse(), [key[0], key[1] * -1]];
    }
    else {
        var strategy = getSortStrategy(spec.sort);
        var alias = spec.alias ? spec.alias : spec.name;
        return [doSort(original.slice(), strategy, alias), [id, -1]];
    }
};
var getSortStrategy = function (s) {
    if (typeof s === 'function')
        return s;
    if (s === 'date')
        return sort_1.date;
    if (s === 'number')
        return sort_1.number;
    if (s === 'string')
        return sort_1.string;
    return sort_1.natural;
};
var doSort = function (data, s, alias) {
    return data.sort(function (a, b) { return s(getAny(alias, a), getAny(alias, b)); });
};
var getAny = function (path, src) {
    return path_1.getDefault(path, src, undefined);
};
//# sourceMappingURL=sort.js.map