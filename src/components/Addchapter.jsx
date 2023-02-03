import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getChapters, deleteChapters, deletePage } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import "./style.css";


const Addchapter = ({ handleChange, fetchedData, ...props }) => {
  const [data, setData] = useState([]);
  const [chapter, setChapter] = useState({});
  const { id } = useParams();
  console.log(chapter);
  const navigate = useNavigate();

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
    if (fetchedData) {
      setData(fetchedData);
    }
  }, []);

  console.log(data);
  const handleEdit = (data, subject) => {
    console.log({ data, subject });
    setChapter(data);
    navigate(`/edit/${data._id}`, { state: { data, subject } });

  }

  const handleDelete = async (chapter) => {
    await deleteChapters(chapter._id).then((res) => {
      if (res) {
        fetchChapters();
      }
    })

  }

  const handleView = (data) => {
    if (data) {
      navigate("/view", { state: { data } })
    }
  }

  const handleDeletePage = async (chapterId, pageId) => {
    await deletePage(chapterId, { pageId }).then((res) => {
      if (res) {
        fetchChapters();
      }

    })
  }

  const handleData = (chapter) => {
    navigate('/pages', { state: { chapter } })
  }


  return (

    <div className='p-3 vh-100 bg-light leftSidebar'>
      <h1 >User Manuals</h1>
      <div className='chapterList'>
        {
          data && data.length > 0 ?
            data.filter((item) => item?.status === 1).map((chapter, index) => {
              return (
                <div className='d-flex justify-content-between m-1 py-2' key={index}>
                  <div>
                    <h4 className='chapterData' onClick={() => handleData(chapter)}>{chapter.name}</h4>
                  </div>
                  <div>
                    <button style={{ border: "none", marginRight: "3px", background: "none", color: "blue", marginTop: "1px" }} onClick={() => handleView(chapter)}> <FontAwesomeIcon icon={faEye} /> </button>
                    <button style={{ border: "none", marginRight: "3px", background: "none", color: "blue", marginTop: "1px" }} onClick={() => handleEdit(chapter, "editChapter")}> <FontAwesomeIcon icon={faEdit} /></button>
                    <button style={{ border: "none", marginRight: "3px", background: "none", color: "blue", marginTop: "1px" }} onClick={() => handleDelete(chapter)}><FontAwesomeIcon icon={faTrash} /></button>
                  </div>
                </div>

              )
            }
            )
            : <p>No data</p>
        }
      </div>
    </div>
  );
}
export default Addchapter;


