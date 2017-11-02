import * as $wml from '@quenk/wml';
import * as m from '../Main';



export class Main extends $wml.AppView < m.Main > {

    constructor(context: m.Main) {

        super(context);

        this.template = (___context: m.Main, ___view: $wml.AppView < m.Main > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

}