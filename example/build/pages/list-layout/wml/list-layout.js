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
var list_layout_1 = require("../../../../../lib/layout/list-layout");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(page_example_1.PageExample, {
                html: {},
                wml: {}
            }, [___wml.widget(list_layout_1.ListLayout, {
                    html: {},
                    wml: {}
                }, [___wml.widget(list_layout_1.ListLayoutItem, {
                        html: {},
                        wml: {}
                    }, [___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.text("This is the first item.")], ___view)], ___view), ___wml.widget(list_layout_1.ListLayoutItem, {
                        html: {},
                        wml: {}
                    }, [___wml.node('b', {
                            html: {},
                            wml: {}
                        }, [___wml.text("This is the second item.")], ___view)], ___view), ___wml.widget(list_layout_1.ListLayoutItem, {
                        html: {},
                        wml: {}
                    }, [___wml.node('h3', {
                            html: {},
                            wml: {}
                        }, [___wml.text("Whoa!")], ___view), ___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.text("This is a third item!")], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=list-layout.js.map