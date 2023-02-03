import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Addchapter from "./Addchapter";
import { getChapters } from "../api";
import './style.css';

const Home = () => {
  const [data, setData] = useState([]);
  const fetchChapters = async () => {
    await getChapters().then((res) => {
      if (res) {
        setData(res.data);
      }
      else {
        console.log("No data");
      }
    })
  }
  useEffect(() => {
    fetchChapters();
  }, []);

  return (
    <div className="" >
      <Addchapter fetchedData={data} />
      <div className="d-flex justify-content-end ">
        <Link to="/add/chapter">
          <button className='btn btn-primary mt-2 mx-2'>Add Chapter</button>
        </Link>
      </div>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
