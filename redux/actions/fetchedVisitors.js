export const PARTICIPANTS_FETCHED = 'PARTICIPANTS_FETCHED';

export const participantsFetched = data => ({
    type: PARTICIPANTS_FETCHED,
    payload: data,
});
