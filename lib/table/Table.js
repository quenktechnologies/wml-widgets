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
var names = require("@package/wml-widgets/common/names");
var view = require("./wml/table");
var util_1 = require("@package/wml-widgets/common/util");
var wml_1 = require("@quenk/wml");
var property_seek_1 = require("property-seek");
var CellClickedEvent_1 = require("./CellClickedEvent");
var RowClickedEvent_1 = require("./RowClickedEvent");
var RowSelectedEvent_1 = require("./RowSelectedEvent");
var HeadingClickedEvent_1 = require("./HeadingClickedEvent");
var AllSelectedEvent_1 = require("./AllSelectedEvent");
var SortDelegate_1 = require("./SortDelegate");
var Cell_1 = require("./Cell");
var _1 = require(".");
/**
 * Table provides a smarter html table.
 *
 * @todo split sort and select api into own table widgets.
 */
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.originalData = _this.attrs.ww.data;
        _this.view = new view.Main(_this);
        _this.delegate = _this.attrs.ww.delegate ?
            _this.attrs.ww.delegate : new SortDelegate_1.SortDelegate(_this);
        _this.values = {
            empty: _this.attrs.ww.empty,
            options: {
                selectable: _this.attrs.ww.selectable
            },
            table: {
                id: _1.TABLE,
                class: util_1.concat(names.TABLE, _this.attrs.ww.class),
                thead: {
                    id: _1.THEAD,
                    class: _this.attrs.ww.theadClass,
                    template: (_this.attrs.ww.thead || view.thead),
                    onCheck: function () {
                        return _this.delegate.onAllSelected(new AllSelectedEvent_1.AllSelectedEvent(_this.originalData));
                    },
                    th: {
                        class: _this.attrs.ww.thClass,
                        onclick: function (field) { return function () {
                            return _this.delegate.onHeadingClicked(new HeadingClickedEvent_1.HeadingClickedEvent(field));
                        }; },
                    }
                },
                tbody: {
                    id: _1.TBODY,
                    template: (_this.attrs.ww.tbody || view.tbody),
                    tr: {
                        class: _this.attrs.ww.trClass,
                        onclick: function (row, index, data) { return function () {
                            return _this.delegate.onRowClicked(new RowClickedEvent_1.RowClickedEvent(row, index, data));
                        }; },
                        onCheck: function (row, index, data) { return function () {
                            return _this.delegate.onRowSelected(new RowSelectedEvent_1.RowSelectedEvent(row, index, data));
                        }; }
                    },
                    td: {
                        id: function (column, colNumber, rowNumber) { return "" + column + colNumber + "," + rowNumber; },
                        class: _this.attrs.ww.tdClass,
                        onclick: function (value, column, rowData, rowNumber) {
                            return function (e) {
                                return _this
                                    .delegate
                                    .onCellClicked(new CellClickedEvent_1.CellClickedEvent(value, column, rowData, rowNumber, new Cell_1.Cell(e.target)));
                            };
                        }
                    }
                }
            },
            sortedOn: '',
            data: _this.originalData.slice(),
            columns: _this.attrs.ww.columns,
            arrow: ''
        };
        return _this;
    }
    /**
     * modifyBody allows a function to modify the contents
     * of the <tbody>
     */
    Table.prototype.modifyBody = function (f) {
        this.view.findById(_1.TBODY).map(f);
        return this;
    };
    Table.prototype.sort = function (name) {
        var columns = this.attrs.ww ? this.attrs.ww.columns ? this.attrs.ww.columns : [] : [];
        var field = columns.reduce(function (p, c) { return p ? p : (c.name === name ? c : null); });
        var sortOn;
        var strategy;
        if (!field)
            throw new Error("Table#sort: unknown field '" + name + "'");
        sortOn = field.sortAs || name;
        strategy = field.strategy || _1.stringSort;
        if (this.values.sortedOn === name) {
            this.values.data = this.values.data.reverse();
            this.values.arrow = (this.values.arrow === _1.ASC_ARROW) ? _1.DESC_ARROW : _1.ASC_ARROW;
        }
        else {
            this.values.arrow = _1.DESC_ARROW;
            this.values.data = this
                .originalData
                .slice()
                .sort(function (a, b) { return strategy(property_seek_1.get(sortOn, a), property_seek_1.get(sortOn, b)); });
        }
        this.values.sortedOn = name;
        this.view.invalidate();
        return this;
    };
    /**
     * update the data the table displays
     */
    Table.prototype.update = function (data) {
        this.originalData = data.slice();
        this.values.data = data.slice();
        (this.values.sortedOn === '') ? this.view.invalidate() : this.sort(this.values.sortedOn);
        return this;
    };
    /**
     * cellAt produces a Cell instance for the coordinates passed (if found).
     */
    Table.prototype.cellAt = function (column, row) {
        return this
            .view
            .findById("" + column + row)
            .map(function (e) { return new Cell_1.Cell(e); });
    };
    /**
     * prepend adds one or more new data rows to the begining of the table.
     */
    Table.prototype.prepend = function (data) {
        var _this = this;
        var d = Array.isArray(data) ? data : [data];
        this.modifyBody(function (e) {
            var dom = view.rows(_this)(d)(_this.values.columns)(_this.view);
            if (e.children.length === 0)
                e.appendChild(dom);
            else
                e.replaceChild(dom, e.firstChild);
        });
        return this;
    };
    /**
     * append adds one or more new data rows to the end of the table.
     */
    Table.prototype.append = function (data) {
        var _this = this;
        var d = Array.isArray(data) ? data : [data];
        this.modifyBody(function (e) {
            return e.appendChild(view.rows(_this)(d)(_this.values.columns)(_this.view));
        });
        return this;
    };
    /**
     * prependRow prepends customisable DOM content to the
     * begining of the table body.
     *
     * NOTE: This DOM content of must be between <tr> elements.
     */
    Table.prototype.prependRow = function (renderer) {
        this.modifyBody(function (e) {
            if (e.firstChild == null)
                e.appendChild(renderer.render());
            else
                e.replaceChild(renderer.render(), e.firstChild);
        });
        return this;
    };
    /**
     * appendRow appends customisable DOM content to the
     * begining of the table body.
     *
     * NOTE: This DOM content of must be between <tr> elements.
     */
    Table.prototype.appendRow = function (renderer) {
        this.modifyBody(function (e) {
            e.appendChild(renderer.render());
        });
        return this;
    };
    /**
     * removeRow will remove an entire row from the table given its index.
     */
    Table.prototype.removeRow = function (index) {
        this.modifyBody(function (e) {
            for (var i = 0; i <= e.rows.length; i++)
                if (i === index)
                    e.rows[i].parentNode.removeChild(e.rows[i]);
        });
        return this;
    };
    return Table;
}(wml_1.Component));
exports.Table = Table;
//# sourceMappingURL=Table.js.map