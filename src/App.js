import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/auth';
// import Register from './components/Register';
import { db, auth, storage, bucket } from './config/firebase-config';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import Learning from './components/learning';

function App() {
  const [movieList, setMovieList] = useState([])

  const moviesCollectionRef = collection(db, "movies");


  //Read and show from db to screen

  //This will give an error cause we'll need to set  rules 

  const getMovieList = async () => {
    //READ DATA FROM DB
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return ({ ...doc.data(), id: doc.id });
      })
      //SHOW THE MOVIE LIST
      setMovieList(filteredData);

      //console.log(filteredData); //gets you your filtered Data
      //console.log(data); //gets you an object of all the confucing stuff related to data to asked for
    } catch (e) {
      console.log(e);
    }

  };
  useEffect(() => {
    getMovieList();
  }, []);


  //Adding new Movies into db and screen
  const [newMovie, setNewMovie] = useState("")
  const [newRelease, setNewRelease] = useState(0)
  const [isHit, setIsHit] = useState(false)

  const onSubmitMovie = async () => {
    try {

      await addDoc(moviesCollectionRef, {
        name: newMovie,
        release: newRelease,
        hit: isHit,
        userId: auth?.currentUser?.uid
        // The above thing will let the db enter the id of the logged in user
        //Next we will make changes in firestore rules section so to allow only the same logged in user to make changes in the title


        //Rules for only allowing delete and update only if user is logged in
        /*     rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow create: if request.auth!=null && request.auth.uid == request.resource.data.userId;
      allow delete,update: if request.auth!=null;
      allow read: if true;
    }
  }
}*/
      })
    }
    catch (error) {
      console.log(error);
    }

    finally {
      getMovieList();
    }
  };
  //Problem arises when we want to see on the screen but it will only display in db so for that we'll do one thing in useEffect...


  //Delete operation in this 
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc);
    getMovieList();
  };

  //Update Movie title
  const [updatedTitle, setUpdatedTitle] = useState('')
  const updateTitle = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, { name: updatedTitle });
    getMovieList();
  };


  // File upload states
  const [fileUpload, setFileUpload] = useState("");

  const sendFile = async () => {
    if (!fileUpload) return;
    const fileFolderRef = ref(bucket, `projectFiles/${fileUpload.name}`)
    try { await uploadBytes(fileFolderRef, fileUpload) }
    catch (e) { console.log(e); }
  }

  return (
    <div className="appContainer">
      <h1>Firebase course</h1>
      <Auth />
      <Learning />
      {/* So i gone to firebase website and do the registration and all things done there
      and then hit npm install firebase over here
      , copy paste cli and setup auth  */}
      {/* Will be configuring Firebase DB operations over here */}




      {/* Setnew movies      */}
      <div style={{ marginTop: "90px" }}>
        <input type="text" placeholder='Movie title...'
          onChange={(e) => setNewMovie(e.target.value)} />
        <input type="number" placeholder='Movie release year...'
          onChange={(e) => setNewRelease(Number(e.target.value))} />
        <input type="checkbox" className='hit'
          checked={isHit}
          onChange={(e) => setIsHit(e.target.checked)} />
        <label htmlFor="hit">Hit or not</label><br />
        <button onClick={onSubmitMovie}>Submit movie</button>
      </div>


      {/* Show original movies on screen */}
      <div>
        {movieList.map((movie) => {
          return (
            <div>
              <h1 style={{ color: movie.hit ? "green" : "red" }}>{movie.name}</h1>
              <p>Date:{movie.release}</p>
              <button onClick={() => deleteMovie(movie.id)/*if were passing a function on onclick we need to make it a arrow function*/}>Delete Movie</button><br />

              {/* Updating the movie */}
              <input type="text" placeholder='Change title...'
                onChange={(e) => setUpdatedTitle(e.target.value)} />
              <button onClick={() => updateTitle(movie.id)}>Update Title</button>
              <br /><br /><br /></div>
          );
        })}
      </div>


      {/* Button to have an option to upload your file onto the cloud
      */}
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={sendFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
