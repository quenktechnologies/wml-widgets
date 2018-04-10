import * as ___wml from '@quenk/wml';
import {
    Caret
} from '../';



export class Main extends ___wml.AppView < Caret > {

    constructor(___context: Caret) {

        super(___context);

        this.template = (___view: ___wml.AppView < Caret > ) =>
            ___wml.node('span', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [], ___view);

    }

}