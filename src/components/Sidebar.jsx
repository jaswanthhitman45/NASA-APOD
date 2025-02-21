import React from "react";

export default function Sidebar(props) {
  const { handleToggleModel,data } = props;

  return (
    <div className="sidebar">
      <div className="bgOverlay" onClick={handleToggleModel}></div>

      <div className="sidebarContents">
              <h2>{ data?.title}</h2>
        <div className="descriptioncontainer">
                  <p className=" descriptionTitle">{ data?.date}</p>
          <p>
            {data?.explanation}
          </p>
        </div>
        <button onClick={handleToggleModel}>
          <i className="fa-solid fa-right-long"></i>
        </button>
      </div>
    </div>
  );
}
