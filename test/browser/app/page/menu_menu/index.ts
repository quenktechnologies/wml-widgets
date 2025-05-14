import * as wml from '@quenk/wml';

import { Main } from './wml/menu';

export class MenuPage {
    view: wml.View = new Main(this);

    items = [
        { type: 'header', text: 'Your Options' },
        { type: 'link', disabled: true, text: 'Back' },
        { type: 'link', text: 'Refresh', onClick: () => alert('Refresh?') },
        { type: 'divider' },
        { type: 'link', text: 'Quit', onClick: () => alert('clicked') }
    ];
}

export default new MenuPage();
