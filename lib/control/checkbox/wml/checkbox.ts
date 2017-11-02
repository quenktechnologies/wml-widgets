import * as $wml from '@quenk/wml';
import {
    Checkbox
} from '../Checkbox';



export class Main extends $wml.AppView < Checkbox > {

    constructor(context: Checkbox) {

        super(context);

        this.template = (___context: Checkbox, ___view: $wml.AppView < Checkbox > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.node('label', {
                html: {},
                wml: {}
            }, [$wml.node('input', {
                html: {
                    'type': `checkbox`,
                    'name': ___context.values.input.name,
                    'checked': (___context.values.input.checked || null),
                    'onchange': ___context.values.input.onChange
                },
                wml: {}
            }, [], ___view), $wml.domify(___context.children)], ___view)], ___view);

    }

}