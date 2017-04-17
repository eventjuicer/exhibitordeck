export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = user => ({
    type: AUTHENTICATE,
    payload: user,
});
