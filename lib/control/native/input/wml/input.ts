import * as ___wml from '@quenk/wml';
import {
    Input
} from '../';



export class Main extends ___wml.AppView < Input > {

    constructor(___context: Input) {

        super(___context);

        this.template = (___view: ___wml.AppView < Input > ) =>
            ___wml.node('input', {
                html: {
                    'name': ___context.values.name,
                    'type': ___context.values.type,
                    'placeholder': ___context.values.placeholder,
                    'oninput': ___context.values.oninput,
                    'value': ___context.values.value,
                    'disabled': ___context.values.disabled,
                    'readonly': ___context.values.readOnly,
                    'class': ___context.values.className
                },
                wml: {}
            }, [], ___view);

    }

}