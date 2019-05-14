export const SCREEN_SMALL = '320px';
export const SCREEN_MEDIUM = '720px';

/**
 * screenNotSmall determines whether the window passed matches our
 * standard for considering a screen small.
 */
export const screenNotSmall = (w: Window): boolean =>
    w.matchMedia(`(min-width: ${SCREEN_MEDIUM})`).matches;
