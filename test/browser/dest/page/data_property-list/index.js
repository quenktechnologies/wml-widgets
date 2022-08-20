"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyListPage = void 0;
const property_list_1 = require("./wml/property-list");
const data = {
    name: 'London Beta',
    age: '37',
    balance: '5000'
};
const money = (s) => `$${s}`;
const dataFragment = (c) => new property_list_1.BoldDataView(c);
const fields = [
    { name: 'name', heading: 'Name', dataFragment },
    { name: 'age', heading: 'age' },
    { name: 'balance', heading: 'Balance', format: money }
];
class PropertyListPage {
    constructor() {
        this.view = new property_list_1.Main(this);
        this.data = data;
        this.fields = fields;
    }
}
exports.PropertyListPage = PropertyListPage;
exports.default = new PropertyListPage();
//# sourceMappingURL=index.js.map