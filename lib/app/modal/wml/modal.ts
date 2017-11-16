import * as ___wml from '@quenk/wml';
import * as M from '../';

export class Modal extends ___wml.AppView < M.Modal > {

    constructor(___context: M.Modal) {

        super(___context);

        this.template = (___view: ___wml.AppView < M.Modal > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root,
                    'tabindex': `-1`,
                    'role': `dialog`
                },
                wml: {
                    'id': ___context.values.id.root
                }
            }, [___wml.node('div', {
                html: {
                    'class': ___context.values.class.dialog,
                    'role': `document`
                },
                wml: {}
            }, [___wml.node('div', {
                html: {
                    'class': ___context.values.class.content
                },
                wml: {
                    'id': ___context.values.id.content
                }
            }, [___wml.domify(___context.children)], ___view)], ___view)], ___view);

    }

};
export class Header extends ___wml.AppView < M.Header > {

    constructor(___context: M.Header) {

        super(___context);

        this.template = (___view: ___wml.AppView < M.Header > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children), ___wml.node('button', {
                html: {
                    'type': `button`,
                    'class': `close`,
                    'aria-label': `Close`
                },
                wml: {}
            }, [___wml.node('span', {
                html: {
                    'aria-hidden': `true`
                },
                wml: {}
            }, [___wml.text(`×`)], ___view)], ___view)], ___view);

    }

};
export class Body extends ___wml.AppView < M.Body > {

    constructor(___context: M.Body) {

        super(___context);

        this.template = (___view: ___wml.AppView < M.Body > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Footer extends ___wml.AppView < M.Footer > {

    constructor(___context: M.Footer) {

        super(___context);

        this.template = (___view: ___wml.AppView < M.Footer > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}