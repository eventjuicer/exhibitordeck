export const PARTICIPANT_SCANNED = 'PARTICIPANT_SCANNED';

export const participantScanned = user => ({
    type: PARTICIPANT_SCANNED,
    payload: user,
});
