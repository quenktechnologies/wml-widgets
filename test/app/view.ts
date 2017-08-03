import {
    empty as $$empty,
    box as $$box,
    resolve as $$resolve,
    text as $$text,
    node as $$node,
    widget as $$widget,
    ifE as $$if,
    forE as $$for,
    switchE as $$switch,
    AppView
} from "@quenk/wml-runtime";

import {
    DrawerLayout,
    ActionArea,
    MainView,
    MenuButton,
    Button
} from '@quenk/wml-widgets/lib/components';
import {
    Container,
    Column,
    Row
} from '@quenk/wml-widgets/lib/components';
import {
    Table
} from '@quenk/wml-widgets/lib/components';
import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter
} from '@quenk/wml-widgets/lib/components';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from '@quenk/wml-widgets/lib/components';
import {
    Input,
    Select,
    Switch
} from '@quenk/wml-widgets/lib/components';



export class CreateDialog < C > extends AppView < C > {

    constructor(context: C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$widget(Modal, {
                html: {},
                wml: {
                    'id': "modal"
                }
            }, [$$widget(ModalHeader, {
                html: {},
                ww: {
                    'onClose': function function_literal_1(_) {
                        return this.dialog.ids.modal.close();
                    }.bind(this)
                }
            }, [$$text(`
      Create record
    `)], view), $$widget(ModalBody, {
                html: {}
            }, [$$widget(Input, {
                html: {},
                ww: {
                    'id': "name",
                    'label': "Name",
                    'onInput': function function_literal_2(e) {
                        return this.next.name = e.target.value;
                    }.bind(this)
                }
            }, [], view), $$widget(Input, {
                html: {},
                ww: {
                    'id': "amount",
                    'label': "Amount",
                    'type': "number",
                    'onInput': function function_literal_3(e) {
                        return this.next.amount = Number(e.target.value);
                    }.bind(this)
                }
            }, [], view), $$widget(Select, {
                html: {},
                ww: {
                    'id': "status",
                    'label': "Status",
                    'options': ['paid', 'overdue', 'history'],
                    'onInput': function function_literal_4(e) {
                        return this.next.status = e.target.value;
                    }.bind(this)
                }
            }, [], view), $$node('span', {
                html: {}
            }, [$$text(` Receive Notifications? `)], view), $$widget(Switch, {
                html: {},
                ww: {
                    'onChange': function function_literal_5(e) {
                        return (e.target.value) ? this.next.watchers.push(1) : null;
                    }.bind(this)
                }
            }, [], view)], view), $$widget(ModalFooter, {
                html: {}
            }, [$$widget(Button, {
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
            }, [], view), $$widget(Button, {
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
            }, [], view)], view)], view)
        }

    }

}


export function navigation < Z > (view: AppView < Z > ) {
    return $$box([$$node('p', {
        html: {}
    }, [$$text(`This is in the drawer`)], view)]);
}

export function content < Z > (view: AppView < Z > ) {
    return $$box([$$widget(ActionArea, {
        html: {},
        wml: {
            'id': "actions"
        }
    }, [$$widget(MenuButton, {
        html: {},
        ww: {
            'onClick': this.toggleDrawer.bind(this)
        }
    }, [], view), $$widget(Button, {
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
    }, [], view)], view), $$widget(MainView, {
        html: {},
        wml: {
            'id': "main"
        }
    }, [$$widget(Container, {
        html: {}
    }, [$$widget(Row, {
        html: {}
    }, [$$widget(Column, {
        html: {}
    }, [$$widget(Panel, {
        html: {},
        ww: {
            'style': "-info"
        }
    }, [$$widget(PanelHeader, {
        html: {}
    }, [$$text(`Details`)], view), $$widget(PanelBody, {
        html: {}
    }, [$$text(`Records:`)], view), $$widget(Table, {
        html: {},
        ww: {
            'fields': this.fields,
            'data': this.records,
            'model': this.tableModel
        }
    }, [], view), $$widget(PanelFooter, {
        html: {}
    }, [this.records.reduce(function function_literal_7(p, c) {
        return p + c.amount;
    }.bind(this), 0)], view)], view)], view)], view)], view)], view)]);
}


export class Main < C > extends AppView < C > {

    constructor(context: C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$widget(DrawerLayout, {
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
            }, [], view)
        }

    }

}