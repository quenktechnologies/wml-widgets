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
var Aside_1 = require("@package/self/layout/aside/Aside");
;
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {
                    'id': ___context.values.id.root
                }
            }, [$wml.widget(Aside_1.Aside, {
                    html: {},
                    wml: {
                        'id': ___context.values.id.drawer
                    },
                    ww: {
                        'content': $wml.read("ww:drawer", ___context.attrs)
                    }
                }, [], ___view), $wml.ifthen(___context.content, function then() {
                    return $wml.domify(___context.content);
                }, function elseif() {
                    return $wml.ifthen($wml.read("ww:content", ___context.attrs), function then() {
                        return $wml.domify(___context.attrs.ww.content.render());
                    }, function else_clause() {
                        return $wml.domify(___context.children);
                    });
                })], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;
//# sourceMappingURL=drawer.js.map