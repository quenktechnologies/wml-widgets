import * as wml from '@quenk/wml';
import * as views from './wml/search';
import { Result, results } from '../../fixtures/data/results';
import {
    Search,
    ItemSelectedEvent,
    TermChangedEvent
} from '../../../../../lib/control/search';

export class SearchPage {
    view: wml.View = new views.Main(this);

    values = {
        id: 'search',
        name: 'search',
        id2: 'search2',
        name2: 'search2',
        stringifier: (r: Result) => r.value,
        onSearch: onSearch(this),
        onSelect: onSelect
    };
}

const onSearch =
    (page: SearchPage) =>
    ({ name, value }: TermChangedEvent) =>
        page.view.findById<Search<Result>>(name).map((s: Search<Result>) => {
            let hit = results.filter(c =>
                c.value.toLowerCase().startsWith(value.toLowerCase())
                    ? true
                    : false
            );

            s.update(hit);
        });

const onSelect = ({ value }: ItemSelectedEvent<Result>) =>
    alert(`Selected "${value.value}"`);

export default new SearchPage();
