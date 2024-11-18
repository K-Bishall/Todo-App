import { ReactElement } from "react";


function Navbar(): ReactElement {

  return (
    <div className="bg-orange-50 flex justify-center items-center">
      <h1 className="leading-loose text-5xl">TO<span className="text-orange-500">DO</span></h1>
    </div>
  );
}

export default Navbar;