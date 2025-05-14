import * as wml from '@quenk/wml';
import * as views from './wml/embed';

export class EmbedPage {
    view: wml.View = new views.Main(this);

    values = {
        jojo: 'https://www.youtube.com/embed/1bbr5tMuSnc',

        win: 'https://www.youtube.com/embed/itgSyPxfqoE',

        max: 'https://www.youtube.com/embed/9rrzQSbk9hI',

        allow:
            'accelerometer; autoplay; encrypted-media; gyroscope; ' +
            'picture-in-picture'
    };
}

export default new EmbedPage();
