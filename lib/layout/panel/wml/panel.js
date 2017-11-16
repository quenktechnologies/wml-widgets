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
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Panel;
}(___wml.AppView));
exports.Panel = Panel;
;
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Header;
}(___wml.AppView));
exports.Header = Header;
;
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Body;
}(___wml.AppView));
exports.Body = Body;
;
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Footer;
}(___wml.AppView));
exports.Footer = Footer;
//# sourceMappingURL=panel.js.map