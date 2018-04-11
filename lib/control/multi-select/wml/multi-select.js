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
var ___wml = require("@quenk/wml");
var select_1 = require("../../select");
;
var stack_1 = require("../../stack");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.widget(select_1.Select, {
                    html: {},
                    wml: {
                        'id': ___context.values.search.id
                    },
                    ww: {
                        'name': ___context.values.search.name,
                        'value': ___context.values.search.value,
                        'stringifier': ___context.values.stack.decorator,
                        'onSearch': ___context.values.search.onSearch,
                        'onChange': ___context.values.search.onChange
                    }
                }, [], ___view), ___wml.widget(stack_1.Stack, {
                    html: {},
                    wml: {
                        'id': ___context.values.stack.id
                    },
                    ww: {
                        'name': ___context.values.stack.name,
                        'value': ___context.values.stack.value,
                        'decorator': ___context.values.stack.decorator,
                        'onChange': ___context.values.stack.onChange
                    }
                }, [], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=multi-select.js.map