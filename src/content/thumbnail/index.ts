import * as views from './wml/thumbnail';
import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { HTMLElementAttrs, getId, getClassName } from '../../';

///classNames:begin
export const THUMBNAIL = 'ww-thumbnail';
export const THUMBNAIL_CAPTION = 'ww-thumbnail__caption';
///classNames:end

/**
 * ThumbnailAttrs
 */
export interface ThumbnailAttrs extends HTMLElementAttrs {
    /**
     * href
     */
    href?: string;

    /**
     * onClick handler.
     */
    onClick?: () => void;
}

/**
 * Thumbnail
 */
export class Thumbnail extends Component<ThumbnailAttrs> {
    view: View =
        this.attrs && this.attrs.href
            ? new views.Anchor(this)
            : new views.Thumbnail(this);

    values = {
        id: getId(this.attrs),

        className: concat(THUMBNAIL, getClassName(this.attrs)),

        href: this.attrs && this.attrs.href ? this.attrs.href : '',

        onclick: (e: Event) => {
            if (this.attrs && this.attrs.onClick) {
                e.preventDefault();
                this.attrs.onClick();
            }
        }
    };
}

/**
 * CaptionAttrs
 */
export interface CaptionAttrs extends HTMLElementAttrs {}

/**
 * Caption
 */
export class Caption extends Component<CaptionAttrs> {
    view: View = new views.Caption(this);

    values = {
        id: getId(this.attrs),

        className: concat(THUMBNAIL_CAPTION, getClassName(this.attrs))
    };
}
