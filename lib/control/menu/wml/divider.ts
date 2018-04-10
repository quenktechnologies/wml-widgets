import * as ___wml from '@quenk/wml';
import {
    Divider
} from '../';



export class Main extends ___wml.AppView < Divider > {

    constructor(___context: Divider) {

        super(___context);

        this.template = (___view: ___wml.AppView < Divider > ) =>
            ___wml.node('li', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [], ___view);

    }

}