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
var panel_1 = require("@package/self/layout/panel");
;
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(Grid_1.Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Grid_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'size': 4
                        }
                    }, [___wml.widget(panel_1.Panel, {
                            html: {},
                            wml: {}
                        }, [___wml.widget(panel_1.Body, {
                                html: {},
                                wml: {}
                            }, [___wml.text("Body only.")], ___view)], ___view)], ___view), ___wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'size': 4
                        }
                    }, [___wml.widget(panel_1.Panel, {
                            html: {},
                            wml: {}
                        }, [___wml.widget(panel_1.Header, {
                                html: {},
                                wml: {}
                            }, [___wml.text("With Header")], ___view), ___wml.widget(panel_1.Body, {
                                html: {},
                                wml: {}
                            }, [___wml.text("Lorem impsum dilium net set.")], ___view)], ___view)], ___view), ___wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'size': 4
                        }
                    }, [___wml.widget(panel_1.Panel, {
                            html: {},
                            wml: {}
                        }, [___wml.widget(panel_1.Header, {
                                html: {},
                                wml: {}
                            }, [___wml.text("With Footer")], ___view), ___wml.widget(panel_1.Body, {
                                html: {},
                                wml: {}
                            }, [___wml.text("Lorem impsum dilium net set.")], ___view), ___wml.widget(panel_1.Footer, {
                                html: {},
                                wml: {}
                            }, [___wml.text("Meh foot.")], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=panel.js.map