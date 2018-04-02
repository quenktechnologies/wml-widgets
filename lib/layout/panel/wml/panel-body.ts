import * as ___wml from '@quenk/wml';
import {
    PanelBody
} from '..';



export class Main extends ___wml.AppView < PanelBody > {

    constructor(___context: PanelBody) {

        super(___context);

        this.template = (___view: ___wml.AppView < PanelBody > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}