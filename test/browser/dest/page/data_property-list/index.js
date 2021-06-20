"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyListPage = void 0;
var property_list_1 = require("./wml/property-list");
var data = {
    name: 'London Beta',
    age: '37',
    balance: '5000'
};
var money = function (s) { return "$" + s; };
var dataFragment = function (c) { return new property_list_1.BoldDataView(c); };
var fields = [
    { name: 'name', heading: 'Name', dataFragment: dataFragment },
    { name: 'age', heading: 'age' },
    { name: 'balance', heading: 'Balance', format: money }
];
var PropertyListPage = /** @class */ (function () {
    function PropertyListPage() {
        this.view = new property_list_1.Main(this);
        this.data = data;
        this.fields = fields;
    }
    return PropertyListPage;
}());
exports.PropertyListPage = PropertyListPage;
exports.default = new PropertyListPage();
//# sourceMappingURL=index.js.map