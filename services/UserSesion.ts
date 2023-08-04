const url: string = "https://breta-api.onrender.com/graphql";
const headers = {
  "content-type": "application/json",
};

export async function CreateSalon(user_id:string, email:string, cellphone:string){
  const graphqlQuerry: string = `mutation{
    createSalon(
      user_id: "${user_id}"
      createSalonInput: {
        salon_name: "Agrega un nombre a tu salon!"
        email: "${email}"
        cellphone: "${cellphone}"
        description: "Agrega una descripción!"
        schedule:[
          { day: "lunes", open: false, from: "", to: "" },
          { day: "martes", open: false, from: "", to: "" },
          { day: "miercoles", open: false, from: "", to: "" },
          { day: "jueves", open: false, from: "", to: "" },
          { day: "viernes", open: false, from: "", to: "" },
          { day: "sabado", open: false, from: "", to: "" },
          { day: "domingo", open: false, from: "", to: "" },
        ] 
      }
      ){
        salon_id
        salon_name
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
      console.log(result)
      return result
    }catch(err){
      console.log(err)
    }

}