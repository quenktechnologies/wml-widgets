import * as ___wml from '@quenk/wml';
import * as L from '../List';



export class Main extends ___wml.AppView < L.List > {

    constructor(context: L.List) {

        super(context);

        this.template = (___context: L.List, ___view: ___wml.AppView < L.List > ) =>
            ___wml.node('ul', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}