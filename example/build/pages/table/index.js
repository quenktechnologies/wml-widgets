"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Page_1 = require("../Page");
var table_1 = require("./wml/table");
var data_1 = require("./data");
var columns = [
    { name: 'index', heading: '#' },
    { name: 'name', heading: 'Name' },
    { name: 'balance', heading: 'Balance' }
];
var TablePage = /** @class */ (function (_super) {
    __extends(TablePage, _super);
    function TablePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new table_1.Main(_this);
        _this.values = {
            users: data_1.users,
            columns: columns,
            onCellClicked: function (e) {
                var span = document.createElement('span');
                span.appendChild(document.createTextNode("You clicked " + e.column + e.rowNumber + "!"));
                e.cell.setContent({ render: function () { return span; } });
            }
        };
        return _this;
    }
    return TablePage;
}(Page_1.Page));
exports.TablePage = TablePage;
//# sourceMappingURL=index.js.map