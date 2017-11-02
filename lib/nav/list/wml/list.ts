import * as $wml from '@quenk/wml';
import * as L from '../List';



export class Main extends $wml.AppView < L.List > {

    constructor(context: L.List) {

        super(context);

        this.template = (___context: L.List, ___view: $wml.AppView < L.List > ) =>
            $wml.node('ul', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

}