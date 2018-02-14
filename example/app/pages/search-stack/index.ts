import * as wml from '@quenk/wml';
import * as views from './wml/search-stack'
import { SearchStack, TermChangedEvent,StackChangedEvent } from '@package/wml-widgets/control/search-stack';
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

export class SearchStackPage extends Page {

    view: wml.View = new views.Main(this);

    values = {

        id: 'search',

        name: 'search',

        text: () => this.values.selected.map(m => m.label).join(','),

        selected: (<Result[]>[]),

        options

    };

    onSearch = ({value}: TermChangedEvent) => {
        this.view.findById(this.values.id).map((s: SearchStack<Result>) =>
            s.update(options.filter(s => s.value.toLowerCase().startsWith(value.toLowerCase()))))
    }

    onChange = ({ value }: StackChangedEvent<Result>) => {

        this.values.selected = value;
        this.view.invalidate();

    }

}
