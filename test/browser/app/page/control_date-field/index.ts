import * as wml from '@quenk/wml';
import * as views from './wml/date-field'

import {
    DateChangedEvent,
    DateField
} from '../../../../../lib/control/date-field';
import { getById } from '../../../../../lib/util';

export class DateFieldPage {

    view: wml.View = new views.Main(this);

    values = {

        data: {

            id: 'iso',
            name: 'iso',
            label: 'ISO8601',
            message: 'ISO8601 date',
            onChange: onChange(this)

        },

        states: {

            success: {

                id: 'success',
                name: 'success',
                label: 'Success',
                success: 'Success date',
                warning: undefined,
                error: undefined,
                block: false,
                onChange: onChange(this)

            },
            warning: {

                id: 'warning',
                name: 'warning',
                label: 'Warning',
                success: undefined,
                warning: 'Warning date',
                error: undefined,
                block: false,
                onChange: onChange(this)

            },
            error: {

                id: 'error',
                name: 'error',
                label: 'Error',
                success: undefined,
                warning: undefined,
                error: 'Error date',
                block: false,
                onChange: onChange(this)

            }

        },

        block: {

            id: 'block',
            name: 'block',
            label: 'Block',
            success: undefined,
            warning: undefined,
            error: undefined,
            onChange: onChange(this)

        },

        tests: {

            id: 'test',
            label: 'Tests',
            data: [
                '2022-10-22',
                '2022-10-2',
                '2022-1-02',
                '2022-1-1',
                '22-01-1',
                '22-02-1',
                '22-1-20',
                '22-7-7',
                '20220707',
                '2022077',
                '220707',
                '2277'
            ].map(value => ({ label: value, value })),
            value: '',
            onSelect: (e: { value: string }) => {

                this.values.tests.value = e.value;

                this.view.invalidate();

            },
            onChange: onChange(this)
        }

    }

}

export const onChange =
    (d: DateFieldPage) => ({ name, value }: DateChangedEvent) => {

        let mDate = getById<DateField>(d.view, name);

        if (mDate.isJust()) {

            let d = mDate.get();

            d.setMessage(`The date is "${value}".`);

        }

    }

export default new DateFieldPage();
