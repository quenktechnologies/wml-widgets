import * as $wml from '@quenk/wml';
import {
    Menu
} from '@package/self/menu/Menu';;
import {
    ButtonMenu
} from '../ButtonMenu';

export const button = () => (___context: ButtonMenu) => (___view: $wml.View) => $wml.node('button', {
    html: {
        'class': ___context.values.button.class,
        'type': `button`,
        'onclick': ___context.values.button.onClick
    },
    wml: {}
}, [$wml.domify(___context.values.button.text)], ___view);

export class Main extends $wml.AppView < ButtonMenu > {

    constructor(context: ButtonMenu) {

        super(context);

        this.template = (___context: ButtonMenu, ___view: $wml.AppView < ButtonMenu > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [$wml.domify(___context.values.button.template()(___context)(___view)), $wml.widget(Menu, {
                html: {},
                wml: {
                    'id': ___context.values.menu.id
                },
                ww: {
                    'hidden': true
                }
            }, [$wml.domify(___context.values.menu.content)], ___view)], ___view);

    }

}