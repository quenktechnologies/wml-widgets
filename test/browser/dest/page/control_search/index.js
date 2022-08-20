"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPage = void 0;
const views = require("./wml/search");
const results_1 = require("../../fixtures/data/results");
class SearchPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            id: 'search',
            name: 'search',
            id2: 'search2',
            name2: 'search2',
            stringifier: (r) => r.value,
            onSearch: onSearch(this),
            onSelect: onSelect,
        };
    }
}
exports.SearchPage = SearchPage;
const onSearch = (page) => ({ name, value }) => page
    .view
    .findById(name)
    .map((s) => {
    let hit = results_1.results.filter(c => c.value.toLowerCase().startsWith(value.toLowerCase()) ? true : false);
    s.update(hit);
});
const onSelect = ({ value }) => alert(`Selected "${value.value}"`);
exports.default = new SearchPage();
//# sourceMappingURL=index.js.map