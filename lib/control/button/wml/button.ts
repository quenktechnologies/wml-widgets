import * as ___wml from '@quenk/wml';
import {
    Button
} from '../';



export class Main extends ___wml.AppView < Button > {

    constructor(___context: Button) {

        super(___context);

        this.template = (___view: ___wml.AppView < Button > ) =>
            ___wml.node('button', {
                html: {
                    'id': ___context.values.button.id,
                    'type': ___context.values.button.type,
                    'name': ___context.values.button.name,
                    'disabled': ___context.values.button.disabled,
                    'class': ___context.values.button.class,
                    'onclick': ___context.values.button.onclick
                },
                wml: {
                    'id': ___context.values.button.id
                }
            }, [___wml.domify(___context.values.button.text), ___wml.domify(___context.children)], ___view);

    }

}