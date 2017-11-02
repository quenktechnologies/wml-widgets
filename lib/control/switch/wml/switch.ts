import * as $wml from '@quenk/wml';
import {
    Switch
} from '../Switch';



export class Main extends $wml.AppView < Switch > {

    constructor(context: Switch) {

        super(context);

        this.template = (___context: Switch, ___view: $wml.AppView < Switch > ) =>
            $wml.node('label', {
                html: {
                    'class': ___context.values.class.label
                },
                wml: {}
            }, [$wml.node('input', {
                html: {
                    'type': `checkbox`,
                    'name': ___context.values.input.name,
                    'checked': (___context.values.input.on || null),
                    'disabled': ___context.values.input.disabled,
                    'onchange': ___context.values.input.onChange
                },
                wml: {}
            }, [], ___view), $wml.node('div', {
                html: {
                    'class': ___context.values.class.slider
                },
                wml: {}
            }, [], ___view)], ___view);

    }

}