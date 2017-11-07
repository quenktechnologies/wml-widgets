import * as ___wml from '@quenk/wml';
import * as B from '../Button';

export class Group extends ___wml.AppView < B.Group > {

    constructor(context: B.Group) {

        super(context);

        this.template = (___context: B.Group, ___view: ___wml.AppView < B.Group > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Button extends ___wml.AppView < B.Button > {

    constructor(context: B.Button) {

        super(context);

        this.template = (___context: B.Button, ___view: ___wml.AppView < B.Button > ) =>
            ___wml.node('button', {
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
            }, [___wml.domify(___context.values.button.text), ___wml.domify(___context.children)], ___view);

    }

}