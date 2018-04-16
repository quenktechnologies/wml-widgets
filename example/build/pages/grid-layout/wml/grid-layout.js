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
var grid_layout_1 = require("../../../../../lib/layout/grid-layout");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(grid_layout_1.GridLayout, {
                html: {},
                wml: {},
                ww: {
                    'class': ___context.values.root.class
                }
            }, [___wml.widget(grid_layout_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 1
                        }
                    }, [___wml.text("Span 1")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 1
                        }
                    }, [___wml.text("Span 1")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 1
                        }
                    }, [___wml.text("Span 1")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 1
                        }
                    }, [___wml.text("Span 1")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 1
                        }
                    }, [___wml.text("Span 1")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 1
                        }
                    }, [___wml.text("Span 1")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 1
                        }
                    }, [___wml.text("Span 1")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 1
                        }
                    }, [___wml.text("Span 1")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 1
                        }
                    }, [___wml.text("Span 1")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 1
                        }
                    }, [___wml.text("Span 1")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 1
                        }
                    }, [___wml.text("Span 1")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 1
                        }
                    }, [___wml.text("Span 1")], ___view)], ___view), ___wml.widget(grid_layout_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 8
                        }
                    }, [___wml.text("Span 8")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 4
                        }
                    }, [___wml.text("Span 4")], ___view)], ___view), ___wml.widget(grid_layout_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 4
                        }
                    }, [___wml.text("Span 4")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 4
                        }
                    }, [___wml.text("Span 4")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 4
                        }
                    }, [___wml.text("Span 4")], ___view)], ___view), ___wml.widget(grid_layout_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 6
                        }
                    }, [___wml.text("Span 6")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 6
                        }
                    }, [___wml.text("Span 6")], ___view)], ___view), ___wml.widget(grid_layout_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 6
                        }
                    }, [___wml.text("Span 6")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 6
                        }
                    }, [___wml.text("Span 6")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 6
                        }
                    }, [___wml.text("Span 6")], ___view), ___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 6
                        }
                    }, [___wml.text("Span 6")], ___view)], ___view), ___wml.widget(grid_layout_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 12
                        }
                    }, [___wml.text("Span 12")], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=grid-layout.js.map