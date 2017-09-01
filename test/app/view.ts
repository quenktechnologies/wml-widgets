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
    domify as $$domify,
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
import {
    Next
} from './app';



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
                wml: {},
                ww: {
                    'onClose': function function_literal_1() {
                        return this.dialog.ids.modal.close();
                    }.bind(this)
                }
            }, [$$text(`
      Create record
    `)], view), $$widget(ModalBody, {
                html: {},
                wml: {}
            }, [$$widget(Input, {
                html: {},
                wml: {},
                ww: {
                    'id': "name",
                    'label': "Name",
                    'onInput': function function_literal_2(e: Event) {
                        return this.next.name = ( < HTMLInputElement > e.target).value;
                    }.bind(this)
                }
            }, [], view), $$widget(Input, {
                html: {},
                wml: {},
                ww: {
                    'id': "amount",
                    'label': "Amount",
                    'type': "number",
                    'onInput': function function_literal_3(e: Event) {
                        return this.next.amount = Number(( < HTMLInputElement > e.target).value);
                    }.bind(this)
                }
            }, [], view), $$widget(Select, {
                html: {},
                wml: {},
                ww: {
                    'id': "status",
                    'label': "Status",
                    'options': ['paid', 'overdue', 'history'],
                    'onInput': function function_literal_4(e: Event) {
                        return this.next.status = ( < HTMLInputElement > e.target).value;
                    }.bind(this)
                }
            }, [], view), $$node('span', {
                html: {},
                wml: {}
            }, [$$text(` Receive Notifications? `)], view), $$widget(Switch, {
                html: {},
                wml: {},
                ww: {
                    'onChange': function function_literal_5(e: Event) {
                        return (( < HTMLInputElement > e.target).value) ? this.next.watchers.push(1) : null;
                    }.bind(this)
                }
            }, [], view)], view), $$widget(ModalFooter, {
                html: {},
                wml: {}
            }, [$$widget(Button, {
                html: {},
                wml: {
                    'id': "cancelButton"
                },
                ww: {
                    'text': "Cancel",
                    'onClick': function function_literal_6() {
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
    return $$node('p', {
        html: {},
        wml: {}
    }, [$$text(`This is in the drawer`)], view);
}
export function content < Z > (view: AppView < Z > ) {
    return $$box($$widget(ActionArea, {
        html: {},
        wml: {
            'id': "actions"
        }
    }, [$$widget(MenuButton, {
        html: {},
        wml: {},
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
    }, [], view), $$widget(Button, {
        html: {},
        wml: {
            'id': "disabledButton"
        },
        ww: {
            'style': "-default",
            'text': "Disabled",
            'class': "-right",
            'disabled': true
        }
    }, [], view)], view), $$widget(MainView, {
        html: {},
        wml: {
            'id': "main"
        }
    }, [$$widget(Container, {
        html: {},
        wml: {}
    }, [$$widget(Row, {
        html: {},
        wml: {}
    }, [$$widget(Column, {
        html: {},
        wml: {}
    }, [$$widget(Panel, {
        html: {},
        wml: {},
        ww: {
            'style': "-info"
        }
    }, [$$widget(PanelHeader, {
        html: {},
        wml: {}
    }, [$$text(`Details`)], view), $$widget(PanelBody, {
        html: {},
        wml: {}
    }, [$$text(`Records:`)], view), $$widget(Table, {
        html: {},
        wml: {},
        ww: {
            'fields': this.fields,
            'data': this.records,
            'model': this.tableModel
        }
    }, [], view), $$widget(PanelFooter, {
        html: {},
        wml: {}
    }, [$$domify(this.records.reduce(function function_literal_7(p: number, c: Next) {
        return p + c.amount;
    }.bind(this), 0))], view)], view)], view)], view)], view)], view));
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
                    'drawer': navigation,
                    'content': content.bind(this)
                }
            }, [], view)
        }

    }

}