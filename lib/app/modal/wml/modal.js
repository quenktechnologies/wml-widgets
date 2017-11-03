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
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root,
                    'tabindex': "-1",
                    'role': "dialog"
                },
                wml: {
                    'id': ___context.values.id.root
                }
            }, [___wml.node('div', {
                    html: {
                        'class': ___context.values.class.dialog,
                        'role': "document"
                    },
                    wml: {}
                }, [___wml.node('div', {
                        html: {
                            'class': ___context.values.class.content
                        },
                        wml: {
                            'id': ___context.values.id.content
                        }
                    }, [___wml.domify(___context.children)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Modal;
}(___wml.AppView));
exports.Modal = Modal;
;
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children), ___wml.node('button', {
                    html: {
                        'type': "button",
                        'class': "close",
                        'aria-label': "Close"
                    },
                    wml: {}
                }, [___wml.node('span', {
                        html: {
                            'aria-hidden': "true"
                        },
                        wml: {}
                    }, [___wml.text("\u00D7")], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Header;
}(___wml.AppView));
exports.Header = Header;
;
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
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
    function Footer(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
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
//# sourceMappingURL=modal.js.map