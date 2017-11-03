import * as ___wml from '@quenk/wml';
import * as m from '../Main';



export class Main extends ___wml.AppView < m.Main > {

    constructor(context: m.Main) {

        super(context);

        this.template = (___context: m.Main, ___view: ___wml.AppView < m.Main > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}