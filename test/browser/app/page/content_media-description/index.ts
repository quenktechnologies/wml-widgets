import * as wml from '@quenk/wml';
import * as views from './wml/media-description';

export class MediaDescriptionPage {
    view: wml.View = new views.Main(this);

    values = {};
}

export default new MediaDescriptionPage();
