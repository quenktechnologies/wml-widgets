import * as wml from '@quenk/wml';
import * as views from './wml/drop-list-field';
import {
    DropListField,
    ItemChangedEvent,
} from '../../../../../lib/control/drop-list-field';
import { results } from '../../fixtures/data/results';

const options = results;

export class DropListFieldPage {

    view: wml.View = new views.Main(this);

    values = {

        normal: {

            id: 'normal',
            name: 'normal',
            label: 'Normal',
            options,
            value: results[2].value,
            onChange: doChange(this)

        },
        success: {

            id: 'success',
            name: 'success',
            label: 'Success',
            options,
            message: 'This has a success message.',
            onChange: doChange(this)

        },
        warning: {

            id: 'warning',
            name: 'warning',
            label: 'Warning',
            options,
            message: 'This has a warning message.',
            onChange: doChange(this)

        },

        error: {

            id: 'error',
            name: 'error',
            label: 'Error',
            options,
            message: 'This has a error message.',
            onChange: doChange(this)

        },

    }

}

const doChange =
    (page: DropListFieldPage) => ({ name, value }: ItemChangedEvent<string>) =>
        page
            .view
            .findById<DropListField<string>>(name)
            .map(() => {

                alert(`Selected: ${name}=${value}`);

            });

export default new DropListFieldPage();
