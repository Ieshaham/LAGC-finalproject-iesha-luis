import React from 'react';
import GoogleSignIn from "./component/GoogleSignIn";

// ...other imports

const App = () => {
  const handleLoginSuccess = (response) => {
    // Handle successful sign-in, e.g., set user state, navigate, etc.
    console.log('Logged in successfully:', response);
  };

  const handleLoginFailure = (error) => {
    // Handle sign-in failure, e.g., show error message
    console.error('Sign-in failed:', error);
  };

  return (
    <div className="App">
      {/* Other components */}
      <GoogleSignIn
        onLoginSuccess={handleLoginSuccess}
        onLoginFailure={handleLoginFailure}
      />
    </div>
  );
};

export default App;
