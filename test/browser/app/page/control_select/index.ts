import * as wml from '@quenk/wml';
import * as views from './wml/select';
import {
    Select,
    ItemChangedEvent,
    ItemUnsetEvent,
    TermChangedEvent
} from '../../../../../lib/control/select';

const results = [
    { label: 'Asus', value: 'Asus' },
    { label: 'MSI', value: 'MSI' },
    { label: 'Gigabyte', value: 'Gigabyte' },
    { label: 'Gigas', value: 'Gigas' },
    { label: 'AsusTek', value: 'AsusTek' },
    { label: 'Asusuga', value: 'Asusuga' },
    { label: 'Qualcomm', value: 'Qualcomm' },
    { label: 'Qualitative', value: 'Qualitatve' },
    { label: 'Kirpalani\'s', value: 'Kirpalani\'s' },
    { label: 'Asunder', value: 'Asunder' }
];

export interface Result {

    label: string,
    value: string

}

export class SelectPage {

    view: wml.View = new views.Main(this);

    values = {

        normal: {

            id: 'normal',
            name: 'normal',
            label: 'Normal',
            value: results[2],
            stringifier: (r: Result) => r.value,
            onSearch: doSearch(this),
            onChange: doChange(this),
            onUnset: doUnset(this)

        },
        block: {

            id: 'block',
            name: 'block',
            label: 'Block',
            stringifier: (r: Result) => r.value,
            onSearch: doSearch(this),
            onChange: doChange(this),
            onUnset: doUnset(this)

        },
        success: {

            id: 'success',
            name: 'success',
            label: 'Success',
            stringifier: (r: Result) => r.value,
            message: 'This has a success message.',
            onSearch: doSearch(this),
            onChange: doChange(this),
            onUnset: doUnset(this)

        },
        warning: {

            id: 'warning',
            name: 'warning',
            label: 'Warning',
            stringifier: (r: Result) => r.value,
            message: 'This has a warning message.',
            onSearch: doSearch(this),
            onChange: doChange(this),
            onUnset: doUnset(this)

        },

        error: {

            id: 'error',
            name: 'error',
            label: 'Error',
            stringifier: (r: Result) => r.value,
            message: 'This has a error message.',
            onSearch: doSearch(this),
            onChange: doChange(this),
            onUnset: doUnset(this)

        },

    }

}

const doSearch = (page: SelectPage) => ({ name, value }: TermChangedEvent) =>
    page
        .view
        .findById<Select<Result>>(name)
        .map((s: Select<Result>) => {

            let hit = results.filter(c =>
                c.value.toLowerCase().startsWith(value) ? true : false);

            s.update(hit);

        });

const doChange =
    (page: SelectPage) => ({ name, value }: ItemChangedEvent<Result>) =>
        page
            .view
            .findById<Select<Result>>(name)
            .map(t => {

                t.setMessage(`Selected: ${value.value}`);

            });

const doUnset =
    (page: SelectPage) => ({ name }: ItemUnsetEvent) =>
        page
            .view
            .findById<Select<Result>>(name)
            .map(t => {

                t.setMessage('');

            });


export default new SelectPage();
