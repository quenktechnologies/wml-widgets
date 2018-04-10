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
var nav_1 = require("../../../../../lib/content/nav");
;
var item_1 = require("../../../../../lib/content/nav/item");
;
var link_1 = require("../../../../../lib/content/nav/link");
;
var page_example_1 = require("../../../page-example");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(page_example_1.PageExample, {
                html: {},
                wml: {}
            }, [___wml.widget(nav_1.Nav, {
                    html: {},
                    wml: {}
                }, [___wml.map(___context.links, function _map(_, key) {
                        return ___wml.widget(item_1.Item, {
                            html: {},
                            wml: {}
                        }, [___wml.widget(link_1.Link, {
                                html: {},
                                wml: {
                                    'id': key,
                                    'group': "links"
                                },
                                ww: {
                                    'name': key,
                                    'onClick': ___context.navigate,
                                    'text': key
                                }
                            }, [], ___view)], ___view);
                    }, function otherwise() {
                        return document.createDocumentFragment();
                    })], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=nav.js.map