import * as ___wml from '@quenk/wml';
import {
    Message
} from './Message';

export const label = (id: string, text: string) => (___view: ___wml.View) => ___wml.node('label', {
    html: {
        'for': id,
        'class': `control-label`
    },
    wml: {}
}, [___wml.domify(text)], ___view);;
export const message = (id: string, m: Message) => (___view: ___wml.View) => ___wml.box(___wml.domify(console.error(m)), (m.success) ? ___wml.node('span', {
    html: {
        'class': `help-text`
    },
    wml: {
        'id': id
    }
}, [___wml.domify(m.success)], ___view) : (m.error) ? ___wml.node('span', {
    html: {
        'class': `help-text`
    },
    wml: {
        'id': id
    }
}, [___wml.domify(m.error)], ___view) : (m.warning) ? ___wml.node('span', {
    html: {
        'class': `help-text`
    },
    wml: {
        'id': id
    }
}, [___wml.domify(m.warning)], ___view) : ___wml.node('span', {
    html: {
        'class': `help-text`
    },
    wml: {
        'id': id
    }
}, [], ___view));