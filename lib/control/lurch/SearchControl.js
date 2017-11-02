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
var util_1 = require("@package/self/common/util");
var TermChangedEvent_1 = require("./TermChangedEvent");
var SearchDefaultDelegate_1 = require("./SearchDefaultDelegate");
var control_1 = require("@package/self/control");
exports.ESCAPE = 27;
exports.DEFAULT_DEBOUNCE_TIME = 500;
exports.INPUT_ID = 'input';
/**
 * SearchControl
 */
var SearchControl = /** @class */ (function (_super) {
    __extends(SearchControl, _super);
    function SearchControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DEFAULT_DEBOUNCE_TIME = exports.DEFAULT_DEBOUNCE_TIME;
        _this.delegate = _this.attrs.ww.delegate ?
            _this.attrs.ww.delegate : new SearchDefaultDelegate_1.SearchDefaultDelegate(_this.attrs.ww);
        _this.results = [];
        _this.onKeyDown = function (e) { return (e.keyCode !== exports.ESCAPE) ? _this.execute(null) : null; };
        _this.onKeyUp = function (e) {
            var target = e.target;
            if (e.keyCode === exports.ESCAPE) {
                target.blur();
                _this.close();
            }
        };
        _this.onInput = function (e) {
            //For compatability reasons
            e.target.onkeydown = null;
            _this.onKeyDown(e);
        };
        _this.execute = util_1.debounce(function () {
            _this
                .view
                .findById(_this.values.input.id)
                .map(function (_a) {
                var value = _a.value;
                return _this.delegate.onSearch(new TermChangedEvent_1.TermChangedEvent(_this.attrs.ww.name, value));
            });
        }, _this.attrs.ww.debounce || _this.DEFAULT_DEBOUNCE_TIME);
        _this.stringify = function (v) { return String(v); };
        return _this;
    }
    SearchControl.prototype.rendered = function () {
        document.addEventListener('click', this);
    };
    SearchControl.prototype.handleEvent = function (e) {
        var _this = this;
        this
            .view
            .findById(this.values.id.root)
            .map(function (root) {
            if (!root.contains(e.target))
                _this.close();
            if (!document.body.contains(root))
                document.removeEventListener('click', _this);
        });
    };
    return SearchControl;
}(control_1.FormControl));
exports.SearchControl = SearchControl;
//# sourceMappingURL=SearchControl.js.map