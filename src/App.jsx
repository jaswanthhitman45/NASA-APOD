import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  const [showModel, setshowModel] = useState(false);
  const [data, setData] = useState(null);
  function handleToggleModel() {
    setshowModel(!showModel);
  }

  useEffect(() => {
    async function fetchApiData() {
      const NASA_API = import.meta.env.VITE_NASA_API_KEY; 
      const url = "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_API}`;
      

      const today = (new Date()).toDateString();
      const localKey = `NASA-${today}`;

      if (localStorage.getItem(localKey)) {
        const apidata = JSON.parse(localStorage.getItem(localKey));
        setData(apidata);
        console.log("Fetched from cache!!");
        return
      }
      localStorage.clear();

      
      try {
        const res = await fetch(url);
        const apidata = await res.json();
        localStorage.setItem(localKey,JSON.stringify(apidata))
        setData(apidata);
        console.log("fetched from api");
      } catch (e) {
        console.log(e.message);
      }
    }
    fetchApiData();
  }, []);

  return (
    <>
      {data ? (<Main data={data}/>) : (
      <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
  
      </div>)}
      {showModel && <Sidebar data={data} handleToggleModel={handleToggleModel} />}
      {data && (<Footer data ={data} handleToggleModel={handleToggleModel} />) }
    </>
  );
}

export default App;
