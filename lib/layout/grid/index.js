"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = exports.Row = exports.GridLayout = exports.GRID_LAYOUT_COLUMN = exports.GRID_LAYOUT_ROW = exports.GRID_LAYOUT = void 0;
const views = require("./wml/grid");
const util_1 = require("../../util");
const __1 = require("../");
///classNames:begin
exports.GRID_LAYOUT = 'ww-grid-layout';
exports.GRID_LAYOUT_ROW = 'ww-grid-layout__row';
exports.GRID_LAYOUT_COLUMN = 'ww-grid-layout__column';
;
/**
 * GridLayout
 */
class GridLayout extends __1.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new views.GridLayout(this);
        this.values = {
            content: {
                id: this.attrs.ww && this.attrs.ww.id,
                wml: {
                    id: 'root',
                },
                className: () => {
                    let c = (this.attrs.ww && this.attrs.ww.className) ?
                        this.attrs.ww.className : '';
                    return util_1.concat(exports.GRID_LAYOUT, __1.LAYOUT, c);
                }
            }
        };
    }
}
exports.GridLayout = GridLayout;
/**
 * Row
 */
class Row extends __1.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new views.Row(this);
        this.values = {
            content: {
                id: this.attrs.ww && this.attrs.ww.id,
                wml: {
                    id: 'row',
                },
                className: () => {
                    let c = (this.attrs.ww && this.attrs.ww.className) ?
                        this.attrs.ww.className : '';
                    return util_1.concat(exports.GRID_LAYOUT_ROW, c);
                }
            }
        };
    }
}
exports.Row = Row;
/**
 * Column
 */
class Column extends __1.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new views.Column(this);
        this.values = {
            content: {
                id: this.attrs.ww && this.attrs.ww.id,
                wml: {
                    id: 'column'
                },
                className: () => {
                    if (this.attrs.ww != null) {
                        return util_1.concat(exports.GRID_LAYOUT_COLUMN, this.attrs.ww.span ?
                            `-span${this.attrs.ww.span}` :
                            '-span12', this.attrs.ww.offset ?
                            `-offset${this.attrs.ww.offset}` :
                            '', this.attrs.ww.className);
                    }
                    else {
                        return util_1.concat(exports.GRID_LAYOUT_COLUMN, '-span12');
                    }
                }
            }
        };
    }
}
exports.Column = Column;
//# sourceMappingURL=index.js.map