import { createSelector } from 'reselect';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy'
import * as Selectors from './selectors'
import {slug} from '../helpers'

export const CompanyNamesSelector = createSelector(
  Selectors.getCompanies,
  companies => {
    return companies.map(function(company){

        const name = get(company, "profile.name", "")
        const logotype = get(company, "profile.thumbnail", get(company, "profile.logotype_cdn", ""))
        const lang = get(company, "profile.lang", "")

        return {
            id : company.id, 
            name : name.length ? name : company.slug,
            image : logotype.indexOf("http") > -1 ? logotype : false,
            lang : lang.length ? lang : "en"
        }

    })
  }
)

export const AuthenticatedCompanySelector = createSelector(
  Selectors.getCompany,
  company => company
)

export const AuthenticatedRepSelector = createSelector(
  Selectors.getRep,
  rep => rep
)

export const CommentTemplatesSelector = createSelector(
  Selectors.getOptions,
  opts => {
    const notEmpty = opts.comments.filter(c => c).map(item => slug(item))

    return [...notEmpty, ...Array(2)]
  }
)

export const CommentsForParticipantSelector = createSelector(
  Selectors.getComments,
  comments => comments
)

export const GetRecentScannedCodesSelector = createSelector(
  Selectors.getScanned,
  scanned =>  Object.keys(scanned).reverse().slice(0,20).map(code => ({
    code : code,
    ts : scanned[code].ts
  }))
)

export const GetScannedCount = createSelector(
  Selectors.getScanned,
  scanned => Object.keys(scanned).length
)

export const ParticipantsKeyedByCodeSelector = createSelector(
  Selectors.getParticipants,
  participants => keyBy(participants, "code")
)

export const GetRecentScannedParticipantsSelector = createSelector(
  ParticipantsKeyedByCodeSelector,
  Selectors.getComments,
  GetRecentScannedCodesSelector,
  (participants, comments, codes) => codes.map(({code, ts}) => ({
    code : code,
    ts : ts,
    comments : code in comments ? comments[code] : [],
    participant : code in participants ? participants[code] : {
      fname : "First name", lname : "Last name", cname2 : "Company name"
    }
  })) 
)

export const HasCameraPermissionSelector = createSelector(
  Selectors.getRuntime,
  runtime => get(runtime, "cameraPermission", false)
)

export const RecentlyScannedCodeSelector = createSelector(
  Selectors.getOptions,
  options => get(options, "lastCode", "")
)
export const AppStateSelector = createSelector(
  Selectors.getRuntime,
  runtime => runtime.appState
)

export const IsAppSyncingSelector = createSelector(
  Selectors.getRuntime,
  runtime => runtime.isSyncing
)