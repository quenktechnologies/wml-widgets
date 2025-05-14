import {
    DropDown,
    ItemChangedEvent
} from '../../../../../lib/control/dropdown';
import { results } from '../../fixtures/data/results';
import { DropDownPageView } from './dropdown';

const options = results;

export class DropDownPage {
    view = new DropDownPageView(this);

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
        }
    };
}

const doChange =
    (page: DropDownPage) =>
    ({ name, value }: ItemChangedEvent<string>) =>
        page.view.findById<DropDown<string>>(name).map(() => {
            alert(`Selected: ${name}=${value}`);
        });

export default new DropDownPage();
