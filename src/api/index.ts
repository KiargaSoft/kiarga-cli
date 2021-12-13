import got from "got";

export interface CommonApiParams {
  domain?: string;
  apiDomain?: string;
  locale?: string;
}

export function call(params: Partial<CommonApiParams>) {
  return got.extend({
    prefixUrl: params.apiDomain || process.env.KIARGA_API_DOMAIN || 'https://api.kiarga.com',
    headers: {
      'Accept-Language': params.locale || process.env.KIARGA_API_LOCALE || 'en'
    },
  })
}