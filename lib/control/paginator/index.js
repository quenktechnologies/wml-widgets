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
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
var __2 = require("../");
var paginator_1 = require("./wml/paginator");
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
var PageChangedEvent = /** @class */ (function (_super) {
    __extends(PageChangedEvent, _super);
    function PageChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PageChangedEvent;
}(__2.Event));
exports.PageChangedEvent = PageChangedEvent;
/**
 * Paginator provides a control for navigating paged data, results, view etc.
 */
var Paginator = /** @class */ (function (_super) {
    __extends(Paginator, _super);
    function Paginator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new paginator_1.Main(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.PAGINATOR, __1.getClassName(_this.attrs)),
            current: {
                value: (_this.attrs.ww && _this.attrs.ww.current) ?
                    _this.attrs.ww.current : 1,
                asString: function () { return '' + _this.values.current.value; }
            },
            total: (_this.attrs.ww && _this.attrs.ww.total) ?
                _this.attrs.ww.total : 1,
            first: {
                className: exports.PAGINATOR_FIRST,
                isDisabled: function () { return (_this.values.current.value <= 1); },
                onclick: function (e) {
                    e.preventDefault();
                    _this.values.current.value = 1;
                    _this.fire();
                }
            },
            previous: {
                className: exports.PAGINATOR_PREVIOUS,
                isDisabled: function () { return (_this.values.current.value <= 1); },
                onclick: function (e) {
                    e.preventDefault();
                    _this.values.current.value = _this.values.current.value - 1;
                    _this.fire();
                }
            },
            position: {
                className: exports.PAGINATOR_POSITION
            },
            next: {
                className: exports.PAGINATOR_NEXT,
                isDisabled: function () { return (_this.values.current.value >= _this.values.total); },
                onclick: function (e) {
                    e.preventDefault();
                    _this.values.current.value = _this.values.current.value + 1;
                    _this.fire();
                }
            },
            last: {
                className: exports.PAGINATOR_LAST,
                isDisabled: function () { return (_this.values.current.value >= _this.values.total); },
                onclick: function (e) {
                    e.preventDefault();
                    _this.values.current.value = _this.values.total;
                    _this.fire();
                }
            }
        };
        return _this;
    }
    /**
     * @private
     */
    Paginator.prototype.fire = function () {
        if (this.attrs.ww && this.attrs.ww.onChange)
            this.attrs.ww.onChange(new PageChangedEvent(this.attrs.ww.name || '', this.values.current.value));
        this.view.invalidate();
    };
    return Paginator;
}(wml_1.Component));
exports.Paginator = Paginator;
//# sourceMappingURL=index.js.map