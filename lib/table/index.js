"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AllSelectedEvent_1 = require("./AllSelectedEvent");
exports.AllSelectedEvent = AllSelectedEvent_1.AllSelectedEvent;
var CellClickedEvent_1 = require("./CellClickedEvent");
exports.CellClickedEvent = CellClickedEvent_1.CellClickedEvent;
var RowClickedEvent_1 = require("./RowClickedEvent");
exports.RowClickedEvent = RowClickedEvent_1.RowClickedEvent;
var HeadingClickedEvent_1 = require("./HeadingClickedEvent");
exports.HeadingClickedEvent = HeadingClickedEvent_1.HeadingClickedEvent;
var Table_1 = require("./Table");
exports.Table = Table_1.Table;
var Cell_1 = require("./Cell");
exports.Cell = Cell_1.Cell;
exports.ASC_ARROW = '\u21e7';
exports.DESC_ARROW = '\u21e9';
exports.THEAD = 'thead';
exports.TBODY = 'tbody';
exports.TABLE = 'table';
exports.dateSort = function (a, b) {
    var na = new Date(a).getTime();
    var nb = new Date(b).getTime();
    return na > nb ? -1 : na < nb ? 1 : 0;
};
exports.stringSort = function (a, b) {
    var la = String(a).replace(/\s+/, '').toLowerCase();
    var lb = String(b).replace(/\s+/, '').toLowerCase();
    return (la > lb) ? -1 : (la < lb) ? 1 : 0;
};
exports.naturalSort = function (a, b) {
    if (a === void 0) { a = ''; }
    if (b === void 0) { b = ''; }
    //Source: http://stackoverflow.com/questions/4340227/sort-mixed-alpha-numeric-array
    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;
    var AInt = parseInt(a, 10);
    var BInt = parseInt(b, 10);
    if (isNaN(AInt) && isNaN(BInt)) {
        var aA = a.replace(reA, '');
        var bA = b.replace(reA, '');
        if (aA === bA) {
            var aN = parseInt(a.replace(reN, ''), 10);
            var bN = parseInt(b.replace(reN, ''), 10);
            return aN === bN ? 0 : aN > bN ? -1 : 1;
        }
        else {
            return aA > bA ? -1 : 1;
        }
    }
    else if (isNaN(AInt)) {
        return -1; //to make alphanumeric sort first return -1 here
    }
    else if (isNaN(BInt)) {
        return 1; //to make alphanumeric sort first return 1 here
    }
    else {
        return AInt > BInt ? -1 : 1;
    }
};
exports.numberSort = function (a, b) {
    var na = parseFloat(a);
    var nb = parseFloat(b);
    na = (isNaN(a)) ? -Infinity : a;
    nb = (isNaN(b)) ? -Infinity : b;
    return (na > nb) ? -1 : (na < nb) ? 1 : 0;
};
//# sourceMappingURL=index.js.map