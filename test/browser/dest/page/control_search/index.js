"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPage = void 0;
var views = require("./wml/search");
var results_1 = require("../../fixtures/data/results");
var SearchPage = /** @class */ (function () {
    function SearchPage() {
        this.view = new views.Main(this);
        this.values = {
            id: 'search',
            name: 'search',
            id2: 'search2',
            name2: 'search2',
            stringifier: function (r) { return r.value; },
            onSearch: onSearch(this),
            onSelect: onSelect,
        };
    }
    return SearchPage;
}());
exports.SearchPage = SearchPage;
var onSearch = function (page) { return function (_a) {
    var name = _a.name, value = _a.value;
    return page
        .view
        .findById(name)
        .map(function (s) {
        var hit = results_1.results.filter(function (c) {
            return c.value.toLowerCase().startsWith(value.toLowerCase()) ? true : false;
        });
        s.update(hit);
    });
}; };
var onSelect = function (_a) {
    var value = _a.value;
    return alert("Selected \"" + value.value + "\"");
};
exports.default = new SearchPage();
//# sourceMappingURL=index.js.map