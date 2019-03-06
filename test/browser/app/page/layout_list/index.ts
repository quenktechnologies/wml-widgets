import * as wml from '@quenk/wml';
import { ListLayoutItem } from '../../../../../lib/layout/list';
import { Main } from './wml/list';

export class ListLayoutPage {

    view: wml.View = new Main(this);

    items: { [key: string]: boolean } = {

        'This is the first item.': false,

        'This is the second item.': true,

        'This is the third item.': false

    }

    click = (key: string) =>
        this
            .view
            .findById<ListLayoutItem>(key)
      .map(l => l.toggleActive())
      .orJust(()=> alert(`Cannot find element by id "${key}"!`))

}

export default new ListLayoutPage();
