"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var table_1 = require("./wml/table");
var data_1 = require("./data");
var columns = [
    { name: 'index', heading: '#' },
    { name: 'name', heading: 'Name' },
    { name: 'gender', heading: 'Gender' },
    { name: 'email', heading: 'Email' },
    { name: 'balance', heading: 'Balance' },
];
var sortColumns = [
    { name: 'index', heading: '#', sort: 'yes' },
    { name: 'name', heading: 'Name', sort: 'yes' },
    { name: 'gender', heading: 'Gender', sort: 'yes' },
    { name: 'email', heading: 'Email', sort: 'yes' },
    { name: 'balance', heading: 'Balance', sort: 'yes' },
];
var DataTablePage = /** @class */ (function () {
    function DataTablePage() {
        this.view = new table_1.Main(this);
        this.values = {
            users: data_1.users,
            columns: columns,
            sortColumns: sortColumns
        };
    }
    return DataTablePage;
}());
exports.DataTablePage = DataTablePage;
exports.default = new DataTablePage();
//# sourceMappingURL=index.js.map