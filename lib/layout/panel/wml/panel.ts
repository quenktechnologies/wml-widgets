import * as ___wml from '@quenk/wml';
import {
    Panel as PanelContext
} from '../Panel';;
import {
    Header as HeaderContext
} from '../Header';;
import {
    Body as BodyContext
} from '../Body';;
import {
    Footer as FooterContext
} from '../Footer';

export class Panel extends ___wml.AppView < PanelContext > {

    constructor(___context: PanelContext) {

        super(___context);

        this.template = (___view: ___wml.AppView < PanelContext > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Header extends ___wml.AppView < HeaderContext > {

    constructor(___context: HeaderContext) {

        super(___context);

        this.template = (___view: ___wml.AppView < HeaderContext > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Body extends ___wml.AppView < BodyContext > {

    constructor(___context: BodyContext) {

        super(___context);

        this.template = (___view: ___wml.AppView < BodyContext > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Footer extends ___wml.AppView < FooterContext > {

    constructor(___context: FooterContext) {

        super(___context);

        this.template = (___view: ___wml.AppView < FooterContext > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}