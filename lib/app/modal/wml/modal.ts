import * as $wml from '@quenk/wml';
import * as M from '../';

export class Modal extends $wml.AppView < M.Modal > {

    constructor(context: M.Modal) {

        super(context);

        this.template = (___context: M.Modal, ___view: $wml.AppView < M.Modal > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root,
                    'tabindex': `-1`,
                    'role': `dialog`
                },
                wml: {
                    'id': ___context.values.id.root
                }
            }, [$wml.node('div', {
                html: {
                    'class': ___context.values.class.dialog,
                    'role': `document`
                },
                wml: {}
            }, [$wml.node('div', {
                html: {
                    'class': ___context.values.class.content
                },
                wml: {
                    'id': ___context.values.id.content
                }
            }, [$wml.domify(___context.children)], ___view)], ___view)], ___view);

    }

};
export class Header extends $wml.AppView < M.Header > {

    constructor(context: M.Header) {

        super(context);

        this.template = (___context: M.Header, ___view: $wml.AppView < M.Header > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children), $wml.node('button', {
                html: {
                    'type': `button`,
                    'class': `close`,
                    'aria-label': `Close`
                },
                wml: {}
            }, [$wml.node('span', {
                html: {
                    'aria-hidden': `true`
                },
                wml: {}
            }, [$wml.text(`×`)], ___view)], ___view)], ___view);

    }

};
export class Body extends $wml.AppView < M.Body > {

    constructor(context: M.Body) {

        super(context);

        this.template = (___context: M.Body, ___view: $wml.AppView < M.Body > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

};
export class Footer extends $wml.AppView < M.Footer > {

    constructor(context: M.Footer) {

        super(context);

        this.template = (___context: M.Footer, ___view: $wml.AppView < M.Footer > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

}