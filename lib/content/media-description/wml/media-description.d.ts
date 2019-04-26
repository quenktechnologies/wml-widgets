import * as __wml from '@quenk/wml';
import * as m from '../';
import { Maybe as __Maybe } from '@quenk/noni/lib/data/maybe';
export declare class MediaDescription implements __wml.View {
    constructor(__context: m.MediaDescription);
    ids: {
        [key: string]: __wml.WMLElement;
    };
    groups: {
        [key: string]: __wml.WMLElement[];
    };
    widgets: __wml.Widget[];
    tree: __wml.Content;
    template: __wml.Template;
    register(e: __wml.WMLElement, attrs: __wml.Attributes<any>): __wml.WMLElement;
    node(tag: string, attrs: __wml.Attributes<any>, children: __wml.Content[]): HTMLElement;
    widget<A extends __wml.Attrs, W extends __wml.WidgetConstructor<A>>(C: W, attrs: A, children: __wml.Content[]): __wml.Content;
    findById<E extends __wml.WMLElement>(id: string): __Maybe<E>;
    findByGroup<E extends __wml.WMLElement>(name: string): __Maybe<E[]>;
    invalidate(): void;
    render(): __wml.Content;
}
export declare class Media implements __wml.View {
    constructor(__context: m.Media);
    ids: {
        [key: string]: __wml.WMLElement;
    };
    groups: {
        [key: string]: __wml.WMLElement[];
    };
    widgets: __wml.Widget[];
    tree: __wml.Content;
    template: __wml.Template;
    register(e: __wml.WMLElement, attrs: __wml.Attributes<any>): __wml.WMLElement;
    node(tag: string, attrs: __wml.Attributes<any>, children: __wml.Content[]): HTMLElement;
    widget<A extends __wml.Attrs, W extends __wml.WidgetConstructor<A>>(C: W, attrs: A, children: __wml.Content[]): __wml.Content;
    findById<E extends __wml.WMLElement>(id: string): __Maybe<E>;
    findByGroup<E extends __wml.WMLElement>(name: string): __Maybe<E[]>;
    invalidate(): void;
    render(): __wml.Content;
}
export declare class Description implements __wml.View {
    constructor(__context: m.Description);
    ids: {
        [key: string]: __wml.WMLElement;
    };
    groups: {
        [key: string]: __wml.WMLElement[];
    };
    widgets: __wml.Widget[];
    tree: __wml.Content;
    template: __wml.Template;
    register(e: __wml.WMLElement, attrs: __wml.Attributes<any>): __wml.WMLElement;
    node(tag: string, attrs: __wml.Attributes<any>, children: __wml.Content[]): HTMLElement;
    widget<A extends __wml.Attrs, W extends __wml.WidgetConstructor<A>>(C: W, attrs: A, children: __wml.Content[]): __wml.Content;
    findById<E extends __wml.WMLElement>(id: string): __Maybe<E>;
    findByGroup<E extends __wml.WMLElement>(name: string): __Maybe<E[]>;
    invalidate(): void;
    render(): __wml.Content;
}
