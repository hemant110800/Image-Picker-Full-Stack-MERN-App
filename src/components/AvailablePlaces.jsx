import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { retrieve_AvailablePlaces } from '../http_methods.js';
import { useFetch } from './hooks/useFetch.js';
// import axios from 'axios';
// const url = "http://localhost:3000";

async function fetchSortedPlaces() {
  const places = await retrieve_AvailablePlaces();
  //here for below case we required Promise because once will get position then will calculate sortedPlaces
  //based on positions.

  /** Here we will try to get current location of user through below func and need some time to get
     position from user and once will get position accordingly callback func execute , first
     we sort places according to user location by distance

     One change required , we are setting data loading flag as false at end of function , but it
     will not wait for user position and updated sorting data that's why will call in callback
     will set loading flag as false so that after sucessfully recieving user pos will updated loading state
  */
     
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
      resolve(sortedPlaces);
    });
  });

}

const AvailablePlaces = ({ onSelectPlace }) => {

  const { userPlaces: avalPlaces, isFetching: isDataLoad, error, setUserPlaces } = useFetch(fetchSortedPlaces, []);

  // const [isDataLoad, setflag] = useState(false); //handling loading state
  // const [avalPlaces, setPlaces] = useState([]); //handling data state
  // const [error, setError] = useState(); //handling error state

  // useEffect(() => {

  //   async function retrievePlaces() {
  //     setflag(true);
  //     try{

  //       const places = await retrieve_AvailablePlaces();

  //       navigator.geolocation.getCurrentPosition((position)=>{
  //          console.log(position);
  //          const sortedPosition = sortPlacesByDistance(places,position.coords.latitude,position.coords.longitude);
  //          setPlaces(sortedPosition);

  //          setflag(false); //loading flag set to false after getting position from user and aftr sortig data.
  //          setError(); // whenver if error occured and if it corrected then we are resetting error so that we can see places data.
  //       })

  //     }
  //     catch(error){
  //       console.log(error);
  //       setError({message: error.message || "Could not fetch places, Please try again later!!"});
  //       setflag(false); 
  //     }
  //     // setflag(false);
  //   }

  //   retrievePlaces();
  // }, []);

  if (error) {
    console.log(error);
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={avalPlaces}
      dataLoaded={isDataLoad}
      loadingText="Places are loading..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

export default AvailablePlaces;