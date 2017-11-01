import * as wml from '@quenk/wml';
import * as views from './wml/search'
import { Search } from '@package/self/control/search/Search';
import { ResultSelectedEvent } from '@package/self/control/search/ResultSelectedEvent';
import { TermChangedEvent } from '@package/self/control/search/TermChangedEvent';
import { Page } from '../Page';

export interface Result {

    label: string,
    value: string

}

export class SearchPage extends Page {

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

    onChange = ({ value }: TermChangedEvent) => {

        this
            .view
            .findById(this.values.id)
            .map((s: Search<Result>) => {

                let hit = this.values.results.filter(c =>
                    c.value.toLowerCase().startsWith(value) ? true : false);

                s.update(hit);

            });

    }

    onSelect = ({ value }: ResultSelectedEvent<Result>) => {

        this.view.findById('selected')
            .map((e: HTMLElement) => {

                while (e.lastChild)
                    e.removeChild(e.lastChild);

                e.appendChild(document.createTextNode(value.value))

            });

    }


}
