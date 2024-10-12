import React from "react";
import rigoImage from "../../img/rigo-baby.jpg"; // Including image (though not used in this example)

const Home = () => {
  return (
    <div className="container">
      <form>
        <p>Welcome</p>
        <input type="email" placeholder="Email" /><br />
        <input type="password" placeholder="Password" /><br />
        <input type="button" value="Sign in" /><br />
        <a href="#">Forgot Password?</a>
      </form>

      <div className="drops">
        <div className="drop drop-1"></div>
        <div className="drop drop-2"></div>
        <div className="drop drop-3"></div>
        <div className="drop drop-4"></div>
        <div className="drop drop-5"></div>
      </div>
    </div>
  );
};

export default Home;
