"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableLayout = exports.TableWindow = exports.TableCell = exports.TableHeading = exports.TableRow = exports.TableFooter = exports.TableBody = exports.TableHeader = exports.HOVERABLE = exports.ALTERNATE = exports.COMPACT = exports.BORDERED = exports.TABLE_WINDOW = exports.TABLE_LAYOUT = exports.TABLE_CELL = exports.TABLE_HEADING = exports.TABLE_ROW = exports.TABLE_FOOTER = exports.TABLE_BODY = exports.TABLE_HEADER = void 0;
const views = require("./wml/table");
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
///classNames:begin
exports.TABLE_HEADER = 'ww-table-layout__header';
exports.TABLE_BODY = 'ww-table-layout__body';
exports.TABLE_FOOTER = 'ww-table-layout__footer';
exports.TABLE_ROW = 'ww-table-layout__row';
exports.TABLE_HEADING = 'ww-table-layout _heading';
exports.TABLE_CELL = 'ww-table-layout__cell';
exports.TABLE_LAYOUT = 'ww-table-layout';
exports.TABLE_WINDOW = 'ww-table-window';
exports.BORDERED = '-bordered';
exports.COMPACT = '-compact';
exports.ALTERNATE = '-alternate';
exports.HOVERABLE = '-hoverable';
/**
 * TableHeader (<thead>)
 */
class TableHeader extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.TableHeader(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.TABLE_HEADER, (0, __1.getClassName)(this.attrs))
        };
    }
}
exports.TableHeader = TableHeader;
/**
 * TableBody
 */
class TableBody extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.TableBody(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.TABLE_BODY, (0, __1.getClassName)(this.attrs))
        };
    }
}
exports.TableBody = TableBody;
/**
 * TableFooter
 */
class TableFooter extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.TableFooter(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.TABLE_FOOTER, (0, __1.getClassName)(this.attrs))
        };
    }
}
exports.TableFooter = TableFooter;
/**
 * TableRow
 */
class TableRow extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.TableRow(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.TABLE_ROW, (0, __1.getClassName)(this.attrs)),
            onclick: (this.attrs && this.attrs.onclick) ?
                this.attrs.onclick : undefined
        };
    }
}
exports.TableRow = TableRow;
/**
 * TableHeading
 */
class TableHeading extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.TableHeading(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.TABLE_HEADING, (0, __1.getClassName)(this.attrs)),
            onclick: (this.attrs && this.attrs.onclick) ?
                this.attrs.onclick : undefined
        };
    }
}
exports.TableHeading = TableHeading;
/**
 * TableCell
 */
class TableCell extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.TableCell(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.TABLE_CELL, (0, __1.getClassName)(this.attrs)),
            colspan: (this.attrs && this.attrs.colspan) ?
                this.attrs.colspan : 1,
            rowspan: (this.attrs && this.attrs.rowspan) ?
                this.attrs.rowspan : 1,
            onclick: (this.attrs && this.attrs.onclick) ?
                this.attrs.onclick : undefined
        };
    }
}
exports.TableCell = TableCell;
/**
 * TableWindow allows a TableLayout to be scrolled on smaller screens.
 */
class TableWindow extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.TableWindow(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.TABLE_WINDOW, (0, __1.getClassName)(this.attrs))
        };
    }
}
exports.TableWindow = TableWindow;
/**
 * TableLayout provides a <table> based layout.
 */
class TableLayout extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.TableLayout(this);
        this.values = {
            wml: {
                id: 'table'
            },
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.TABLE_LAYOUT, (0, __1.getClassName)(this.attrs), (this.attrs && this.attrs.alternate) ? exports.ALTERNATE : '', (this.attrs && this.attrs.bordered) ? exports.BORDERED : '', (this.attrs && this.attrs.compact) ? exports.COMPACT : '', (this.attrs && this.attrs.hoverable) ? exports.HOVERABLE : ''),
        };
    }
}
exports.TableLayout = TableLayout;
//# sourceMappingURL=index.js.map