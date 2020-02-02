import { createSelector } from 'reselect';
import get from 'lodash/get';
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

export const HasCameraPermissionSelector = createSelector(
  Selectors.getRuntime,
  runtime => get(runtime, "cameraPermission", false)
)

export const RecentlyScannedParticipantSelector = createSelector(
  Selectors.getOptions,
  options => get(options, "lastCode", "")
)