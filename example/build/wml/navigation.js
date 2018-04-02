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
;
var nav_1 = require("../../../lib/content/nav");
;
var item_1 = require("../../../lib/content/nav/item");
;
var nav_header_1 = require("../../../lib/content/nav/nav-header");
;
var link_1 = require("../../../lib/content/nav/link");
var Navigation = /** @class */ (function (_super) {
    __extends(Navigation, _super);
    function Navigation(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(nav_1.Nav, {
                html: {},
                wml: {},
                ww: {
                    'vertical': true
                }
            }, [___wml.widget(item_1.Item, {
                    html: {},
                    wml: {}
                }, [___wml.widget(link_1.Link, {
                        html: {},
                        wml: {
                            'group': "links"
                        },
                        ww: {
                            'active': (___context.page === "home"),
                            'name': "home",
                            'href': "#",
                            'onClick': ___context.navigate,
                            'text': "Home"
                        }
                    }, [], ___view)], ___view), ___wml.map(___context.links, function _map(items, section) {
                    return ___wml.widget(item_1.Item, {
                        html: {},
                        wml: {}
                    }, [___wml.widget(nav_header_1.NavHeader, {
                            html: {},
                            wml: {},
                            ww: {
                                'text': ___context.displayName(section)
                            }
                        }, [], ___view), ___wml.widget(nav_1.Nav, {
                            html: {},
                            wml: {},
                            ww: {
                                'vertical': true
                            }
                        }, [___wml.map(___context.sort(items), function _map(_, name) {
                                return ___wml.widget(item_1.Item, {
                                    html: {},
                                    wml: {}
                                }, [___wml.widget(link_1.Link, {
                                        html: {},
                                        wml: {
                                            'group': "links"
                                        },
                                        ww: {
                                            'name': name,
                                            'href': "#/" + name,
                                            'onClick': ___context.navigate,
                                            'active': (___context.page === "" + name),
                                            'text': ___context.displayName(name)
                                        }
                                    }, [], ___view)], ___view);
                            }, function otherwise() {
                                return document.createDocumentFragment();
                            })], ___view)], ___view);
                }, function otherwise() {
                    return document.createDocumentFragment();
                })], ___view);
        };
        return _this;
    }
    return Navigation;
}(___wml.AppView));
exports.Navigation = Navigation;
//# sourceMappingURL=navigation.js.map