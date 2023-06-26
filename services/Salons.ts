const url: string = "https://breta-api.up.railway.app/graphql";
const headers = {
  "content-type": "application/json",
};

export async function getSalonById(id: string | undefined) {
  const graphqlQuerry: string = `{
        user(user_id : "${id}"){
        full_name
        email
        cellphone
        type
        type
           profile{
          services
          wallpaper
          profile_picture
          description
          location
        }
       
      }
    }`;
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json()
    return result
  } catch (err) {
    console.log(err);
  }
}

