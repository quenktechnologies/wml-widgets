import * as $wml from '@quenk/wml';
import {
    Dash
} from '../Dash';



export class Main extends $wml.AppView < Dash > {

    constructor(context: Dash) {

        super(context);

        this.template = (___context: Dash, ___view: $wml.AppView < Dash > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [], ___view);

    }

}