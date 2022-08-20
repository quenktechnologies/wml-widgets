"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTablePage = void 0;
const table_1 = require("./wml/table");
const data_1 = require("./data");
const util_1 = require("../../../../../lib/util");
const columns = [
    { name: 'index', heading: '#', sort: 'yes' },
    { name: 'name', heading: 'Name', sort: 'yes' },
    { name: 'gender', heading: 'Gender', sort: 'yes' },
    { name: 'email', heading: 'Email', sort: 'yes' },
    { name: 'balance', heading: 'Balance', sort: 'yes' },
];
class DataTablePage {
    constructor() {
        this.view = new table_1.Main(this);
        this.values = {
            id: 'table',
            users: data_1.users,
            columns,
            onCellClicked: (e) => {
                let mDT = util_1.getById(this.view, this.values.id);
                if (mDT.isNothing())
                    return;
                let dt = mDT.get();
                dt.getCell(e.column, e.row).cells.forEach(c => {
                    c.style.backgroundColor = 'red';
                    c.style.color = '#fff';
                });
            }
        };
    }
}
exports.DataTablePage = DataTablePage;
exports.default = new DataTablePage();
//# sourceMappingURL=index.js.map