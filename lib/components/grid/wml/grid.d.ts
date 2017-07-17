export interface View {
    render(): HTMLElement;
    findById(id: string): WMLElement;
}
export interface Widget {
    rendered(): void;
    removed(): void;
    render(): HTMLElement;
}
export declare type WMLElement = HTMLElement | Node | EventTarget | Widget;
export declare class Container implements View {
    ids: {
        [key: string]: WMLElement;
    };
    widgets: Widget[];
    tree: HTMLElement;
    context: object;
    template: () => HTMLElement;
    constructor(context: any);
    static render(context: any): HTMLElement;
    register(id: string, w: WMLElement): Container;
    findById(id: string): WMLElement;
    invalidate(): void;
    render(): HTMLElement;
}
export declare class Row implements View {
    ids: {
        [key: string]: WMLElement;
    };
    widgets: Widget[];
    tree: HTMLElement;
    context: object;
    template: () => HTMLElement;
    constructor(context: any);
    static render(context: any): HTMLElement;
    register(id: string, w: WMLElement): Row;
    findById(id: string): WMLElement;
    invalidate(): void;
    render(): HTMLElement;
}
export declare class Column implements View {
    ids: {
        [key: string]: WMLElement;
    };
    widgets: Widget[];
    tree: HTMLElement;
    context: object;
    template: () => HTMLElement;
    constructor(context: any);
    static render(context: any): HTMLElement;
    register(id: string, w: WMLElement): Column;
    findById(id: string): WMLElement;
    invalidate(): void;
    render(): HTMLElement;
}
