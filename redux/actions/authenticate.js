export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = code => ({
    type: AUTHENTICATE,
    payload: code,
});
