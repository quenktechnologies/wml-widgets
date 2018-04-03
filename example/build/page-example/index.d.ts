import * as wml from '@quenk/wml';
export interface PageExampleAttrs extends wml.Attrs {
    size?: number;
    offset?: number;
}
export declare class PageExample extends wml.Component<PageExampleAttrs> {
    view: wml.View;
    values: {
        size: number;
        offset: number;
    };
}
