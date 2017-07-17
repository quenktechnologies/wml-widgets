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
export declare class Modal implements View {
    ids: {
        [key: string]: WMLElement;
    };
    widgets: Widget[];
    tree: HTMLElement;
    context: object;
    template: () => HTMLElement;
    constructor(context: any);
    static render(context: any): HTMLElement;
    register(id: string, w: WMLElement): Modal;
    findById(id: string): WMLElement;
    invalidate(): void;
    render(): HTMLElement;
}
export declare class Header implements View {
    ids: {
        [key: string]: WMLElement;
    };
    widgets: Widget[];
    tree: HTMLElement;
    context: object;
    template: () => HTMLElement;
    constructor(context: any);
    static render(context: any): HTMLElement;
    register(id: string, w: WMLElement): Header;
    findById(id: string): WMLElement;
    invalidate(): void;
    render(): HTMLElement;
}
export declare class Body implements View {
    ids: {
        [key: string]: WMLElement;
    };
    widgets: Widget[];
    tree: HTMLElement;
    context: object;
    template: () => HTMLElement;
    constructor(context: any);
    static render(context: any): HTMLElement;
    register(id: string, w: WMLElement): Body;
    findById(id: string): WMLElement;
    invalidate(): void;
    render(): HTMLElement;
}
export declare class Footer implements View {
    ids: {
        [key: string]: WMLElement;
    };
    widgets: Widget[];
    tree: HTMLElement;
    context: object;
    template: () => HTMLElement;
    constructor(context: any);
    static render(context: any): HTMLElement;
    register(id: string, w: WMLElement): Footer;
    findById(id: string): WMLElement;
    invalidate(): void;
    render(): HTMLElement;
}
