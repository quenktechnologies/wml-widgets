import * as __wml from '@quenk/wml';
import { Maybe as __Maybe } from '@quenk/noni/lib/data/maybe';
import * as p from '../';
export declare class Thumbnail implements __wml.View {
    constructor(__context: p.Thumbnail);
    ids: {
        [key: string]: __wml.WMLElement;
    };
    groups: {
        [key: string]: __wml.WMLElement[];
    };
    views: __wml.View[];
    widgets: __wml.Widget[];
    tree: Node;
    template: __wml.Template;
    registerView(v: __wml.View): __wml.View;
    register(e: __wml.WMLElement, attrs: __wml.Attributes<any>): __wml.WMLElement;
    node(tag: string, attrs: __wml.Attrs, children: __wml.Content[]): __wml.Content;
    widget(w: __wml.Widget, attrs: __wml.Attrs): __wml.Content;
    findById<E extends __wml.WMLElement>(id: string): __Maybe<E>;
    findByGroup<E extends __wml.WMLElement>(name: string): __Maybe<E[]>;
    invalidate(): void;
    render(): __wml.Content;
}
export declare class Anchor implements __wml.View {
    constructor(__context: p.Thumbnail);
    ids: {
        [key: string]: __wml.WMLElement;
    };
    groups: {
        [key: string]: __wml.WMLElement[];
    };
    views: __wml.View[];
    widgets: __wml.Widget[];
    tree: Node;
    template: __wml.Template;
    registerView(v: __wml.View): __wml.View;
    register(e: __wml.WMLElement, attrs: __wml.Attributes<any>): __wml.WMLElement;
    node(tag: string, attrs: __wml.Attrs, children: __wml.Content[]): __wml.Content;
    widget(w: __wml.Widget, attrs: __wml.Attrs): __wml.Content;
    findById<E extends __wml.WMLElement>(id: string): __Maybe<E>;
    findByGroup<E extends __wml.WMLElement>(name: string): __Maybe<E[]>;
    invalidate(): void;
    render(): __wml.Content;
}
export declare class Caption implements __wml.View {
    constructor(__context: p.Caption);
    ids: {
        [key: string]: __wml.WMLElement;
    };
    groups: {
        [key: string]: __wml.WMLElement[];
    };
    views: __wml.View[];
    widgets: __wml.Widget[];
    tree: Node;
    template: __wml.Template;
    registerView(v: __wml.View): __wml.View;
    register(e: __wml.WMLElement, attrs: __wml.Attributes<any>): __wml.WMLElement;
    node(tag: string, attrs: __wml.Attrs, children: __wml.Content[]): __wml.Content;
    widget(w: __wml.Widget, attrs: __wml.Attrs): __wml.Content;
    findById<E extends __wml.WMLElement>(id: string): __Maybe<E>;
    findByGroup<E extends __wml.WMLElement>(name: string): __Maybe<E[]>;
    invalidate(): void;
    render(): __wml.Content;
}
