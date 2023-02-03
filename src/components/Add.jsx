import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Ckeditorapp from './pages/Ckeditorapp';
import { getChapters } from '../api';

const Add = () => {

  const [chapter, setChapter] = useState({});
  const [data, setData] = useState([]);
  const { sub } = useParams();
  const location = useLocation();
  const [cid, setId] = useState();

  useEffect(() => {
    if (location && location.state) {
      const { id } = location.state;
      setId(id);
    }
  }, [chapter])

  const handleCallback = (childData) => {
    console.log(childData);
    setData(childData);
  }
  console.log(data);

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
  }, [])

  return (
    <div>
      <Ckeditorapp handleCallback={handleCallback} chapter={chapter} sub={sub} id={cid} />
    </div>
  );
}

export default Add;
