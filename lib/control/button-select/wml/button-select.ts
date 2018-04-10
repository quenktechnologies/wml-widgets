import * as ___wml from '@quenk/wml';
import {
    ButtonGroup
} from '../../button-group';;
import {
    Button
} from '../../button';;
import {
    ButtonSelectInterface,
    Option
} from '../';



export class Main < V > extends ___wml.AppView < ButtonSelectInterface < V > > {

    constructor(___context: ButtonSelectInterface < V > ) {

        super(___context);

        this.template = (___view: ___wml.AppView < ButtonSelectInterface < V > > ) =>
            ___wml.widget(ButtonGroup, {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.map(___context.values.buttons.options, function _map(opt: Option < V > ) {
                return ___wml.widget(Button, {
                    html: {},
                    wml: {},
                    ww: {
                        'class': ___context.values.buttons.getClass(opt),
                        'active': ___context.values.buttons.isActive(opt.value),
                        'onClick': () => ___context.values.buttons.click(opt.value),
                        'text': opt.title
                    }
                }, [], ___view)
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view);

    }

}