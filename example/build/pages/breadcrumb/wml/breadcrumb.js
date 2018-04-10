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
var breadcrumb_1 = require("../../../../../lib/content/nav/breadcrumb");
;
var link_1 = require("../../../../../lib/content/nav/link");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(page_example_1.PageExample, {
                html: {},
                wml: {}
            }, [___wml.widget(breadcrumb_1.Breadcrumb, {
                    html: {},
                    wml: {}
                }, [___wml.widget(breadcrumb_1.Item, {
                        html: {},
                        wml: {}
                    }, [___wml.widget(link_1.Link, {
                            html: {},
                            wml: {},
                            ww: {
                                'text': "One"
                            }
                        }, [], ___view)], ___view), ___wml.widget(breadcrumb_1.Item, {
                        html: {},
                        wml: {}
                    }, [___wml.widget(link_1.Link, {
                            html: {},
                            wml: {},
                            ww: {
                                'text': "Two"
                            }
                        }, [], ___view)], ___view), ___wml.widget(breadcrumb_1.Item, {
                        html: {},
                        wml: {}
                    }, [___wml.widget(link_1.Link, {
                            html: {},
                            wml: {},
                            ww: {
                                'text': "Three"
                            }
                        }, [], ___view)], ___view), ___wml.widget(breadcrumb_1.Item, {
                        html: {},
                        wml: {},
                        ww: {
                            'active': true
                        }
                    }, [___wml.text("\n\n\tFour\n\n     ")], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=breadcrumb.js.map