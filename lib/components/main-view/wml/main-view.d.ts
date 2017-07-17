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
export declare class Main implements View {
    ids: {
        [key: string]: WMLElement;
    };
    widgets: Widget[];
    tree: HTMLElement;
    context: object;
    template: () => HTMLElement;
    constructor(context: any);
    static render(context: any): HTMLElement;
    register(id: string, w: WMLElement): Main;
    findById(id: string): WMLElement;
    invalidate(): void;
    render(): HTMLElement;
}
