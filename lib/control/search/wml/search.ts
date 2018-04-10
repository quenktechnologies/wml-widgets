import * as ___wml from '@quenk/wml';
import {
    Search
} from '../';



export class Main extends ___wml.AppView < Search > {

    constructor(___context: Search) {

        super(___context);

        this.template = (___view: ___wml.AppView < Search > ) =>
            ___wml.node('input', {
                html: {
                    'class': ___context.values.root.class,
                    'onkeydown': ___context.values.root.onkeydown,
                    'onkeyup': ___context.values.root.onkeyup,
                    'oninput': ___context.values.root.oninput,
                    'onfocus': ___context.values.root.onfocus,
                    'placeholder': ___context.values.root.placeholder,
                    'readOnly': ___context.values.root.readOnly,
                    'value': ___context.values.root.value
                },
                wml: {
                    'id': ___context.values.root.id
                }
            }, [], ___view);

    }

}