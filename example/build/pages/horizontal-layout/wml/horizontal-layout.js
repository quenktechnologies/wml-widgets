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
var grid_1 = require("../../../../../lib/layout/grid");
;
var horizontal_layout_1 = require("../../../../../lib/layout/horizontal-layout");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(grid_1.Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(grid_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(grid_1.Column, {
                        html: {},
                        wml: {}
                    }, [___wml.widget(horizontal_layout_1.HorizontalLayout, {
                            html: {},
                            wml: {}
                        }, [___wml.node('textarea', {
                                html: {},
                                wml: {}
                            }, [___wml.text("Area 1")], ___view), ___wml.node('textarea', {
                                html: {},
                                wml: {}
                            }, [___wml.text("Area 2")], ___view), ___wml.node('textarea', {
                                html: {},
                                wml: {}
                            }, [___wml.text("Area 3")], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=horizontal-layout.js.map