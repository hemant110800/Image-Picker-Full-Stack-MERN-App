const url = "http://localhost:3000";

export async function retrieve_AvailablePlaces(){

  const response = await fetch(url+"/places");
  const respDict = await response.json();
  if(!response.ok){
    throw new Error("Failed to fetch available places!!")
  } 
  console.log(respDict);
  return respDict.places
}

export async function Update_PlacesData(places){

  const response = await fetch(url+"/user-places",{
    method:'PUT',
    body:JSON.stringify({places:places}),
    headers:{"Content-Type":"application/json"}
  })
  const respDict = await response.json();
  if(!response.ok){
    throw new Error("Places not updated!!!")
  } 
  console.log(respDict);
  return respDict.message;

}

export async function retrieve_UserPlaces(){

    const response = await fetch(url+"/user-places");
    const respDict = await response.json();
    if(!response.ok){
      throw new Error("Failed to fetch user selected place!!")
    } 
    console.log(respDict);
    return respDict.places
  }


    /* --- Axios method to fetch data
   
    async function retrievePlaces_axios(){
       const response = await axios.get(url+"/places")
      //  const respDict = await response.json()
      console.log(response);
       setPlaces(response.data.places);
    }
       retrievePlaces_axios(); //Call to func
   --------------
   */

    /* --------- Promise Handling using then

    fetch(url+"/places")
    .then((response)=>
    {
     return response.json() //handling promise of fetch() 
    })
    .then((responsed)=>{ //handling promise of json() 
      setPlaces(responsed.places);
    console.log(responsed.places);
    })

    ------------------- */
   