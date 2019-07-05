import * as wml from '@quenk/wml';
import * as views from './wml/multi-select'
import { MultiSelect, TermChangedEvent, ItemsChangedEvent }
    from '../../../../../lib/control/multi-select';

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

export class MultiSelectPage {

    view: wml.View = new views.Main(this);

    values = {

        name: 'search',

        text: () => this.values.selected.map(m => m.label).join(','),

        selected: (<Result[]>[]),

        options

    };

    onSearch = ({ name, value }: TermChangedEvent) => {

        this
            .view
            .findById<MultiSelect<Result>>(name)
            .map((s: MultiSelect<Result>) =>
                s.update(options.filter(s => s.value.toLowerCase().startsWith(value.toLowerCase()))))

    }

    onChange = ({ value }: ItemsChangedEvent<Result>) => {

        this.values.selected = value;
        this.view.invalidate();

    }

}

export default new MultiSelectPage();
