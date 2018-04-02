import { Attrs } from '@quenk/wml';
/**
 * StylableAttrs suggests a widget can have custom styles
 * applied via the class attribute.
 */
export interface StylableAttrs {
    /**
     * class is typically applied to the root level DOM
     * of a widget's view.
     *
     * Use it to define custom rules for styling specific
     * widget instances.
     */
    class?: string;
}
/**
 * WidgetAttrs describes the attribute namespace
 * for this library.
 */
export interface WidgetAttrs<A> extends Attrs {
    /**
     * ww is the namespace for widgets from this library.
     */
    ww: A;
}
