import * as ___wml from '@quenk/wml';
import {
    ActivityIndicator
} from '..';



export class Main extends ___wml.AppView < ActivityIndicator > {

    constructor(___context: ActivityIndicator) {

        super(___context);

        this.template = (___view: ___wml.AppView < ActivityIndicator > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [], ___view);

    }

}