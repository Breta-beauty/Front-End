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
    console.log(result)
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
        schedule:[
          { day: "${salonDetails.schedule[0].day}", open: ${salonDetails.schedule[0].open}, from: "${salonDetails.schedule[0].from}", to: "${salonDetails.schedule[0].to}" },
          { day: "${salonDetails.schedule[1].day}", open: ${salonDetails.schedule[1].open}, from: "${salonDetails.schedule[1].from}", to: "${salonDetails.schedule[1].to}" },
          { day: "${salonDetails.schedule[2].day}", open: ${salonDetails.schedule[2].open}, from: "${salonDetails.schedule[2].from}", to: "${salonDetails.schedule[2].to}" },
          { day: "${salonDetails.schedule[3].day}", open: ${salonDetails.schedule[3].open}, from: "${salonDetails.schedule[3].from}", to: "${salonDetails.schedule[3].to}" },
          { day: "${salonDetails.schedule[4].day}", open: ${salonDetails.schedule[4].open}, from: "${salonDetails.schedule[4].from}", to: "${salonDetails.schedule[4].to}" },
          { day: "${salonDetails.schedule[5].day}", open: ${salonDetails.schedule[5].open}, from: "${salonDetails.schedule[5].from}", to: "${salonDetails.schedule[5].to}" },
          { day: "${salonDetails.schedule[6].day}", open: ${salonDetails.schedule[6].open}, from: "${salonDetails.schedule[6].from}", to: "${salonDetails.schedule[6].to}" },
        ]
        location:{
          street:"${salonDetails.location.street}"
          ciudad:"${salonDetails.location.ciudad}"
          interiorNumber:"${salonDetails.location.interiorNumber}"
          exteriorNumber:"${salonDetails.location.exteriorNumber}"
          postalCode:"${salonDetails.location.postalCode}"
        }
      }
    ){
      salon_id
      salon_name
      schedule
      locationz
    }
  }
`;
console.log(graphqlQuerry)
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

