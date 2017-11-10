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
var list_group_1 = require("@package/self/layout/list-group");
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
                    }, [___wml.widget(list_group_1.ListGroup, {
                            html: {},
                            wml: {}
                        }, [___wml.widget(list_group_1.ListGroupItem, {
                                html: {},
                                wml: {}
                            }, [___wml.node('p', {
                                    html: {},
                                    wml: {}
                                }, [___wml.text("This is the first item.")], ___view)], ___view), ___wml.widget(list_group_1.ListGroupItem, {
                                html: {},
                                wml: {}
                            }, [___wml.node('b', {
                                    html: {},
                                    wml: {}
                                }, [___wml.text("This is the second item.")], ___view)], ___view), ___wml.widget(list_group_1.ListGroupItem, {
                                html: {},
                                wml: {}
                            }, [___wml.node('h3', {
                                    html: {},
                                    wml: {}
                                }, [___wml.text("Whoa!")], ___view), ___wml.node('p', {
                                    html: {},
                                    wml: {}
                                }, [___wml.text("This is a third item!")], ___view)], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=list-group.js.map