import * as $wml from '@quenk/wml';
import * as B from '../Button';

export class Group extends $wml.AppView < B.Group > {

    constructor(context: B.Group) {

        super(context);

        this.template = (___context: B.Group, ___view: $wml.AppView < B.Group > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.getClass,
                    'role': `group`
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

};
export class Button extends $wml.AppView < B.Button > {

    constructor(context: B.Button) {

        super(context);

        this.template = (___context: B.Button, ___view: $wml.AppView < B.Button > ) =>
            $wml.node('button', {
                html: {
                    'type': ___context.values.button.type,
                    'name': ___context.values.button.name,
                    'disabled': ___context.values.button.disabled,
                    'class': ___context.values.button.class,
                    'onclick': ___context.values.button.onclick
                },
                wml: {
                    'id': `button`
                }
            }, [$wml.domify(___context.values.button.text), $wml.domify(___context.children)], ___view);

    }

}