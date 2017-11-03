import * as ___wml from '@quenk/wml';
import {
    Dash
} from '../Dash';



export class Main extends ___wml.AppView < Dash > {

    constructor(context: Dash) {

        super(context);

        this.template = (___context: Dash, ___view: ___wml.AppView < Dash > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [], ___view);

    }

}