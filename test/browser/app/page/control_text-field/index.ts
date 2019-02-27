import * as wml from '@quenk/wml';
import * as views from './wml/text-field'

export class TextFieldPage {

    id = 'text';

    view: wml.View = new views.Main(this);

    onChange = () => {



    }


}

export default new TextFieldPage();
