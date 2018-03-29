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
var link_1 = require("@package/wml-widgets/nav/link");
;
;
var Item_1 = require("../Item");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(Item_1.Item, {
                html: {},
                wml: {},
                ww: {
                    'class': ___context.values.item.class
                }
            }, [___wml.widget(link_1.Link, {
                    html: {},
                    wml: {},
                    ww: {
                        'class': ___context.values.a.class,
                        'name': ___context.values.a.name,
                        'title': ___context.values.a.title,
                        'href': ___context.values.a.href,
                        'text': ___context.values.a.text,
                        'active': ___context.values.a.active,
                        'onClick': ___context.values.a.onClick
                    }
                }, [___wml.domify(___context.children)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=link.js.map