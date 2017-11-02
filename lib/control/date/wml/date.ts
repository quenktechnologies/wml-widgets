import * as $wml from '@quenk/wml';
import {
    label,
    message
} from '@package/self/control/wml';;
import {
    Select
} from '@package/self/control/select';;
import {
    TextField
} from '@package/self/control/text-field';;
import {
    Date
} from '../Date';



export class Main extends $wml.AppView < Date > {

    constructor(context: Date) {

        super(context);

        this.template = (___context: Date, ___view: $wml.AppView < Date > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [$wml.domify(label($wml.read < string > (`ww:id`, ___context.attrs), $wml.read < string > (`ww:label`, ___context.attrs))(___view)), $wml.widget(Select, {
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
            }, [$wml.node('option', {
                html: {
                    'selected': true,
                    'value': ``,
                    'disabled': true
                },
                wml: {}
            }, [$wml.text(`Month`)], ___view)], ___view), $wml.widget(TextField, {
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
            }, [], ___view), $wml.widget(TextField, {
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
            }, [], ___view), $wml.domify(message(___context.values.help.id, ___context.values.help)(___view))], ___view);

    }

}