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
var page_example_1 = require("../../../page-example");
;
var checkbox_1 = require("../../../../../lib/control/checkbox");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(page_example_1.PageExample, {
                html: {},
                wml: {}
            }, [___wml.node('p', {
                    html: {},
                    wml: {}
                }, [___wml.text("The checkbox is "), ___wml.node('b', {
                        html: {},
                        wml: {
                            'id': "content"
                        }
                    }, [___wml.text("untouched")], ___view), ___wml.text(".")], ___view), ___wml.node('p', {
                    html: {},
                    wml: {}
                }, [___wml.widget(checkbox_1.Checkbox, {
                        html: {},
                        wml: {},
                        ww: {
                            'name': "checkbox",
                            'onChange': ___context.onChange
                        }
                    }, [], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=checkbox.js.map