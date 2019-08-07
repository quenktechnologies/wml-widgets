import * as wml from '@quenk/wml';
import * as views from './wml/drop-list';
import {
    DropList,
    ItemSelectedEvent,
} from '../../../../../lib/control/drop-list';
import { results } from '../../fixtures/data/results';

const options = results;

export class DropListPage {

    view: wml.View = new views.Main(this);

    values = {

        normal: {

            id: 'normal',
            name: 'normal',
            label: 'Normal',
            options,
            value: results[2].value,
            onSelect: doSelect(this)

        },
        block: {

            id: 'block',
            name: 'block',
            label: 'Block',
            options,
            onSelect: doSelect(this)

        },
        success: {

            id: 'success',
            name: 'success',
            label: 'Success',
            options,
            message: 'This has a success message.',
            onSelect: doSelect(this)

        },
        warning: {

            id: 'warning',
            name: 'warning',
            label: 'Warning',
            options,
            message: 'This has a warning message.',
            onSelect: doSelect(this)

        },

        error: {

            id: 'error',
            name: 'error',
            label: 'Error',
            options,
            message: 'This has a error message.',
            onSelect: doSelect(this)

        },

    }

}

const doSelect =
    (page: DropListPage) => ({ name, value }: ItemSelectedEvent<string>) =>
        page
            .view
            .findById<DropList<string>>(name)
            .map(() => {

                alert(`Selected: ${name}=${value}`);

            });

export default new DropListPage();
