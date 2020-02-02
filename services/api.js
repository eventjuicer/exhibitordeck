

export const checkStatus = (response) =>
{
  if (response.ok){
    return response;
  } else {
    const error = new Error(response.statusText)
    error.response = response;
    throw error;
  }
}


export const getJson = (url) =>
{
  console.log("API/GET", url);

  return fetch(url)
  .then(checkStatus)
  .then(response => response.json())
  .then(response => ({response}))
  .catch(error => ({error}));
}

export const postJson = (url, payload) =>
{
  console.log("API/POST", url, payload);

  return fetch(url,
  {
    method: "POST",
    body: JSON.stringify( payload )
  })
  .then(checkStatus)
  .then(response => response.json())
  .then(response => ({response}))
  .catch(error => ({error}));

}

export const api_services = "https://api.eventjuicer.com/v1/services";
export const api_restricted = "https://api.eventjuicer.com/v1/restricted";
export const api_public = "https://api.eventjuicer.com/v1/public/hosts/ecommerceberlin.com";

//compat!
export const config = {
  api_restricted,
  api_services,
  api_public
}
