import * as ___wml from '@quenk/wml';
import {
    Dash
} from '../Dash';



export class Main extends ___wml.AppView < Dash > {

    constructor(___context: Dash) {

        super(___context);

        this.template = (___view: ___wml.AppView < Dash > ) =>
            ___wml.node('span', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [], ___view);

    }

}