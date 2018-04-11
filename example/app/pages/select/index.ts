import * as wml from '@quenk/wml';
import * as views from './wml/select';
import {
    Select,
    ItemChangedEvent,
    TermChangedEvent
} from '../../../../lib/control/select';
import { Page } from '../Page';

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

const onSearch = (page: SelectPage) => (id: string) => ({ value }: TermChangedEvent) =>
    page
        .view
        .findById(id)
        .map((s: Select<Result>) => {

            let hit = results.filter(c =>
                c.value.toLowerCase().startsWith(value) ? true : false);

            s.update(hit);

        });


const onChange = (page: SelectPage) => ({ name, value }: ItemChangedEvent<Result>) =>

    page.view.findById(name)
        .map((e: HTMLElement) => {

            while (e.lastChild)
                e.removeChild(e.lastChild);

            e.appendChild(document.createTextNode(value.value));

        });

export interface Result {

    label: string,
    value: string

}

export class SelectPage extends Page {

    view: wml.View = new views.Main(this);

    values = {

        autocomplete: {

            id: 'autocomplete',
            name: 'autocompleteName',
            onSearch: onSearch(this)('autocomplete'),
            onChange: onChange(this)

        },
        native: {

            id: 'native',
            name: 'nativeName',
            options: results,
            onSearch: onSearch(this)('native'),
            onChange: onChange(this)

        }

    }

}

