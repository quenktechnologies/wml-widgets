import * as wml from '@quenk/wml';
import * as views from './wml/date-field'
import {
    DateChangedEvent,
    DateField,
    Format
} from '../../../../../lib/control/date-field';
import { getById } from '../../../../../lib/util';

export class DateFieldPage {

    view: wml.View = new views.Main(this);

    values = {

        formats: {

            iso: {

                id: 'iso',
                name: 'iso',
                label: 'ISO8601',
                format: Format.ISO8601,
                message: 'ISO8601 date',
                onChange: onChange(this)

            },
            common: {

                id: 'common',
                name: 'common',
                label: 'Comon',
                format: Format.COMMON,
                message: 'Common date',
                onChange: onChange(this)

            },
            us: {

                id: 'us',
                name: 'us',
                label: 'US',
                format: Format.USA,
                message: 'US date',
                onChange: onChange(this)
            }

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

            },
            block: {

                id: 'block',
                name: 'block',
                label: 'Block',
                success: undefined,
                warning: undefined,
                error: undefined,
                block: true,
                onChange: onChange(this)

            },
        }

    }

}

export const onChange =
    (d: DateFieldPage) => ({ name, value }: DateChangedEvent) => {

        let mDate = getById<DateField>(d.view, name);

        if (mDate.isJust()) {

            let d = mDate.get();

            d.setMessage(`The date is ${value}.`);

        }

    }

export default new DateFieldPage();
