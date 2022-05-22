import * as wml from '@quenk/wml';
import * as views from './pager';
import { PageSelectedEvent } from '../../../../../lib/control/pager';

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

export class PagerPage {

    view: wml.View = new views.Main(this);

    values = {

        message: scenes[0],

        total: scenes.length,

        current: 1,

        onChange: (e: PageSelectedEvent) => {

            this.values.current = e.value ;

            this.values.message = scenes[this.values.current - 1];

            this.view.invalidate();

        }

    }

}

export default new PagerPage();
