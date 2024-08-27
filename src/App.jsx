import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Page from "./components/Page";

// let strrequestlocal = "http://localhost:3000/";
let strrequestprod = "https://site--deliveroo-backend--jwp52j9xkmxc.code.run/";

// const apiDataRetrieving = async () => {
//   const data = await axios.get("http://localhost:3000/API");
//   console.log(data.data.meta);
// };

// const dataretrieving = async () => {
//   const data = await axios.get(strrequest);
//   console.log(data.data);
// };

// dataretrieving();
// // apiDataRetrieving();

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // console.log(data);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const tab = await axios.get(strrequestprod);
        setData(tab);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    retrieveData();
  }, []);

  return <>{isLoading ? <p>Chargement...</p> : <Page data={data} />}</>;
}

export default App;
