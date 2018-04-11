import * as wml from '@quenk/wml';
import * as views from './wml/multi-select'
import { MultiSelect, TermChangedEvent, ItemsChangedEvent }
    from '../../../../lib/control/multi-select';
import { Page } from '../Page';

export interface Result {

    label: string,
    value: string

}

const options = [
    { label: 'Asus', value: 'Asus' },
    { label: 'MSI', value: 'MSI' },
    { label: 'Gigabyte', value: 'Gigabyte' },
    { label: 'Gigas', value: 'Gigas' },
    { label: 'AsusTek', value: 'AsusTek' },
    { label: 'Asusuga', value: 'Asusuga' },
    { label: 'Qualcomm', value: 'Qualcomm' },
    { label: 'Qualitative', value: 'Qualitatve' },
    { label: 'Asunder', value: 'Asunder' }
];

export class MultiSelectPage extends Page {

    view: wml.View = new views.Main(this);

    values = {

        id: 'search',

        name: 'search',

        text: () => this.values.selected.map(m => m.label).join(','),

        selected: (<Result[]>[]),

        options

    };

    onSearch = ({ value }: TermChangedEvent) => {
        this.view.findById(this.values.id).map((s: MultiSelect<Result>) =>
            s.update(options.filter(s => s.value.toLowerCase().startsWith(value.toLowerCase()))))
    }

    onChange = ({ value }: ItemsChangedEvent<Result>) => {

        this.values.selected = value;
        this.view.invalidate();

    }

}
