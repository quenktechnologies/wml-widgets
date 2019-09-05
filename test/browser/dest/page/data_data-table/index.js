"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var table_1 = require("./wml/table");
var data_1 = require("./data");
var util_1 = require("../../../../../lib/util");
var columns = [
    { name: 'index', heading: '#', sort: 'yes' },
    { name: 'name', heading: 'Name', sort: 'yes' },
    { name: 'gender', heading: 'Gender', sort: 'yes' },
    { name: 'email', heading: 'Email', sort: 'yes' },
    { name: 'balance', heading: 'Balance', sort: 'yes' },
];
var DataTablePage = /** @class */ (function () {
    function DataTablePage() {
        var _this = this;
        this.view = new table_1.Main(this);
        this.values = {
            id: 'table',
            users: data_1.users,
            columns: columns,
            onCellClicked: function (e) {
                var mDT = util_1.getById(_this.view, _this.values.id);
                if (mDT.isNothing())
                    return;
                var dt = mDT.get();
                dt.getCell(e.column, e.row).cells.forEach(function (c) {
                    c.style.backgroundColor = 'red';
                    c.style.color = '#fff';
                });
            }
        };
    }
    return DataTablePage;
}());
exports.DataTablePage = DataTablePage;
exports.default = new DataTablePage();
//# sourceMappingURL=index.js.map