import * as wml from '@quenk/wml';
import * as views from './wml/stack-select';
import {
    StackSelect,
    ItemsChangedEvent,
    TermChangedEvent
} from '../../../../../lib/control/stack-select';
import { Result, results } from '../../fixtures/data/results';

export class StackSelectPage {

    view: wml.View = new views.Main(this);

    values = {

        asc: {

            id: 'asc',
            name: 'asc',
            label: 'Ascending',
            value: results[2],
            stringifier: (r: Result) => r.value,
            onSearch: onSearch(this),
            onChange: onChange(this),

        },
        desc: {

            id: 'desc',
            name: 'desc',
            label: 'Descending',
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

    }

}

const onSearch = (page: StackSelectPage) => ({ name, value }: TermChangedEvent) =>
    page
        .view
        .findById<StackSelect<Result>>(name)
        .map((s: StackSelect<Result>) => {

            let hit = results.filter(c =>
                c.value.toLowerCase().startsWith(value) ? true : false);

            s.update(hit);

        });

const onChange =
    (page: StackSelectPage) => ({ name, value }: ItemsChangedEvent<Result>) =>
        page
            .view
            .findById<StackSelect<Result>>(name)
            .map(t => {

                t.setMessage(`Count: ${value.length}`);

            });

export default new StackSelectPage();
