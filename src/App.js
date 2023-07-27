import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/auth';
// import Register from './components/Register';
import { db } from './config/firebase-config';
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

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
        hit: isHit
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

  return (
    <div className="appContainer">
      <h1>Firebase course</h1>

      {/* Will be configuring Firebase DB operations over here */}



      {/* So i gone to firebase website and do the registration and all things done there
      and then hit npm install firebase over here
      , copy paste cli and setup auth  */}
      <Auth />

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
              <button onClick={() => deleteMovie(movie.id)/*if were passing a function on onclick we need to make it a arrow function*/}>Delete Movie</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
