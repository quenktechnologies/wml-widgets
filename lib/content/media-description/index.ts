import * as views from './wml/media-description';
import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { HTMLElementAttrs, getId, getClassName } from '../../';

///classNames:begin
export const MEDIA_DESCRIPTION = 'ww-media-description';
export const MEDIA_DESCRIPTION_MEDIA = 'ww-media-description__media';
export const MEDIA_DESCRIPTION_DESCRIPTION = 'ww-media-description__description';
///classNames:end

/**
 * MediaDescriptionAttrs
 */
export interface MediaDescriptionAttrs extends HTMLElementAttrs { }

/**
 * MediaDescription
 */
export class MediaDescription
    extends
    Component<MediaDescriptionAttrs> {

    view: View = new views.MediaDescription(this);

    values = {

        id: getId(this.attrs),

        className: concat(MEDIA_DESCRIPTION, getClassName(this.attrs))

    }

}

/**
 * MediaAttrs
 */
export interface MediaAttrs extends HTMLElementAttrs { }

/**
 * Media
 */
export class Media
    extends
    Component<MediaAttrs> {

    view: View = new views.Media(this);

    values = {

        id: getId(this.attrs),

        className: concat(MEDIA_DESCRIPTION_MEDIA, getClassName(this.attrs))

    }

}

/**
 * DescriptionAttrs
 */
export interface DescriptionAttrs extends HTMLElementAttrs { }

/**
 * Description
 */
export class Description
    extends
    Component<DescriptionAttrs> {

    view: View = new views.Description(this);

    values = {

        id: getId(this.attrs),

        className: concat(MEDIA_DESCRIPTION_DESCRIPTION, getClassName(this.attrs))

    }

}
