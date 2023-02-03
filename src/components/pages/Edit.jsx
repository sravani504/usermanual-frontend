import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getChapters } from '../../api/index';
import Ckeditorapp from './Ckeditorapp';

const Edit = () => {

  const [chapter, setChapter] = useState({});
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState();
  const { id } = useParams();
  const { sub } = useParams();
  const location = useLocation();
  console.log(chapter);

  useEffect(() => {
    if (location && location.state) {
      const { data, subject } = location.state;
      setSubject(subject)
      setChapter(data);
    }
  }, [chapter, subject])


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
      <Ckeditorapp handleCallback={handleCallback} chapter={chapter} sub={sub} subject={subject} id={id} />
    </div>
  );
}

export default Edit;