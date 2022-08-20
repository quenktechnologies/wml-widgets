"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginator = exports.PositionViewContext = exports.PageChangedEvent = exports.PAGINATOR_LAST = exports.PAGINATOR_NEXT = exports.PAGINATOR_POSITION = exports.PAGINATOR_PREVIOUS = exports.PAGINATOR_FIRST = exports.PAGINATOR = void 0;
const wml_1 = require("@quenk/wml");
const timer_1 = require("@quenk/noni/lib/control/timer");
const disabled_1 = require("../../content/state/disabled");
const util_1 = require("../../util");
const __1 = require("../../");
const __2 = require("../");
const paginator_1 = require("./wml/paginator");
///classNames:begin
exports.PAGINATOR = 'ww-paginator';
exports.PAGINATOR_FIRST = 'ww-paginator__first';
exports.PAGINATOR_PREVIOUS = 'ww-paginator__previous';
exports.PAGINATOR_POSITION = 'ww-paginator__position';
exports.PAGINATOR_NEXT = 'ww-paginator__next';
exports.PAGINATOR_LAST = 'ww-paginator__last';
/**
 * PageChangedEvent indicating the current page has been changed.
 */
class PageChangedEvent extends __2.Event {
}
exports.PageChangedEvent = PageChangedEvent;
/**
 * PositionViewContext contains the info needed to render the positon part of
 * the paginator.
 */
class PositionViewContext {
    constructor(className, current, total, onChange) {
        this.className = className;
        this.current = current;
        this.total = total;
        this.onChange = onChange;
    }
}
exports.PositionViewContext = PositionViewContext;
/**
 * Paginator provides a control for navigating paged data, results, view etc.
 */
class Paginator extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new paginator_1.PaginatorView(this);
        this.values = {
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.PAGINATOR, __1.getClassName(this.attrs)),
            current: {
                value: (this.attrs.ww && this.attrs.ww.current) ?
                    this.attrs.ww.current : 1,
            },
            total: (this.attrs.ww && this.attrs.ww.total) ?
                this.attrs.ww.total : 1,
            first: {
                className: exports.PAGINATOR_FIRST,
                isDisabled: () => (this.values.current.value <= 1),
                onclick: (e) => {
                    e.preventDefault();
                    this.values.current.value = 1;
                    this.fire();
                }
            },
            previous: {
                className: exports.PAGINATOR_PREVIOUS,
                isDisabled: () => (this.values.current.value <= 1),
                onclick: (e) => {
                    e.preventDefault();
                    this.values.current.value = this.values.current.value - 1;
                    this.fire();
                }
            },
            position: {
                className: exports.PAGINATOR_POSITION,
                view: () => {
                    let ctx = new PositionViewContext(this.values.position.className, this.values.current.value, this.values.total, timer_1.debounce((e) => {
                        let n = Number(e.value);
                        if ((n > 0) && (n <= this.values.total)) {
                            this.values.current.value = n;
                            this.fire();
                        }
                    }, 5000));
                    return ((this.attrs.ww && this.attrs.ww.positionView) ?
                        this.attrs.ww.positionView(ctx) :
                        new paginator_1.PositionView(ctx)).render();
                }
            },
            next: {
                className: exports.PAGINATOR_NEXT,
                isDisabled: () => (this.values.current.value >= this.values.total),
                onclick: (e) => {
                    e.preventDefault();
                    this.values.current.value = this.values.current.value + 1;
                    this.fire();
                }
            },
            last: {
                className: exports.PAGINATOR_LAST,
                isDisabled: () => (this.values.current.value >= this.values.total),
                onclick: (e) => {
                    e.preventDefault();
                    this.values.current.value = this.values.total;
                    this.fire();
                }
            },
            disabled: {
                className: disabled_1.DISABLED
            }
        };
    }
    /**
     * @private
     */
    fire() {
        if (this.attrs.ww && this.attrs.ww.onChange)
            this.attrs.ww.onChange(new PageChangedEvent(this.attrs.ww.name || '', this.values.current.value));
        this.view.invalidate();
    }
}
exports.Paginator = Paginator;
//# sourceMappingURL=index.js.map