import * as $wml from '@quenk/wml';
import * as T from '../TextField';;
import {
    label,
    message
} from '@package/self/control/wml';



export class Main extends $wml.AppView < T.TextField > {

    constructor(context: T.TextField) {

        super(context);

        this.template = (___context: T.TextField, ___view: $wml.AppView < T.TextField > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [$wml.domify(label($wml.read < string > (`ww:id`, ___context.attrs), $wml.read < string > (`ww:label`, ___context.attrs))(___view)), $wml.ifthen((___context.values.input.rows === 1), function then() {
                return $wml.node('input', {
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
                return $wml.node('textarea', {
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
                }, [$wml.domify(___context.values.input.value)], ___view)
            }), $wml.domify(message(___context.values.help.id, ___context.values.help)(___view))], ___view);

    }

}