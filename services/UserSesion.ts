const url: string = "https://breta-api.onrender.com/graphql";
const headers = {
  "content-type": "application/json",
};

export async function CreateSalon(user_id:string, salon_name:string, email:string, cellphone:string){
  const graphqlQuerry: string = `mutation{
    createSalon(
      user_id: "${user_id}"
      createSalonInput: {
        salon_name: "${salon_name}"
        email: "${email}"
        cellphone: "${cellphone}"
      }
      ){
        salon_id
        salon_name
        location
        schedule
        email
      }
    }`;
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query: graphqlQuerry }),
    };
    try{
      const response = await fetch(url,options);
      const result = await response.json()
      return result
    }catch(err){
      console.log(err)
    }

}