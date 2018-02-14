import * as ___wml from '@quenk/wml';
import {
    Select
} from '@package/wml-widgets/control/select';;
import {
    TextField
} from '@package/wml-widgets/control/text-field';;
import {
    Date
} from '../Date';;
import {
    label,
    message
} from '@package/wml-widgets/control/wml';



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
            }, [___wml.widget(Select, {
                html: {},
                wml: {
                    'id': ___context.values.month.id
                },
                ww: {
                    'name': ___context.values.month.id,
                    'onChange': ___context.values.month.onInput,
                    'disabled': ___context.values.month.disabled,
                    'readOnly': ___context.values.month.readOnly,
                    'class': ___context.values.month.class,
                    'options': ___context.values.date.months
                }
            }, [___wml.node('option', {
                html: {
                    'selected': true,
                    'value': ``,
                    'disabled': true
                },
                wml: {}
            }, [___wml.text(`Month`)], ___view)], ___view), ___wml.widget(TextField, {
                html: {},
                wml: {
                    'id': ___context.values.day.id
                },
                ww: {
                    'name': ___context.values.day.id,
                    'onChange': ___context.values.day.onInput,
                    'value': ___context.values.day.value,
                    'disabled': ___context.values.day.disabled,
                    'readOnly': ___context.values.day.readOnly,
                    'class': ___context.values.day.class,
                    'placeholder': `DD`
                }
            }, [], ___view), ___wml.widget(TextField, {
                html: {},
                wml: {
                    'id': ___context.values.year.id
                },
                ww: {
                    'name': ___context.values.year.id,
                    'onChange': ___context.values.year.onInput,
                    'value': ___context.values.year.value,
                    'disabled': ___context.values.year.disabled,
                    'readOnly': ___context.values.year.readOnly,
                    'class': ___context.values.year.class,
                    'placeholder': `YYYY`
                }
            }, [], ___view), ___wml.domify(message(___context.values.help.id)(___context.values.help)(___view))], ___view)], ___view);

    }

}