import * as $wml from '@quenk/wml';
import {
    FontIcon
} from '../FontIcon';



export class Main extends $wml.AppView < FontIcon > {

    constructor(context: FontIcon) {

        super(context);

        this.template = (___context: FontIcon, ___view: $wml.AppView < FontIcon > ) =>
            $wml.node('span', {
                html: {
                    'class': ___context.values.class
                },
                wml: {}
            }, [], ___view);

    }

}