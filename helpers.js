
import get from 'lodash/get'
import keyBy from 'lodash/keyBy'
import sortBy from 'lodash/sortBy';
import slugify from 'slugify'
const moment = require('moment');

export const timestamp = () => {
    return + new Date();
}

export const getFullname = (obj) => {
    return `${get(obj, "profile.fname")} ${get(obj, "profile.lname")}`
}

export const getImage = (obj) => {
    return get(obj, "profile.logotype_cdn")
}

export const slug = (str) => {

    return slugify(str, {
        replacement: '-',    // replace spaces with replacement
        remove: null,        // regex to remove characters
        lower: true,         // result in lower case
    })

}

export const isString = (str) => ((typeof str === 'string' || str instanceof String) && str.length)

export const removeFileExtension = (filename) => filename.split('.').slice(0, -1).join('.')

export const fromNow = (ts) => moment(ts).fromNow()