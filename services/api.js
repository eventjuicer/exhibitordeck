

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
  console.log(url);

  return fetch(url)
  .then(checkStatus)
  .then(response => response.json())
  .then(response => ({response}))
  .catch(error => ({error}));
}

export const postJson = (url, payload) =>
{
  console.log(url);

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

export const config = {

  "api_public" : "https://api.eventjuicer.com/public/v1/hosts/targiehandlu.pl",
  "api_services" : "https://api.eventjuicer.com/services/v1"

}
