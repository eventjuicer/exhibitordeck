export const AUTHENTICATED = 'AUTHENTICATED';

export const authenticated = userData => ({
    type: AUTHENTICATED,
    payload: userData,
});
