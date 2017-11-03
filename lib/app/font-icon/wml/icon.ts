import * as ___wml from '@quenk/wml';
import {
    FontIcon
} from '../FontIcon';



export class Main extends ___wml.AppView < FontIcon > {

    constructor(context: FontIcon) {

        super(context);

        this.template = (___context: FontIcon, ___view: ___wml.AppView < FontIcon > ) =>
            ___wml.node('span', {
                html: {
                    'class': ___context.values.class
                },
                wml: {}
            }, [], ___view);

    }

}