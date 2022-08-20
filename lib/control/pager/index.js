"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pager = exports.PageSelectedEvent = exports.PAGER_NEXT = exports.PAGER_PREVIOUS = exports.PAGER = void 0;
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
const __2 = require("../");
const views_1 = require("./views");
///classNames:begin
exports.PAGER = 'ww-pager';
exports.PAGER_PREVIOUS = 'ww-pager__first';
exports.PAGER_NEXT = 'ww-pager__next';
///classNames:end
const PREVIOUS_TEXT = '← Previous';
const NEXT_TEXT = 'Next →';
/**
 * PageSelectedEvent indicates the user has clicked on a control to display
 * a different page in a result set.
 *
 * The value of this event is the page number that was selected.
 */
class PageSelectedEvent extends __2.Event {
}
exports.PageSelectedEvent = PageSelectedEvent;
/**
 * Pager provides a control for step backwards or forwards through paginated
 * data.
 */
class Pager extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views_1.PagerView(this);
        this.values = {
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.PAGER, this.attrs.className),
            current: this.attrs.current || 1,
            total: this.attrs.total || 0,
            previous: {
                className: exports.PAGER_PREVIOUS,
                isDisabled: () => (this.values.current <= 1) ||
                    (this.values.total === 0),
                text: this.attrs.previousText || PREVIOUS_TEXT,
                onClick: () => {
                    this.values.current = this.values.current - 1;
                    this.fire();
                }
            },
            next: {
                className: exports.PAGER_NEXT,
                text: this.attrs.nextText || NEXT_TEXT,
                isDisabled: () => this.values.current >= this.values.total,
                onClick: () => {
                    this.values.current = this.values.current + 1;
                    this.fire();
                }
            },
        };
    }
    /**
     * @private
     */
    fire() {
        this.view.invalidate();
        if (this.attrs.onChange)
            this.attrs.onChange(new PageSelectedEvent(this.attrs.name || '', this.values.current));
    }
}
exports.Pager = Pager;
//# sourceMappingURL=index.js.map