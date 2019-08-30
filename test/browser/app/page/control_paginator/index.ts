import * as wml from '@quenk/wml';
import * as views from './wml/paginator';
import { PageChangedEvent } from '../../../../../lib/control/paginator';

const scenes = [
    'Page 1',
    'Page 2',
    'Page 3',
    'Page 4',
    'Page 5',
    'Page 6',
    'Page 7',
    'Page 8',
    'Page 9',
    'Page 10'
];

export class PaginatorPage {

    view: wml.View = new views.Main(this);

    values = {

        message: scenes[0],

        current: 1,

        total: scenes.length,

        onChange: (e: PageChangedEvent) => {

            this.values.message = scenes[e.value - 1];

            this.values.current = e.value;

            this.view.invalidate();

        }

    }

}

export default new PaginatorPage();
