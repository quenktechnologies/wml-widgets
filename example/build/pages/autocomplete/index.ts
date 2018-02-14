import * as wml from '@quenk/wml';
import * as views from './wml/autocomplete';
import { Autocomplete, ItemSelectedEvent, TermChangedEvent} from '@package/wml-widgets/control/autocomplete';
import { Page } from '../Page';

export interface Result {

    label: string,
    value: string

}

export class AutocompletePage extends Page {

    view: wml.View = new views.Main(this);

    values = {

        id: 'search',

        name: 'search',

        results: [
            { label: 'Asus', value: 'Asus' },
            { label: 'MSI', value: 'MSI' },
            { label: 'Gigabyte', value: 'Gigabyte' },
            { label: 'Gigas', value: 'Gigas' },
            { label: 'AsusTek', value: 'AsusTek' },
            { label: 'Asusuga', value: 'Asusuga' },
            { label: 'Qualcomm', value: 'Qualcomm' },
            { label: 'Qualitative', value: 'Qualitatve' },
            { label: 'Asunder', value: 'Asunder' }
        ]

    };

    onSearch = ({ value }: TermChangedEvent) => {

        this
            .view
            .findById(this.values.id)
            .map((s: Autocomplete<Result>) => {

                let hit = this.values.results.filter(c =>
                    c.value.toLowerCase().startsWith(value) ? true : false);

                s.update(hit);

            });

    }

    onSelect = ({ value }: ItemSelectedEvent<Result>) => {

        this.view.findById('selected')
            .map((e: HTMLElement) => {

                while (e.lastChild)
                    e.removeChild(e.lastChild);

                e.appendChild(document.createTextNode(value.value))

            });

    }


}
