import * as ___wml from '@quenk/wml';
import {
    Link
} from '../';



export class Main extends ___wml.AppView < Link > {

    constructor(___context: Link) {

        super(___context);

        this.template = (___view: ___wml.AppView < Link > ) =>
            ___wml.node('a', {
                html: {
                    'class': ___context.values.a.class,
                    'href': ___context.values.a.href,
                    'title': ___context.values.a.title,
                    'disabled': ___context.values.a.disabled,
                    'onclick': ___context.values.a.clicked
                },
                wml: {}
            }, [___wml.domify(___context.values.a.content())], ___view);

    }

}