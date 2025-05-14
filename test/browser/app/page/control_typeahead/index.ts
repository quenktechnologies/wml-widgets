import * as wml from '@quenk/wml';
import * as views from './wml/typeahead';
import {
    Typeahead,
    TextChangedEvent,
    TermChangedEvent
} from '../../../../../lib/control/typeahead';

const results = [
    { label: 'Asus', value: 'Asus' },
    { label: 'MSI', value: 'MSI' },
    { label: 'Gigabyte', value: 'Gigabyte' },
    { label: 'Gigas', value: 'Gigas' },
    { label: 'AsusTek', value: 'AsusTek' },
    { label: 'Asusuga', value: 'Asusuga' },
    { label: 'Qualcomm', value: 'Qualcomm' },
    { label: 'Qualitative', value: 'Qualitatve' },
    { label: "Kirpalani's", value: "Kirpalani's" },
    { label: 'Asunder', value: 'Asunder' }
];

export interface Result {
    label: string;
    value: string;
}

export class TypeaheadPage {
    view: wml.View = new views.Main(this);

    values = {
        normal: {
            id: 'normal',
            name: 'normal',
            label: 'Normal',
            value: 'Normal',
            stringifier: (r: Result) => r.value,
            onSearch: doSearch(this),
            onChange: doChange(this)
        },
        block: {
            id: 'block',
            name: 'block',
            label: 'Block',
            stringifier: (r: Result) => r.value,
            onSearch: doSearch(this),
            onChange: doChange(this)
        },
        success: {
            id: 'success',
            name: 'success',
            label: 'Success',
            stringifier: (r: Result) => r.value,
            message: 'This has a success message.',
            onSearch: doSearch(this),
            onChange: doChange(this)
        },
        warning: {
            id: 'warning',
            name: 'warning',
            label: 'Warning',
            stringifier: (r: Result) => r.value,
            message: 'This has a warning message.',
            onSearch: doSearch(this),
            onChange: doChange(this)
        },

        error: {
            id: 'error',
            name: 'error',
            label: 'Error',
            stringifier: (r: Result) => r.value,
            message: 'This has a error message.',
            onSearch: doSearch(this),
            onChange: doChange(this)
        }
    };
}

const doSearch =
    (page: TypeaheadPage) =>
    ({ name, value }: TermChangedEvent) =>
        page.view
            .findById<Typeahead<Result>>(name)
            .map((s: Typeahead<Result>) => {
                let hit = results.filter(c =>
                    c.value.toLowerCase().startsWith(value) ? true : false
                );

                s.update(hit);
            });

const doChange =
    (page: TypeaheadPage) =>
    ({ name, value }: TextChangedEvent) =>
        page.view.findById<Typeahead<Result>>(name).map(t => {
            t.setMessage(`Selected: ${value}`);
        });

export default new TypeaheadPage();
