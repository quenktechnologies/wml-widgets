import * as ___wml from '@quenk/wml';
import {
    MenuItem
} from '../MenuItem';



export class Main extends ___wml.AppView < MenuItem > {

    constructor(context: MenuItem) {

        super(context);

        this.template = (___context: MenuItem, ___view: ___wml.AppView < MenuItem > ) =>
            ___wml.node('li', {
                html: {
                    'class': ___context.values.class.root,
                    'onclick': ___context.values.clicked
                },
                wml: {}
            }, [(___context.values.text) ? ___wml.domify(___context.values.text) : ___wml.domify(___context.children)], ___view);

    }

}