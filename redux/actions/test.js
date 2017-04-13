

import { UPDATE } from 'admin-on-rest';
export const PURCHASE_STATUS_CHANGE = 'PURCHASE_STATUS_CHANGE';

export const purchaseStatusChange = (id, data, basePath) => ({
    type: PURCHASE_STATUS_CHANGE,
    payload: { id, data: { ...data, status: true } },
    meta: { resource: 'purchases', fetch: UPDATE, cancelPrevious: false },
});
