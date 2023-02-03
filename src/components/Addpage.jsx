import React, { useEffect, useState } from 'react';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { deletePage, getChapters } from '../api';

const Addpage = () => {
    const [chapter, setChapter] = useState({});
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const { chapter } = location.state;
            setChapter(chapter);
        }
        else {
            navigate('/');
        }
    })

    console.log(chapter);
    const handleView = (data) => {
        if (data) {
            navigate("/view", { state: { data } })

        }
    }

    const handleEdit = (data, subject) => {
        console.log({ data, subject });
        setChapter(data);
        navigate(`/edit/${data._id}`, { state: { data, subject } });

    }

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


    const handleDeletePage = async (chapterId, pageId) => {
        await deletePage(chapterId, { pageId }).then((res) => {
            if (res) {
                fetchChapters();
            }

        })
    }

    return (
        <div>
            <nav className="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/pages">{chapter.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page"><Link to='/view'>{ }</Link></li>
                </ol>
            </nav>
            <div>
                <button className='btn btn-primary mt-2' style={{ marginLeft: "90%" }} onClick={() => navigate('/add/page', { state: { id: chapter._id } })}>Add Page</button>
            </div>
            <div className='d-flex'>
                <nav>
                    <ul className='list'>
                        {
                            chapter.pages && chapter.pages.length > 0 ?
                                chapter.pages.filter((item) => item?.status === 1).map((page, index) => {
                                    return <li key={index}>
                                        {page.name}
                                        <button style={{ border: "none", marginRight: "3px", background: "none", color: "blue" }} onClick={() => handleView(page)}> <FontAwesomeIcon icon={faEye} /></button>
                                        <button style={{ border: "none", marginRight: "3px", background: "none", color: "blue" }} onClick={() => handleEdit(page, { subj: "editPage", cid: chapter._id })}> <FontAwesomeIcon icon={faEdit} /></button>
                                        <button style={{ border: "none", marginRight: "3px", background: "none", color: "blue" }} onClick={() => handleDeletePage(chapter._id, page._id)}><FontAwesomeIcon icon={faTrash} /></button>
                                    </li>
                                }
                                )
                                :
                                <h1>No data</h1>
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Addpage;
