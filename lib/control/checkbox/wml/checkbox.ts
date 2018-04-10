import * as ___wml from '@quenk/wml';
import {
    Checkbox
} from '../';



export class Main extends ___wml.AppView < Checkbox > {

    constructor(___context: Checkbox) {

        super(___context);

        this.template = (___view: ___wml.AppView < Checkbox > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.node('label', {
                html: {},
                wml: {}
            }, [___wml.node('input', {
                html: {
                    'type': `checkbox`,
                    'name': ___context.values.input.name,
                    'checked': ___context.values.input.value,
                    'onchange': ___context.values.input.onChange
                },
                wml: {}
            }, [], ___view), ___wml.domify(___context.children)], ___view)], ___view);

    }

}