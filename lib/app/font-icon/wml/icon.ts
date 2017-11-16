import * as ___wml from '@quenk/wml';
import {
    FontIcon
} from '../FontIcon';



export class Main extends ___wml.AppView < FontIcon > {

    constructor(___context: FontIcon) {

        super(___context);

        this.template = (___view: ___wml.AppView < FontIcon > ) =>
            ___wml.node('span', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [], ___view);

    }

}