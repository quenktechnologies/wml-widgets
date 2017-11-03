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
var Grid_1 = require("@package/self/layout/grid/Grid");
;
var BreadCrumbs_1 = require("@package/self/nav/breadcrumbs/BreadCrumbs");
;
var Item_1 = require("@package/self/nav/breadcrumbs/Item");
;
var Link_1 = require("@package/self/nav/link/Link");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return ___wml.widget(Grid_1.Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Grid_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {}
                    }, [___wml.widget(BreadCrumbs_1.BreadCrumbs, {
                            html: {},
                            wml: {}
                        }, [___wml.widget(Item_1.Item, {
                                html: {},
                                wml: {}
                            }, [___wml.widget(Link_1.Link, {
                                    html: {},
                                    wml: {},
                                    ww: {
                                        'text': "One"
                                    }
                                }, [], ___view)], ___view), ___wml.widget(Item_1.Item, {
                                html: {},
                                wml: {}
                            }, [___wml.widget(Link_1.Link, {
                                    html: {},
                                    wml: {},
                                    ww: {
                                        'text': "Two"
                                    }
                                }, [], ___view)], ___view), ___wml.widget(Item_1.Item, {
                                html: {},
                                wml: {}
                            }, [___wml.widget(Link_1.Link, {
                                    html: {},
                                    wml: {},
                                    ww: {
                                        'text': "Three"
                                    }
                                }, [], ___view)], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=breadcrumbs.js.map