import React, { useEffect, useContext, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../index';
import { Context } from '../Context';

const provider = new GoogleAuthProvider();

function Landingpage() {
  const { setUser } = useContext(Context);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [generatedCountry, setGeneratedCountry] = useState('');

  const countryNames = [
    "Italy",
    "Japan",
    "Spain",
    "France",
    "Greece", "USA", "Canada", "Africa", "Brazil", "China", "Ireland", "Denmark", "Turkey", "Thailand", "Mexico", "Vietnam"
  ];

  function generateRandomCountry() {
    const randomIndex = Math.floor(Math.random() * countryNames.length);
    return countryNames[randomIndex];
  }

  useEffect(() => {
    // Set up interval to regenerate the country name every 5 seconds
    const intervalId = setInterval(() => {
      setGeneratedCountry(generateRandomCountry());
    }, 2000);

    // Initial generation
    setGeneratedCountry(generateRandomCountry());

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="landingpage">
      <div className="title">Voyage<span className='hawk'>Hawk</span></div>
      <div className="hamburger-icon" onClick={() => setIsNavOpen(!isNavOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-list ${isNavOpen ? 'active' : ''}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/Explore">Explore</a></li>
        <li><a href="/List">Build an Itinerary</a></li>
        <li><a href="/Geolocation">Explore Hotels</a></li>
        <li><a href="/Placesearch">Things to do</a></li>
        <li><div className='signout' onClick={() => auth.signOut()}>Sign out</div></li>
      </ul>
      <div className='blue-block'>
        <nav className="nav">
          <div className="nav-tabs">
            {/* Move the title here */}
          </div>
        </nav>

        <div className="slogans">
          <p className='slogan'>
            Explore <span className="generated-country">{generatedCountry}</span> 
            </p>
          <p className='sloganss'><em>Discover limitless horizons with Voyage Hawk.
            Seamlessly plan immersive itineraries, from iconic landmarks to hidden treasures,
            and set off on a voyage where your journey awaits.</em></p>
          <div className='signin-login-buttons'>
            <button className='login-button'> <a href="/">Login</a></button>
            <button className='signin' onClick={(e) => {
              signInWithPopup(auth, provider)
              .then(async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log('token: ', token);
                console.log('user: ', user);
                
                const res = await fetch(`${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1/signUpOrSigninUser`, {
                  method: 'post',
                  body: JSON.stringify({ email: user.email }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
                
                const dbUser = await res.json();
                console.log('data: ', dbUser);
              }).catch((error) => {
                console.error(error);
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
              });
            }}>Sign In</button>
          </div>
            
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
