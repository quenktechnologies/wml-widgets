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
;
var List_1 = require("@package/self/nav/list/List");
;
var Item_1 = require("@package/self/nav/list/Item");
;
var Link_1 = require("@package/self/nav/link/Link");
;
var Text_1 = require("@package/self/nav/list/Text");
var Navigation = /** @class */ (function (_super) {
    __extends(Navigation, _super);
    function Navigation(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.widget(List_1.List, {
                html: {},
                wml: {}
            }, [$wml.widget(Item_1.Item, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Link_1.Link, {
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
                    }, [], ___view)], ___view), $wml.widget(Item_1.Item, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Text_1.Text, {
                        html: {},
                        wml: {},
                        ww: {
                            'text': "Layout"
                        }
                    }, [], ___view), $wml.widget(List_1.List, {
                        html: {},
                        wml: {}
                    }, [$wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "panel",
                                    'href': "#/panel",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "panel"),
                                    'text': "Panels"
                                }
                            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Item_1.Item, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Text_1.Text, {
                        html: {},
                        wml: {},
                        ww: {
                            'text': "Table"
                        }
                    }, [], ___view), $wml.widget(List_1.List, {
                        html: {},
                        wml: {}
                    }, [$wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "table",
                                    'href': "#/table",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "table"),
                                    'text': "Table"
                                }
                            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Item_1.Item, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Text_1.Text, {
                        html: {},
                        wml: {},
                        ww: {
                            'text': "Control"
                        }
                    }, [], ___view), $wml.widget(List_1.List, {
                        html: {},
                        wml: {}
                    }, [$wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "text-field",
                                    'href': "#/text-field",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "text-field"),
                                    'text': "Text Field"
                                }
                            }, [], ___view)], ___view), $wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "date",
                                    'href': "#/date",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "date"),
                                    'text': "Date"
                                }
                            }, [], ___view)], ___view), $wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "select",
                                    'href': "#/select",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "select"),
                                    'text': "Select"
                                }
                            }, [], ___view)], ___view), $wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "autocomplete",
                                    'href': "#/autocomplete",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "autocomplete"),
                                    'text': "Autocomplete"
                                }
                            }, [], ___view)], ___view), $wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "button-select",
                                    'href': "#/button-select",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "button-select"),
                                    'text': "Button Select"
                                }
                            }, [], ___view)], ___view), $wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "checkbox",
                                    'href': "#/checkbox",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "checkbox"),
                                    'text': "Checkbox"
                                }
                            }, [], ___view)], ___view), $wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "switch",
                                    'href': "#/switch",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "switch"),
                                    'text': "Switch"
                                }
                            }, [], ___view)], ___view), $wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "tabs",
                                    'href': "#/tabs",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "tabs"),
                                    'text': "Tabs"
                                }
                            }, [], ___view)], ___view), $wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "stack",
                                    'href': "#/stack",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "stack"),
                                    'text': "Stack"
                                }
                            }, [], ___view)], ___view), $wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "search-stack",
                                    'href': "#/search-stack",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "search-stack"),
                                    'text': "Search Stack"
                                }
                            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Item_1.Item, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Text_1.Text, {
                        html: {},
                        wml: {},
                        ww: {
                            'text': "App"
                        }
                    }, [], ___view), $wml.widget(List_1.List, {
                        html: {},
                        wml: {}
                    }, [$wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "busy-indicator",
                                    'href': "#/busy-indicator",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "busy-indicator"),
                                    'text': "Busy Indicator"
                                }
                            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Item_1.Item, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Text_1.Text, {
                        html: {},
                        wml: {},
                        ww: {
                            'text': "Nav"
                        }
                    }, [], ___view), $wml.widget(List_1.List, {
                        html: {},
                        wml: {}
                    }, [$wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "breadcrumbs",
                                    'href': "#/breadcrumbs",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "breadcrumbs"),
                                    'text': "BreadCrumbs"
                                }
                            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Item_1.Item, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Text_1.Text, {
                        html: {},
                        wml: {},
                        ww: {
                            'text': "Menu"
                        }
                    }, [], ___view), $wml.widget(List_1.List, {
                        html: {},
                        wml: {}
                    }, [$wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "menu",
                                    'href': "#/menu",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "menu"),
                                    'text': "Menu"
                                }
                            }, [], ___view)], ___view), $wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    'group': "links"
                                },
                                ww: {
                                    'name': "button-menu",
                                    'href': "#/button-menu",
                                    'onClick': ___context.navigate,
                                    'active': (___context.page === "button-menu"),
                                    'text': "Button Menu"
                                }
                            }, [], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Navigation;
}($wml.AppView));
exports.Navigation = Navigation;
//# sourceMappingURL=navigation.js.map