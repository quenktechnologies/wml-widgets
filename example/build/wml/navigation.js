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
var $wml = require("@quenk/wml");
;
var List_1 = require("@package/self/nav/list/List");
;
var Item_1 = require("@package/self/nav/list/Item");
;
var Link_1 = require("@package/self/nav/link/Link");
;
var Text_1 = require("@package/self/nav/list/Text");
var Navigation = /** @class */ (function (_super) {
    __extends(Navigation, _super);
    function Navigation(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.widget(List_1.List, {
                html: {},
                wml: {}
            }, [$wml.widget(Item_1.Item, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Link_1.Link, {
                        html: {},
                        wml: {
                            group: "links"
                        },
                        ww: {
                            active: (___context.page === "home"),
                            name: "home",
                            onClick: ___context.navigate,
                            text: "Home"
                        }
                    }, [], ___view)], ___view), $wml.widget(Item_1.Item, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Text_1.Text, {
                        html: {},
                        wml: {},
                        ww: {
                            text: "Layout"
                        }
                    }, [], ___view), $wml.widget(List_1.List, {
                        html: {},
                        wml: {}
                    }, [$wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    group: "links"
                                },
                                ww: {
                                    name: "panels",
                                    onClick: ___context.navigate,
                                    active: (___context.page === "panels"),
                                    text: "Panels"
                                }
                            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Item_1.Item, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Link_1.Link, {
                        html: {},
                        wml: {
                            group: "links"
                        },
                        ww: {
                            name: "tables",
                            onClick: ___context.navigate,
                            active: (___context.page === "tables"),
                            text: "Tables"
                        }
                    }, [], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Navigation;
}($wml.AppView));
exports.Navigation = Navigation;
//# sourceMappingURL=navigation.js.map