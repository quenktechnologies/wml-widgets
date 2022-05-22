"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pager = exports.PageSelectedEvent = exports.PAGER_NEXT = exports.PAGER_PREVIOUS = exports.PAGER = void 0;
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
var __2 = require("../");
var views_1 = require("./views");
///classNames:begin
exports.PAGER = 'ww-pager';
exports.PAGER_PREVIOUS = 'ww-pager__first';
exports.PAGER_NEXT = 'ww-pager__next';
///classNames:end
var PREVIOUS_TEXT = '← Previous';
var NEXT_TEXT = 'Next →';
/**
 * PageSelectedEvent indicates the user has clicked on a control to display
 * a different page in a result set.
 *
 * The value of this event is the page number that was selected.
 */
var PageSelectedEvent = /** @class */ (function (_super) {
    __extends(PageSelectedEvent, _super);
    function PageSelectedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PageSelectedEvent;
}(__2.Event));
exports.PageSelectedEvent = PageSelectedEvent;
/**
 * Pager provides a control for step backwards or forwards through paginated
 * data.
 */
var Pager = /** @class */ (function (_super) {
    __extends(Pager, _super);
    function Pager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views_1.PagerView(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.PAGER, _this.attrs.className),
            current: _this.attrs.current || 1,
            total: _this.attrs.total || 0,
            previous: {
                className: exports.PAGER_PREVIOUS,
                isDisabled: function () { return (_this.values.current <= 1) ||
                    (_this.values.total === 0); },
                text: _this.attrs.previousText || PREVIOUS_TEXT,
                onClick: function () {
                    _this.values.current = _this.values.current - 1;
                    _this.fire();
                }
            },
            next: {
                className: exports.PAGER_NEXT,
                text: _this.attrs.nextText || NEXT_TEXT,
                isDisabled: function () { return _this.values.current >= _this.values.total; },
                onClick: function () {
                    _this.values.current = _this.values.current + 1;
                    _this.fire();
                }
            },
        };
        return _this;
    }
    /**
     * @private
     */
    Pager.prototype.fire = function () {
        this.view.invalidate();
        if (this.attrs.onChange)
            this.attrs.onChange(new PageSelectedEvent(this.attrs.name || '', this.values.current));
    };
    return Pager;
}(wml_1.Component));
exports.Pager = Pager;
//# sourceMappingURL=index.js.map