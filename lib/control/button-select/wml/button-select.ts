import * as ___wml from '@quenk/wml';
import {
    Button
} from '@package/self/control/button/Button';;
import {
    ButtonSelectGroup
} from '../ButtonSelectGroup';;
import {
    ButtonSelectGroupAttrs
} from '../ButtonSelectGroupAttrs';



export class Main < V, OV, A extends ButtonSelectGroupAttrs < V, OV > > extends ___wml.AppView < ButtonSelectGroup < V, OV, A > > {

    constructor(context: ButtonSelectGroup < V, OV, A > ) {

        super(context);

        this.template = (___context: ButtonSelectGroup < V, OV, A > , ___view: ___wml.AppView < ButtonSelectGroup < V, OV, A > > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.map(___context.values.select.options, function _map(opt) {
                return ___wml.widget(Button, {
                    html: {},
                    wml: {},
                    ww: {
                        'class': ___context.values.calculateClass(opt),
                        'active': ___context.values.select.isSelected(opt.value),
                        'onClick': ___context.values.click(opt.value),
                        'text': opt.text
                    }
                }, [], ___view)
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view);

    }

}