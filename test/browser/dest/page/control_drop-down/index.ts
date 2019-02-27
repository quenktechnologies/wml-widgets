import * as wml from '@quenk/wml';
import * as views from './wml/drop-down'

export class DropDownPage   {

    view: wml.View = new views.Main(this);

    onClick = (msg: string) => (e: Event) => {

        e.preventDefault();
        alert(msg);

    }

}

export default new DropDownPage()
