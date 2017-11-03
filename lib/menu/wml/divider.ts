import * as ___wml from '@quenk/wml';
import {
    Divider
} from '../Divider';



export class Main extends ___wml.AppView < Divider > {

    constructor(context: Divider) {

        super(context);

        this.template = (___context: Divider, ___view: ___wml.AppView < Divider > ) =>
            ___wml.node('li', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [], ___view);

    }

}