import * as wml from '@quenk/wml';
import * as views from './wml/demo';

export interface DemoAttrs extends wml.Attrs {
    size?: number;

    offset?: number;
}

export class Demo extends wml.Component<DemoAttrs> {
    view: wml.View = new views.Main(this);

    values = {
        size: this.attrs.size,
        offset: this.attrs.offset
    };
}
