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
exports.Paginator = exports.PositionViewContext = exports.PageChangedEvent = exports.PAGINATOR_LAST = exports.PAGINATOR_NEXT = exports.PAGINATOR_POSITION = exports.PAGINATOR_PREVIOUS = exports.PAGINATOR_FIRST = exports.PAGINATOR = void 0;
var wml_1 = require("@quenk/wml");
var timer_1 = require("@quenk/noni/lib/control/timer");
var disabled_1 = require("../../content/state/disabled");
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
 * PositionViewContext contains the info needed to render the positon part of
 * the paginator.
 */
var PositionViewContext = /** @class */ (function () {
    function PositionViewContext(className, current, total, onChange) {
        this.className = className;
        this.current = current;
        this.total = total;
        this.onChange = onChange;
    }
    return PositionViewContext;
}());
exports.PositionViewContext = PositionViewContext;
/**
 * Paginator provides a control for navigating paged data, results, view etc.
 */
var Paginator = /** @class */ (function (_super) {
    __extends(Paginator, _super);
    function Paginator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new paginator_1.PaginatorView(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.PAGINATOR, __1.getClassName(_this.attrs)),
            current: {
                value: (_this.attrs.ww && _this.attrs.ww.current) ?
                    _this.attrs.ww.current : 1,
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
                className: exports.PAGINATOR_POSITION,
                view: function () {
                    var ctx = new PositionViewContext(_this.values.position.className, _this.values.current.value, _this.values.total, timer_1.debounce(function (e) {
                        var n = Number(e.value);
                        if ((n > 0) && (n <= _this.values.total)) {
                            _this.values.current.value = n;
                            _this.fire();
                        }
                    }, 5000));
                    return ((_this.attrs.ww && _this.attrs.ww.positionView) ?
                        _this.attrs.ww.positionView(ctx) :
                        new paginator_1.PositionView(ctx)).render();
                }
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
            },
            disabled: {
                className: disabled_1.DISABLED
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