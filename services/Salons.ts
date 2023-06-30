import SalonCustomization, { SalonData } from "@/components/SalonCustomization";
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
          profile{
          services
          wallpaper
          profile_picture
          description
          location
          schedule
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
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function UpdateSalon(salonDetails: SalonData, id:string) {
  const graphqlQuerry: string = `mutation{
    updateUser(
      user_id: "${id}"
      updateProfileInput:{
        profile_picture:"${salonDetails.profile.profile_picture}"
        wallpaper:"${salonDetails.profile.wallpaper}",
        location:"${salonDetails.profile.location}",
        schedule:"${salonDetails.profile.schedule}"
      }
      updateUserInput:{
        full_name:"${salonDetails.full_name}"
        email:"${salonDetails.email}"
        cellphone:"${salonDetails.cellphone}"
      }
    ){
      full_name
      email
      cellphone
      profile{
        profile_picture
        wallpaper
        location
        schedule
        image_gallery
      }
    }
  }
`;
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}
