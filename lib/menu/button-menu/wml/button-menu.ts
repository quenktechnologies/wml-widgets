import * as ___wml from '@quenk/wml';
import {
    Menu
} from '@package/self/menu/Menu';;
import {
    ButtonMenu
} from '../ButtonMenu';

export const button = (___context: ButtonMenu) => (___view: ___wml.View) => ___wml.node('button', {
    html: {
        'class': ___context.values.button.class,
        'type': `button`,
        'onclick': ___context.values.button.onClick
    },
    wml: {}
}, [___wml.domify(___context.values.button.text)], ___view);

export class Main extends ___wml.AppView < ButtonMenu > {

    constructor(___context: ButtonMenu) {

        super(___context);

        this.template = (___view: ___wml.AppView < ButtonMenu > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.values.button.template(___context)(___view)), ___wml.widget(Menu, {
                html: {},
                wml: {
                    'id': ___context.values.menu.id
                },
                ww: {
                    'hidden': true
                }
            }, [___wml.domify(___context.values.menu.content)], ___view)], ___view);

    }

}