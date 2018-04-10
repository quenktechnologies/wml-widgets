import * as ___wml from '@quenk/wml';
import {
    Close
} from '..';



export class Main extends ___wml.AppView < Close > {

    constructor(___context: Close) {

        super(___context);

        this.template = (___view: ___wml.AppView < Close > ) =>
            ___wml.node('span', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [], ___view);

    }

}