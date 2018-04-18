import { Component, View } from '@quenk/wml';
import { WidgetAttrs, StylableAttrs } from '../../..';
export declare const BREADCRUMB = "ww-breadcrumb";
export { Item } from '../item';
export { Link } from '../link';
/**
 * Breadcrumb
 */
export interface BreadcrumbAttrs extends StylableAttrs {
}
/**
 * Breadcrumb
 */
export declare class Breadcrumb extends Component<WidgetAttrs<BreadcrumbAttrs>> {
    view: View;
    values: {
        root: {
            class: string;
        };
    };
}
