import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { Update_PlacesData, retrieve_UserPlaces } from './http_methods.js';
import Error from './components/Error.jsx';
import { useFetch } from './components/hooks/useFetch.js';

function App() {
  const selectedPlace = useRef();

  // const [userPlaces, setUserPlaces] = useState([]);
  // const [isFetching, setfetching] = useState(false); //handling loading state
  // const [error_userPlaces, setError] = useState(); //handling error state

  const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorState,setErrorState] = useState();

    // useEffect(()=>{

    //   async function retrieveUserPlaces(){
    //     setfetching(true);
    //     try{
    //       const user_places = await retrieve_UserPlaces();
    //       setUserPlaces(user_places);
    //     } 
    //     catch(error){
    //       // setUserPlaces([]);
    //       let msg = error.message || "Data Fetching Failed!";
    //       setError({message:msg});
    //     }
    //    setfetching(false);
    //   }

    //   retrieveUserPlaces();
    // },[]);
    
   //alias error:error_userPlaces
  const {userPlaces,isFetching,error:error_userPlaces,setUserPlaces} = useFetch(retrieve_UserPlaces,[]);    

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try{
      console.log(userPlaces);
      let resp_obj;
      //below added fix , if place is already selected then we can just send the existing data or stop avoiding update.
      if (userPlaces.some((place) => place.id === selectedPlace.id)) {
        // resp_obj = await Update_PlacesData([...userPlaces]);
      }
      else{
        resp_obj = await Update_PlacesData([selectedPlace,...userPlaces]);
      } 
      console.log(resp_obj);
    }
    catch(error){
      const msg = error.message || "Failed to Update the data.";
      console.log(msg);
      setUserPlaces(userPlaces);
      setErrorState({"message":msg});
     }
  
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    setModalIsOpen(false);

    try{
       console.log(selectedPlace.current,userPlaces);
       await Update_PlacesData(userPlaces.filter((place)=>place.id!=selectedPlace.current.id));
    }
    catch(error){
         let msg = error.mesage || "Failed to Delete data!!";
         setUserPlaces(userPlaces);
         setErrorState({message:msg})
    }

  }, [userPlaces,setUserPlaces]); // we added setUserPlace because as its coming from Custom hook
// but it will not give impact it just state updating func  

  const handle_error = ()=>{
    setErrorState(null);
  }


  return (
    <>
    <Modal open={errorState} onClose={handle_error}>
   {
    errorState && 
   (<Error title="An error Occured!!!" message = {errorState.message} onConfirm={handle_error}/>)
   }  
    </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error_userPlaces && <Error title="An error occured!" message={error_userPlaces.message}></Error>}
        {!error_userPlaces &&
        <Places
          title="I'd like to visit ..."
          places={userPlaces}
          dataLoaded = {isFetching}
          loadingText = "User Places Loading..."
          fallbackText="Select the places you would like to visit below."
          onSelectPlace={handleStartRemovePlace}
        />
        }

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;

/*
----------------- NEED OF CUSTOM HOOK -----------------

Point to Note:- We can use many hooks like useState and useEffect, useRef hooks in single component and each instance
is independent to other one.

Scenario :- Here in App.jsx and Available_Places.jsx we are using almost same kind of logic , maintaining three states
         Error , Loading and data fetching state. Through useEffect we are calling fetch() and fetching data 
from backend and accordingly managing loading and error state

Analysis :- Above logic we are using across two places Available_Places component and APP Component , an generally
         in React we are using Components to remove duplicacy , so that we can use Component weherever required 
but for Component to create , it should retrun some JSX(html) Code.

Solution:- In above logic, we are using hooks like useEffect and we know as per rules of hook like , it
        should call from function component only , but not from any normal functions becuase of which
we cannot create normal functions like in http_methods file , so then where we can use hook other than
functional component is CUSTOM HOOK.

Rest regarding custom hook check in hooks folder.

*/
