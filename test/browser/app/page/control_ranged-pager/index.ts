import * as wml from '@quenk/wml';
import * as views from './views';

import { Type } from '@quenk/noni/lib/data/type';
import { make } from '@quenk/noni/lib/data/array';

import { PageSelectedEvent } from '../../../../../lib/control/pager';
import { TextChangedEvent } from '../../../../../lib/control/text-field';

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

export class RangedPagerPage {
    view: wml.View = new views.Main(this);

    values = {
        scenes: scenes,

        message: scenes[0],

        max: scenes.length,

        total: scenes.length,

        current: 1,

        onAttrChange: (e: TextChangedEvent) => {
            (<Type>this.values)[e.name] = Number(e.value);

            if (e.name === 'total')
                this.values.scenes = make(Number(e.value), i => `Page ${i}`);
        },

        onChange: (e: PageSelectedEvent) => {
            this.values.current = e.value;

            this.values.message = this.values.scenes[this.values.current - 1];

            this.view.invalidate();
        },

        reset: () => {
            this.view.invalidate();
        }
    };
}

export default new RangedPagerPage();
