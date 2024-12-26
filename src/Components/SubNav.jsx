import React from "react";

const SubNav = () => {
  return (
    <div className="flex justify-between items-center bg-red-500 text-white px-4 py-2">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="material-icons text-white mr-2">place</span>
          <span>121 King Street, Melbourne</span>
        </div>
        <div className="flex items-center">
          <span className="material-icons text-white mr-2">email</span>
          <span>info@themevessel.com</span>
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
          LOGIN
        </button>
        <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
          REGISTER
        </button>
      </div>
    </div>
  );
};

export default SubNav;
