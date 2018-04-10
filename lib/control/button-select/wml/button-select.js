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
var button_group_1 = require("../../button-group");
;
var button_1 = require("../../button");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(button_group_1.ButtonGroup, {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.map(___context.values.buttons.options, function _map(opt) {
                    return ___wml.widget(button_1.Button, {
                        html: {},
                        wml: {},
                        ww: {
                            'class': ___context.values.buttons.getClass(opt),
                            'active': ___context.values.buttons.isActive(opt.value),
                            'onClick': function () { return ___context.values.buttons.click(opt.value); },
                            'text': opt.title
                        }
                    }, [], ___view);
                }, function otherwise() {
                    return document.createDocumentFragment();
                })], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=button-select.js.map