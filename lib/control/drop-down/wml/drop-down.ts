import * as ___wml from '@quenk/wml';
import {
    Button
} from '../../button';;
import {
    Caret
} from '../../../content/x/caret';;
import {
    DropDown
} from '../';

export const button = (___context: DropDown) => (___view: ___wml.View) => ___wml.box(___wml.widget(Button, {
    html: {},
    wml: {},
    ww: {
        'class': ___context.values.button.class,
        'onClick': ___context.values.toggle.onClick,
        'text': ___context.values.button.text
    }
}, [], ___view), ___wml.widget(Button, {
    html: {},
    wml: {},
    ww: {
        'class': ___context.values.toggle.class,
        'onClick': ___context.values.toggle.onClick
    }
}, [___wml.widget(Caret, {
    html: {},
    wml: {}
}, [], ___view)], ___view));

export class Main extends ___wml.AppView < DropDown > {

    constructor(___context: DropDown) {

        super(___context);

        this.template = (___view: ___wml.AppView < DropDown > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {
                    'id': ___context.values.root.id
                }
            }, [___wml.domify(___context.values.button.template()(___context)(___view)), ___wml.node('div', {
                html: {
                    'class': ___context.values.content.class
                },
                wml: {
                    'id': ___context.values.content.id
                }
            }, [___wml.domify(___context.values.content.render())], ___view)], ___view);

    }

}