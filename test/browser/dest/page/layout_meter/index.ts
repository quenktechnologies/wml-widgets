import * as wml from '@quenk/wml';
import * as views from './wml/meter'
import { MeterBar } from '../../../../../lib/layout/meter';

export interface Bar {

    value: number,

    color: string

}

export class MeterPage {

    view: wml.View = new views.Main(this);

    values = {

        message: 'This is an alert',

        bars: <Bar[]>[
            { value: 10, color: 'red' },
            { value: 50, color: 'green' },
            { value: 40, color: 'blue' }
        ],

        inc: () => {

            let m = this.view.findById<MeterBar>('single');

            if (m.isJust())
                m.get().increase(10);

        },

        dec: () => {

            let m = this.view.findById<MeterBar>('single');

            if (m.isJust())
                m.get().decrease(10);

        }

    }

}

export default new MeterPage();
