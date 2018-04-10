import * as wml from '@quenk/wml';
import * as views from './wml/page-example';

export interface PageExampleAttrs extends wml.Attrs {

    size?: number,
    offset?: number

}

export class PageExample extends wml.Component<PageExampleAttrs> {

    view: wml.View = new views.Main(this);

    values = {

        size: this.attrs.size,
      offset: this.attrs.offset

    }

}
