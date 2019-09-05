import * as __wml from '@quenk/wml';
import { Record } from '@quenk/noni/lib/data/record';
import { HeadContext, HeadingContext, BodyContext, CellContext, DataTable } from '../';
import { Maybe as __Maybe } from '@quenk/noni/lib/data/maybe';
export declare class EmptyView implements __wml.View {
    constructor(__context: object);
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
export declare class HeadView<C, R extends Record<C>> implements __wml.View {
    constructor(__context: HeadContext<C, R>);
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
export declare class HeadingView<C, R extends Record<C>> implements __wml.View {
    constructor(__context: HeadingContext<C, R>);
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
export declare class BodyView<C, R extends Record<C>> implements __wml.View {
    constructor(__context: BodyContext<C, R>);
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
export declare class CellView<C, R extends Record<C>> implements __wml.View {
    constructor(__context: CellContext<C, R>);
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
export declare class Main<C, R extends Record<C>> implements __wml.View {
    constructor(__context: DataTable<C, R>);
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
