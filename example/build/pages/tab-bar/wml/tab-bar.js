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
var tab_bar_1 = require("../../../../../lib/control/tab-bar");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(page_example_1.PageExample, {
                html: {},
                wml: {}
            }, [___wml.widget(tab_bar_1.TabBar, {
                    html: {},
                    wml: {}
                }, [___wml.widget(tab_bar_1.Tab, {
                        html: {},
                        wml: {},
                        ww: {
                            'active': (___context.tab === "First"),
                            'text': "First",
                            'name': "First",
                            'onClick': ___context.clicked
                        }
                    }, [], ___view), ___wml.widget(tab_bar_1.Tab, {
                        html: {},
                        wml: {},
                        ww: {
                            'active': (___context.tab === "Second"),
                            'text': "Second",
                            'name': "Second",
                            'onClick': ___context.clicked
                        }
                    }, [], ___view), ___wml.widget(tab_bar_1.Tab, {
                        html: {},
                        wml: {},
                        ww: {
                            'active': (___context.tab === "Third"),
                            'text': "Third",
                            'name': "Third",
                            'onClick': ___context.clicked
                        }
                    }, [], ___view)], ___view), ___wml.node('p', {
                    html: {},
                    wml: {
                        'id': "content"
                    }
                }, [___wml.domify(___context.content)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=tab-bar.js.map