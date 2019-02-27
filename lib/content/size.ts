///classNames:begin
export const EXTRA_SMALL = '-extra-small';
export const SMALL = '-small';
export const MEDIUM = '-medium';
export const LARGE = '-large';
export const EXTRA_LARGE = '-extra-large';
///classNames:end

/**
 * Size
 */
export enum Size {

    ExtraSmall = 'extra-small',

    Small = 'small',

    Medium = 'medium',

    Large = 'large',

    ExtraLarge = 'extra-large'

}

/**
 * getSizeClassName
 */
export const getSizeClassName  = (s: Size) : string => {

    if (s === Size.ExtraSmall)
        return EXTRA_SMALL;
    else if (s === Size.Small)
        return SMALL;
    else if (s === Size.Medium)
        return MEDIUM;
    else if (s === Size.Large)
        return LARGE;
    else if (s === Size.ExtraLarge)
    return EXTRA_LARGE;

  return '';

}
