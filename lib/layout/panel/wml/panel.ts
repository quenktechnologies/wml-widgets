import * as $wml from '@quenk/wml';
import * as P from '../Panel';

export class Panel extends $wml.AppView < P.Panel > {

    constructor(context: P.Panel) {

        super(context);

        this.template = (___context: P.Panel, ___view: $wml.AppView < P.Panel > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

};
export class Header extends $wml.AppView < P.Header > {

    constructor(context: P.Header) {

        super(context);

        this.template = (___context: P.Header, ___view: $wml.AppView < P.Header > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

};
export class Body extends $wml.AppView < P.Body > {

    constructor(context: P.Body) {

        super(context);

        this.template = (___context: P.Body, ___view: $wml.AppView < P.Body > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

};
export class Footer extends $wml.AppView < P.Footer > {

    constructor(context: P.Footer) {

        super(context);

        this.template = (___context: P.Footer, ___view: $wml.AppView < P.Footer > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

}