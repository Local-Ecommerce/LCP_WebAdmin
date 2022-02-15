const BASE_URL = "https://localcommercialplatform-api.azurewebsites.net/api/";

export const publicRequest = (url) => {
    return BASE_URL + url;
}