import * as ___wml from '@quenk/wml';
import * as T from '../TextField';;
import {
    label,
    message
} from '@package/wml-widgets/control/wml';

export {
    label,
    message
}
from '@package/wml-widgets/control/wml';;
export const input = (___context: T.TextField) => (___view: ___wml.View) => ___wml.node('input', {
    html: {
        'name': ___context.values.control.name,
        'type': ___context.values.control.type,
        'focus': ___context.values.control.focus,
        'placeholder': ___context.values.control.placeholder,
        'oninput': ___context.values.control.oninput,
        'value': ___context.values.control.value,
        'disabled': ___context.values.control.disabled,
        'readonly': ___context.values.control.readOnly,
        'class': ___context.values.control.class
    },
    wml: {
        'id': `control`
    }
}, [], ___view);;
export const textarea = (___context: T.TextField) => (___view: ___wml.View) => ___wml.node('textarea', {
    html: {
        'name': ___context.values.control.name,
        'placeholder': ___context.values.control.placeholder,
        'oninput': ___context.values.control.oninput,
        'disabled': ___context.values.control.disabled,
        'readonly': ___context.values.control.readOnly,
        'rows': ___context.values.control.rows,
        'class': ___context.values.control.class
    },
    wml: {
        'id': `control`
    }
}, [___wml.domify(___context.values.control.value)], ___view);;
export const control = (___context: T.TextField) => (___view: ___wml.View) => ((___context.values.control.rows === 1)) ? ___wml.domify(input(___context)(___view)) : ___wml.domify(textarea(___context)(___view));;
export const group = (___context: T.TextField) => (___view: ___wml.View) => ___wml.box(___wml.domify(label(___context.values.label.id)(___context.values.label.text)(___view)), ___wml.domify(control(___context)(___view)), ___wml.domify(message(___context.values.help.id)(___context.values.help)(___view)));

export class Main extends ___wml.AppView < T.TextField > {

    constructor(___context: T.TextField) {

        super(___context);

        this.template = (___view: ___wml.AppView < T.TextField > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {
                    'id': ___context.values.root.id
                }
            }, [___wml.domify(___context.values.control.template(___context)(___view))], ___view);

    }

}