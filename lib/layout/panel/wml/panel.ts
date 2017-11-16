import * as ___wml from '@quenk/wml';
import * as P from '../Panel';

export class Panel extends ___wml.AppView < P.Panel > {

    constructor(___context: P.Panel) {

        super(___context);

        this.template = (___view: ___wml.AppView < P.Panel > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Header extends ___wml.AppView < P.Header > {

    constructor(___context: P.Header) {

        super(___context);

        this.template = (___view: ___wml.AppView < P.Header > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Body extends ___wml.AppView < P.Body > {

    constructor(___context: P.Body) {

        super(___context);

        this.template = (___view: ___wml.AppView < P.Body > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Footer extends ___wml.AppView < P.Footer > {

    constructor(___context: P.Footer) {

        super(___context);

        this.template = (___view: ___wml.AppView < P.Footer > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}