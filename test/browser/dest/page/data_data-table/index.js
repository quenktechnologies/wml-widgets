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
var DataTablePage = /** @class */ (function () {
    function DataTablePage() {
        var _this = this;
        this.view = new table_1.Main(this);
        this.values = {
            users: data_1.users,
            columns: columns,
            sortedOn: [],
            sort: function (e) {
                var mTable = _this.view.findById('sortable');
                if (mTable.isJust()) {
                    var t = mTable.get();
                    if (_this.values.sortedOn.indexOf(e.column) > -1) {
                        t.reverse();
                        _this.values.sortedOn = [];
                    }
                    else {
                        t.sort(e.column);
                        _this.values.sortedOn = [e.column];
                    }
                }
            }
        };
    }
    return DataTablePage;
}());
exports.DataTablePage = DataTablePage;
exports.default = new DataTablePage();
//# sourceMappingURL=index.js.map