import React, { useState,useEffect} from "react";
import { useNavigate,Link } from "react-router-dom";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from  "../../api/UploadAdapter";
import { posts,getChapters,editChapters,editPages,addPage} from "../../api";
import { computeHeadingLevel } from "@testing-library/react";
function CustomUploadAdapterPlugin(editor) {
	editor.plugins.get("FileRepository").createUploadAdapter = loader => {
		return new UploadAdapter(loader, URL);
	};
}

const Ckeditorapp =({handleCallback,chapter,sub,id,subject})=> {
	const [state,setState]=useState({data:" "});
	const [name,setName]=useState(" ");
	const navigate=useNavigate();

	
		const config = {
			language: "en",
			extraPlugins: [CustomUploadAdapterPlugin],
		
		};

		const imageConfig = {
			toolbar: [
				 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|',
				'toggleImageCaption', 'imageTextAlternative'
			]
		};
		const fetchChapters =async()=>
		{
			await getChapters().then((res)=>{
				if(res)
				{
					handleCallback(res.data);
				}
				else{
					handleCallback("No data")
				}

			})
		}
		const handleSubmit=async()=>
		{
			if(subject && id){
				if(subject==="editChapter"){
					console.log("Edititng chapter")
					await editChapters(id,{name,data:state.data})
						.then((res)=>{
							if(res)
							{
								console.log(res);
								fetchChapters();
								navigate('/');
							}
							else{
								console.log("nothing");
							}
						}
					)
				}else{
					if(subject && subject?.subj && subject?.cid)
					console.log("Edititng page")
					await editPages(subject?.cid,{name,data:state.data,pageId:id})
					.then((res)=>{
						if(res)
						{
							console.log(res);
							fetchChapters();
							navigate('/');
						}
						else{
							console.log("nothing");
						}
					}
					)
				}
			}
			else{
				if(sub==="page")
				{
				await addPage(id,{name,data:state.data})
					.then((res)=>
					{
						console.log(res);
						if(res){
							console.log(res);
							fetchChapters();
							navigate('/pages');
						}else
						{
							console.log("nothing");
						}

					})
					console.log("adding page");

				}else{
					await posts({name,data:state.data})
					.then((res)=>
					{
						if(res)
						{
							fetchChapters();
							navigate("/");
						}
						else{
							console.log("nothing");
						}
					})
				}
			}
		}

useEffect(()=>{
   if(Object.keys(chapter || {}).length >0 ){
	setName(chapter?.name);
    setState({...state, data:chapter?.description});
   }
  
},[chapter]);



		return (
          <div className="container-md">
					
				<div className="form-group">
							<label>enter {sub} name</label>
							<input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="enter name" className="form-control" required/>
         
		 			</div>
						<div className="form-group">
							<label>enter {sub} description</label>
					
			 			</div>

			     <CKEditor
					config={config}
					editor={ClassicEditor}
					data={state.data}
					onChange={(event, editor) => {
						const data = editor.getData();
						setState({ data });
						// console.log(data);
					}}
					upload={imageConfig}
				/>
				<button className='btn btn-primary  mt-2 col-12' onClick={handleSubmit}>Submit</button>
			</div>
				);
	
}
export default Ckeditorapp;
