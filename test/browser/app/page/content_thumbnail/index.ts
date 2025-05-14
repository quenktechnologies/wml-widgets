import * as wml from '@quenk/wml';
import * as views from './wml/thumbnail';

export class ThumbnailPage {
    view: wml.View = new views.Main(this);

    values = {
        onClick: () => alert('You clicked it!')
    };
}

export default new ThumbnailPage();
