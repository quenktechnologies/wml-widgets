import * as ___wml from '@quenk/wml';
import {
    Checkbox
} from '../Checkbox';



export class Main extends ___wml.AppView < Checkbox > {

    constructor(context: Checkbox) {

        super(context);

        this.template = (___context: Checkbox, ___view: ___wml.AppView < Checkbox > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.node('label', {
                html: {},
                wml: {}
            }, [___wml.node('input', {
                html: {
                    'type': `checkbox`,
                    'name': ___context.values.input.name,
                    'checked': (___context.values.input.checked || null),
                    'onchange': ___context.values.input.onChange
                },
                wml: {}
            }, [], ___view), ___wml.domify(___context.children)], ___view)], ___view);

    }

}