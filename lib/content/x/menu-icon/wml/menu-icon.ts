import * as ___wml from '@quenk/wml';
import {
    MenuIcon
} from '../';



export class Main extends ___wml.AppView < MenuIcon > {

    constructor(___context: MenuIcon) {

        super(___context);

        this.template = (___view: ___wml.AppView < MenuIcon > ) =>
            ___wml.node('span', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.node('span', {
                html: {
                    'class': ___context.values.dash.class
                },
                wml: {}
            }, [], ___view), ___wml.node('span', {
                html: {
                    'class': ___context.values.dash.class
                },
                wml: {}
            }, [], ___view), ___wml.node('span', {
                html: {
                    'class': ___context.values.dash.class
                },
                wml: {}
            }, [], ___view)], ___view);

    }

}