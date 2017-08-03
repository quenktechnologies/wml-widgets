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
exports.__esModule = true;
var wml_runtime_1 = require("@quenk/wml-runtime");
var components_1 = require("@quenk/wml-widgets/lib/components");
var components_2 = require("@quenk/wml-widgets/lib/components");
var components_3 = require("@quenk/wml-widgets/lib/components");
var components_4 = require("@quenk/wml-widgets/lib/components");
var components_5 = require("@quenk/wml-widgets/lib/components");
var components_6 = require("@quenk/wml-widgets/lib/components");
var CreateDialog = (function (_super) {
    __extends(CreateDialog, _super);
    function CreateDialog(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.widget(components_5.Modal, {
                html: {},
                wml: {
                    'id': "modal"
                }
            }, [wml_runtime_1.widget(components_5.ModalHeader, {
                    html: {},
                    ww: {
                        'onClose': function function_literal_1(_) {
                            return this.dialog.ids.modal.close();
                        }.bind(this)
                    }
                }, [wml_runtime_1.text("\n      Create record\n    ")], view), wml_runtime_1.widget(components_5.ModalBody, {
                    html: {}
                }, [wml_runtime_1.widget(components_6.Input, {
                        html: {},
                        ww: {
                            'id': "name",
                            'label': "Name",
                            'onInput': function function_literal_2(e) {
                                return this.next.name = e.target.value;
                            }.bind(this)
                        }
                    }, [], view), wml_runtime_1.widget(components_6.Input, {
                        html: {},
                        ww: {
                            'id': "amount",
                            'label': "Amount",
                            'type': "number",
                            'onInput': function function_literal_3(e) {
                                return this.next.amount = Number(e.target.value);
                            }.bind(this)
                        }
                    }, [], view), wml_runtime_1.widget(components_6.Select, {
                        html: {},
                        ww: {
                            'id': "status",
                            'label': "Status",
                            'options': ['paid', 'overdue', 'history'],
                            'onInput': function function_literal_4(e) {
                                return this.next.status = e.target.value;
                            }.bind(this)
                        }
                    }, [], view), wml_runtime_1.node('span', {
                        html: {}
                    }, [wml_runtime_1.text(" Receive Notifications? ")], view), wml_runtime_1.widget(components_6.Switch, {
                        html: {},
                        ww: {
                            'onChange': function function_literal_5(e) {
                                return (e.target.value) ? this.next.watchers.push(1) : null;
                            }.bind(this)
                        }
                    }, [], view)], view), wml_runtime_1.widget(components_5.ModalFooter, {
                    html: {}
                }, [wml_runtime_1.widget(components_1.Button, {
                        html: {},
                        wml: {
                            'id': "cancelButton"
                        },
                        ww: {
                            'text': "Cancel",
                            'onClick': function function_literal_6(e) {
                                return this.dialog.ids.modal.close();
                            }.bind(this)
                        }
                    }, [], view), wml_runtime_1.widget(components_1.Button, {
                        html: {},
                        wml: {
                            'id': "saveButton"
                        },
                        ww: {
                            'style': "-danger",
                            'text': "Save",
                            'class': "-right",
                            'onClick': this.save.bind(this)
                        }
                    }, [], view)], view)], view);
        };
        return _this;
    }
    return CreateDialog;
}(wml_runtime_1.AppView));
exports.CreateDialog = CreateDialog;
function navigation(view) {
    return wml_runtime_1.box([wml_runtime_1.node('p', {
            html: {}
        }, [wml_runtime_1.text("This is in the drawer")], view)]);
}
exports.navigation = navigation;
function content(view) {
    return wml_runtime_1.box([wml_runtime_1.widget(components_1.ActionArea, {
            html: {},
            wml: {
                'id': "actions"
            }
        }, [wml_runtime_1.widget(components_1.MenuButton, {
                html: {},
                ww: {
                    'onClick': this.toggleDrawer.bind(this)
                }
            }, [], view), wml_runtime_1.widget(components_1.Button, {
                html: {},
                wml: {
                    'id': "createButton"
                },
                ww: {
                    'style': "-danger",
                    'text': "Create",
                    'class': "-right",
                    'onClick': this.create.bind(this)
                }
            }, [], view)], view), wml_runtime_1.widget(components_1.MainView, {
            html: {},
            wml: {
                'id': "main"
            }
        }, [wml_runtime_1.widget(components_2.Container, {
                html: {}
            }, [wml_runtime_1.widget(components_2.Row, {
                    html: {}
                }, [wml_runtime_1.widget(components_2.Column, {
                        html: {}
                    }, [wml_runtime_1.widget(components_4.Panel, {
                            html: {},
                            ww: {
                                'style': "-info"
                            }
                        }, [wml_runtime_1.widget(components_4.PanelHeader, {
                                html: {}
                            }, [wml_runtime_1.text("Details")], view), wml_runtime_1.widget(components_4.PanelBody, {
                                html: {}
                            }, [wml_runtime_1.text("Records:")], view), wml_runtime_1.widget(components_3.Table, {
                                html: {},
                                ww: {
                                    'fields': this.fields,
                                    'data': this.records,
                                    'model': this.tableModel
                                }
                            }, [], view), wml_runtime_1.widget(components_4.PanelFooter, {
                                html: {}
                            }, [this.records.reduce(function function_literal_7(p, c) {
                                    return p + c.amount;
                                }.bind(this), 0)], view)], view)], view)], view)], view)], view)]);
}
exports.content = content;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.widget(components_1.DrawerLayout, {
                html: {},
                wml: {
                    'id': "layout"
                },
                ww: {
                    'navigation': navigation,
                    'content': function function_literal_8(v) {
                        return content.call(this, v);
                    }.bind(this)
                }
            }, [], view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;
//# sourceMappingURL=view.js.map