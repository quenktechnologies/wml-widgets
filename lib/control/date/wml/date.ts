import * as ___wml from '@quenk/wml';
import {
    label,
    message
} from '../../wml';;
import {
    Date
} from '../';



export class Main extends ___wml.AppView < Date > {

    constructor(___context: Date) {

        super(___context);

        this.template = (___view: ___wml.AppView < Date > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(label(___context.values.label.id)(___context.values.label.text)(___view)), ___wml.node('div', {
                html: {
                    'class': ___context.values.inline.class
                },
                wml: {}
            }, [___wml.node('select', {
                html: {
                    'name': ___context.values.month.id,
                    'onchange': ___context.values.month.onchange,
                    'disabled': ___context.values.month.disabled,
                    'class': ___context.values.month.class
                },
                wml: {
                    'id': ___context.values.month.id
                }
            }, [___wml.node('option', {
                html: {
                    'selected': true,
                    'value': ``,
                    'disabled': true
                },
                wml: {}
            }, [___wml.text(`Month`)], ___view), ___wml.map(___context.values.date.months, function _map(opt) {
                return ___wml.node('option', {
                    html: {
                        'value': opt.value
                    },
                    wml: {}
                }, [___wml.domify(opt.label)], ___view)
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view), ___wml.node('input', {
                html: {
                    'name': ___context.values.day.id,
                    'oninput': ___context.values.day.oninput,
                    'onkeyup': ___context.values.day.onkeyup,
                    'value': ___context.values.day.value(),
                    'disabled': ___context.values.day.disabled,
                    'class': ___context.values.day.class,
                    'size': `2`,
                    'placeholder': `DD`
                },
                wml: {
                    'id': ___context.values.day.id
                }
            }, [], ___view), ___wml.node('input', {
                html: {
                    'name': ___context.values.year.id,
                    'oninput': ___context.values.year.oninput,
                    'onkeyup': ___context.values.year.onkeyup,
                    'value': ___context.values.year.value(),
                    'disabled': ___context.values.year.disabled,
                    'class': ___context.values.year.class,
                    'placeholder': `YYYY`,
                    'size': `4`
                },
                wml: {
                    'id': ___context.values.year.id
                }
            }, [], ___view), ___wml.domify(message(___context.values.messages.id)(___context.values.messages)(___view))], ___view)], ___view);

    }

}