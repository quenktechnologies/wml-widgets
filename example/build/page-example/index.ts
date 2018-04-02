import * as wml from '@quenk/wml';
import * as views from './wml/page-example';

export class PageExample extends wml.Component<wml.Attrs> {

    view: wml.View = new views.Main(this);

}
