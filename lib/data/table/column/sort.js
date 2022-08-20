"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortById = exports.SortRequest = void 0;
const path_1 = require("@quenk/noni/lib/data/record/path");
const sort_1 = require("@quenk/noni/lib/data/array/sort");
/**
 * SortRequest contains the info needed to preform a sort.
 */
class SortRequest {
    constructor(column, data, key) {
        this.column = column;
        this.data = data;
        this.key = key;
    }
}
exports.SortRequest = SortRequest;
/**
 * sortById sorts a dataset by a column using the columns id.
 *
 * Data is only sorted by one column at a time.
 */
exports.sortById = (cols, key, data, id) => {
    let spec = cols[id];
    let [current, original] = data;
    if (spec === undefined)
        return [current, key];
    if (!spec.sort)
        return [current, key];
    if (key[0] === id) {
        return [current.reverse(), [key[0], key[1] * -1]];
    }
    else {
        let strategy = getSortStrategy(spec.sort);
        let alias = spec.alias ? spec.alias : spec.name;
        return [doSort(original.slice(), strategy, alias), [id, -1]];
    }
};
const getSortStrategy = (s) => {
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
const doSort = (data, s, alias) => data.sort((a, b) => s(getAny(alias, a), getAny(alias, b)));
const getAny = (path, src) => path_1.getDefault(path, src, undefined);
//# sourceMappingURL=sort.js.map