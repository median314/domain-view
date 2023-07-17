import React, { useContext } from "react";
import { GlobalContext } from "../Hooks/GlobalContext";

const LandingPageView = () => {
  const value = useContext(GlobalContext);

  console.log(value);

  return <div>LandingPageView</div>;
};

export default LandingPageView;
