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
var names = require("@package/self/common/names");
var views = require("./wml/search");
var wml = require("@quenk/wml");
var util_1 = require("@package/self/common/util");
var TermChangedEvent_1 = require("./TermChangedEvent");
var EscapeEvent_1 = require("./EscapeEvent");
var DefaultSearchDelegate_1 = require("./DefaultSearchDelegate");
var ResultSelectedEvent_1 = require("./ResultSelectedEvent");
exports.ESCAPE = 27;
exports.DEFAULT_DEBOUNCE_TIME = 500;
exports.INPUT_ID = 'input';
/**
 * debounce a function so that it is only called once after
 * a period of time.
 */
exports.debounce = function (f, delay) {
    var timer = null;
    return delay === 0 ? f : function (a) {
        if (!timer) {
            timer = setTimeout(function () { return f(a); }, delay);
        }
        else {
            clearTimeout(timer);
            timer = setTimeout(function () { return f(a); }, delay);
        }
    };
};
var _results = function () { return []; };
/**
 * Search control.
 */
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.defaultDelegate = new DefaultSearchDelegate_1.DefaultSearchDelegate(_this);
        _this.template = {
            populated: (_this.attrs.ww.populated) ?
                _this.attrs.ww.populated : views.populated,
            empty: (_this.attrs.ww.empty) ?
                _this.attrs.ww.empty : views.empty
        };
        _this.values = {
            id: {
                root: 'root',
                input: 'input',
                menu: 'menu'
            },
            class: {
                input: _this.attrs.ww.inputClass,
                root: util_1.concat(names.SEARCH, _this.attrs.ww.class)
            },
            input: {
                placeholder: _this.attrs.ww.placeholder ?
                    _this.attrs.ww.placeholder : null,
                onKeyDown: function (e) { return (e.keyCode !== exports.ESCAPE) ?
                    _this.execute(null) : null; },
                onKeyUp: function (e) {
                    var target = e.target;
                    if (e.keyCode === exports.ESCAPE) {
                        target.blur();
                        _this
                            .view
                            .findById(_this.values.id.menu)
                            .map(function (m) { return m.hide(); })
                            .map(function () { return _this.values.search.delegate.onEscape(new EscapeEvent_1.EscapeEvent()); });
                    }
                },
                onInput: function (e) {
                    //For compatability reasons
                    e.target.onkeydown = null;
                    _this.values.input.onKeyDown(e);
                }
            },
            search: {
                delegate: _this.attrs.ww.delegate ?
                    _this.attrs.ww.delegate : _this.defaultDelegate,
                delay: _this.attrs.ww.debounce ?
                    _this.attrs.ww.debounce : exports.DEFAULT_DEBOUNCE_TIME,
                results: _results()
            },
            item: {
                template: _this.template,
                decorator: _this.attrs.ww.decorator ?
                    _this.attrs.ww.decorator : function (a) { return a.toString(); },
                clicked: function (_a) {
                    var name = _a.name;
                    _this
                        .view
                        .findById(_this.values.id.menu)
                        .map(function (m) {
                        m.hide();
                        _this.values.search.delegate.onSelect(new ResultSelectedEvent_1.ResultSelectedEvent(_this.attrs.ww.name, _this.values.search.results[Number(name)]));
                    });
                }
            }
        };
        _this.execute = exports.debounce(function () {
            _this
                .view
                .findById(_this.values.id.input)
                .map(function (_a) {
                var value = _a.value;
                return _this.values.search.delegate.onChange(new TermChangedEvent_1.TermChangedEvent(_this.attrs.ww.name, value));
            });
        }, _this.values.search.delay);
        return _this;
    }
    /**
     * update the Search with new results.
     */
    Search.prototype.update = function (results) {
        var _this = this;
        this.values.search.results = results;
        this
            .view
            .findById(this.values.id.menu)
            .map(function (m) {
            return m.setContent(new views.Results(_this)).show();
        });
        return this;
    };
    Search.prototype.rendered = function () {
        document.addEventListener('click', this);
    };
    Search.prototype.handleEvent = function (e) {
        var _this = this;
        this
            .view
            .findById(this.values.id.root)
            .map(function (root) {
            if (!root.contains(e.target))
                _this
                    .view
                    .findById(_this.values.id.menu)
                    .cata(function () { }, function (m) { return m.hide(); });
            if (!document.body.contains(root))
                document.removeEventListener('click', _this);
        });
    };
    return Search;
}(wml.Component));
exports.Search = Search;
//# sourceMappingURL=Search.js.map