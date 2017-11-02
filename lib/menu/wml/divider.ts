import * as $wml from '@quenk/wml';
import {
    Divider
} from '../Divider';



export class Main extends $wml.AppView < Divider > {

    constructor(context: Divider) {

        super(context);

        this.template = (___context: Divider, ___view: $wml.AppView < Divider > ) =>
            $wml.node('li', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [], ___view);

    }

}