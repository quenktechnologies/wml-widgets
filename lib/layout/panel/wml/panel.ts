import * as ___wml from '@quenk/wml';
import * as P from '../Panel';

export class Panel extends ___wml.AppView < P.Panel > {

    constructor(context: P.Panel) {

        super(context);

        this.template = (___context: P.Panel, ___view: ___wml.AppView < P.Panel > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Header extends ___wml.AppView < P.Header > {

    constructor(context: P.Header) {

        super(context);

        this.template = (___context: P.Header, ___view: ___wml.AppView < P.Header > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Body extends ___wml.AppView < P.Body > {

    constructor(context: P.Body) {

        super(context);

        this.template = (___context: P.Body, ___view: ___wml.AppView < P.Body > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Footer extends ___wml.AppView < P.Footer > {

    constructor(context: P.Footer) {

        super(context);

        this.template = (___context: P.Footer, ___view: ___wml.AppView < P.Footer > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}