import {toFetchApi} from '@darkpatternsdigital/openapi-codegen-typescript-fetch'
import operations from './api-generated/operations'

export const api = toFetchApi(operations, async (url, req) => {
    const result = await fetch("https://www.dnd5eapi.co" + url, req);
    return result
})
