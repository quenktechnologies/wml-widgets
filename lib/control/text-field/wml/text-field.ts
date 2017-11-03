import * as ___wml from '@quenk/wml';
import * as T from '../TextField';;
import {
    label,
    message
} from '@package/self/control/wml';



export class Main extends ___wml.AppView < T.TextField > {

    constructor(context: T.TextField) {

        super(context);

        this.template = (___context: T.TextField, ___view: ___wml.AppView < T.TextField > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(label(___context.values.label.id, ___context.values.label.text)(___view)), ___wml.ifthen((___context.values.input.rows === 1), function then() {
                return ___wml.node('input', {
                    html: {
                        'name': ___context.values.input.name,
                        'type': ___context.values.input.type,
                        'placeholder': ___context.values.input.placeholder,
                        'oninput': ___context.values.input.onInput,
                        'value': ___context.values.input.value,
                        'disabled': ___context.values.input.disabled,
                        'readonly': ___context.values.input.readOnly,
                        'class': ___context.values.input.class
                    },
                    wml: {
                        'id': `input`
                    }
                }, [], ___view)
            }, function else_clause() {
                return ___wml.node('textarea', {
                    html: {
                        'name': ___context.values.input.name,
                        'placeholder': ___context.values.input.placeholder,
                        'oninput': ___context.values.input.onInput,
                        'disabled': ___context.values.input.disabled,
                        'readonly': ___context.values.input.readOnly,
                        'rows': ___context.values.input.rows,
                        'class': ___context.values.input.class
                    },
                    wml: {
                        'id': `input`
                    }
                }, [___wml.domify(___context.values.input.value)], ___view)
            }), ___wml.domify(message(___context.values.help.id, ___context.values.help)(___view))], ___view);

    }

}