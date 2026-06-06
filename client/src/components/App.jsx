import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import TodoForm from "./TodoForm";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [haveAnAccount, setHaveAnAccount] = useState(true);

  const handleLogin = () => setIsLoggedIn(!isLoggedIn);

  const handleSignup = () => {
    setIsLoggedIn(!isLoggedIn);
    setHaveAnAccount(true);
  };

  const redirectToLoginForm = () => {
    setIsLoggedIn(false);
    setHaveAnAccount(true);
  };

  return (
    <>
      {isLoggedIn && (
        <>
          <Dashboard /> <TodoForm />
        </>
      )}
      {!isLoggedIn && haveAnAccount && (
        <Login
          onLogin={handleLogin}
          onHaveAnAccount={() => setHaveAnAccount(false)}
        />
      )}

      {!isLoggedIn && !haveAnAccount && (
        <Signup onSignup={handleSignup} onHaveAnAccount={redirectToLoginForm} />
      )}
    </>
  );
}

export default App;
