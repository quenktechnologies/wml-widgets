import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs } from '../../';
export declare const DESCRIPTION_LIST = "ww-description-list";
export declare const DESCRIPTION_LIST_TITLE = "ww-description-list__title";
export declare const DESCRIPTION_LIST_DATA = "ww-description-list__data";
/**
 * DescriptionListAttrs
 */
export interface DescriptionListAttrs extends HTMLElementAttrs {
    /**
     * horizontal if set will stack the title,data pairs horizontally.
     */
    horizontal?: boolean;
}
/**
 * TitleAttrs
 */
export interface TitleAttrs extends HTMLElementAttrs {
}
/**
 * DataAttrs
 */
export interface DataAttrs extends HTMLElementAttrs {
}
/**
 * DescriptionList layout.
 */
export declare class DescriptionList extends Component<DescriptionListAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
/**
 * Title
 */
export declare class Title extends Component<TitleAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
/**
 * Data
 */
export declare class Data extends Component<DataAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
