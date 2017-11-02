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
                    'type': $wml.read < string > (`ww:type`, ___context.attrs, `button`),
                    'name': $wml.read < string > (`ww:name`, ___context.attrs, ``),
                    'disabled': ($wml.read < boolean > (`ww:disabled`, ___context.attrs)) ? `true` : null,
                    'class': ___context.values.class.button,
                    'onclick': $wml.read < Function > (`ww:onClick`, ___context.attrs)
                },
                wml: {
                    'id': `button`
                }
            }, [$wml.domify($wml.read < string > (`ww:text`, ___context.attrs, ``)), $wml.domify(___context.children)], ___view);

    }

}