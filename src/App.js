import './App.css';
import Auth from './components/auth';
// import Register from './components/Register';

function App() {
  return (
    <div className="appContainer">
      <h1>Firebase course</h1>
      {/* So i gone to firebase website and do the registration and all things done there
      and then hit npm install firebase over here
      , copy paste cli and setup auth  */}
      <Auth />
    </div>
  );
}

export default App;
