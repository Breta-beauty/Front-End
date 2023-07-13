import SalonCustomization, { SalonData } from "@/components/SalonCustomization";
import { ScheduleDays } from "@/components/SalonCustomization";
import { Result } from "postcss";
const url: string = "https://breta-api.onrender.com/graphql";
const headers = {
  "content-type": "application/json",
};

export async function getSalonById(id: string) {
  const graphqlQuerry: string = `{
      salon(salon_id: ${id}){
        salon_id
        salon_name
        email
        cellphone
        main_picture
        wallpaper
        description
        schedule
        location
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
    console.log(err);
  }
}

export async function UpdateSalon(salonDetails: SalonData, id:string) {
  console.log(salonDetails)
  const graphqlQuerry: string = `
  mutation{
    updateSalon(
      salon_id: ${id}
      updateSalonInput: {
        salon_name: "${salonDetails.salon_name}"
        email: "${salonDetails.email}"
        cellphone: "${salonDetails.cellphone}"
        main_picture: "${salonDetails.main_picture}"
        wallpaper: "${salonDetails.wallpaper}"
        schedule: ${salonDetails.schedule}
        location: ${salonDetails.location}
      }
    ){
      salon_id
      salon_name
      schedule
      location
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
    console.log(err)
    return err;
  }
}

export async function getSalons() {
  const graphqlQuerry = `{
    salons{
      salon_id
      salon_name
      email
      cellphone
      main_picture
      wallpaper
      description
      schedule
      location
    }
  }`;
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try{
    const response = await fetch(url, options);
    const data = await response.json();
    const result = data.data;
    return result
  }catch(err){
    console.log(err)
  }
};

