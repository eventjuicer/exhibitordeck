export const PARTICIPANT_SCANNED = 'PARTICIPANT_SCANNED';

export const participantScanned = (code, ts) => ({
    type: PARTICIPANT_SCANNED,
    code: code,
    ts : ts
});
