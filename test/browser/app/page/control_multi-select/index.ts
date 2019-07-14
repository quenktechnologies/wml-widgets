import * as wml from '@quenk/wml';
import * as views from './wml/multi-select';
import {
    MultiSelect,
    ItemsChangedEvent,
    TermChangedEvent
} from '../../../../../lib/control/multi-select';
import { Result, results } from '../../fixtures/data/results';

export class MultiSelectPage {

    view: wml.View = new views.Main(this);

    values = {

        normal: {

            id: 'normal',
            name: 'normal',
            label: 'Normal',
            value: results[2],
            stringifier: (r: Result) => r.value,
            onSearch: onSearch(this),
            onChange: onChange(this),

        },
        success: {

            id: 'success',
            name: 'success',
            label: 'Success',
            stringifier: (r: Result) => r.value,
            message: 'This has a success message.',
            onSearch: onSearch(this),
            onChange: onChange(this),

        },
        warning: {

            id: 'warning',
            name: 'warning',
            label: 'Warning',
            stringifier: (r: Result) => r.value,
            message: 'This has a warning message.',
            onSearch: onSearch(this),
            onChange: onChange(this),

        },

        error: {

            id: 'error',
            name: 'error',
            label: 'Error',
            stringifier: (r: Result) => r.value,
            message: 'This has a error message.',
            onSearch: onSearch(this),
            onChange: onChange(this),

        },
        block: {

            id: 'block',
            name: 'block',
            label: 'Block',
            stringifier: (r: Result) => r.value,
            onSearch: onSearch(this),
            onChange: onChange(this),

        },

    }

}

const onSearch = (page: MultiSelectPage) => ({ name, value }: TermChangedEvent) =>
    page
        .view
        .findById<MultiSelect<Result>>(name)
        .map((s: MultiSelect<Result>) => {

            let hit = results.filter(c =>
                c.value.toLowerCase().startsWith(value) ? true : false);

            s.update(hit);

        });

const onChange =
    (page: MultiSelectPage) => ({ name, value }: ItemsChangedEvent<Result>) =>
        page
            .view
            .findById<MultiSelect<Result>>(name)
            .map(t => {

                t.setMessage(`Count: ${value.length}`);

            });

export default new MultiSelectPage();
