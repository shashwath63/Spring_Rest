import React,{useState,useEffect,useMemo} from 'react'
import SearchBox from './SearchBox';
import { useNavigate } from "react-router";
function Home() {
    const navigate = useNavigate();
    const response = async ()=>{
   const res=await fetch('http://localhost:8080/jobPosts');
   const data = await res.json();
   setJobs(data);
}
const [jobs,setJobs]=useState([]);

const navigateToJob=(id)=>{
    navigate(`/job/${id}`);
}
const handleJobSearch = (filteredJobs) => {
  if (filteredJobs.length !== 0) {
    setJobs(filteredJobs);
  } else {
    response();
  }
}
useEffect(()=>{
  response()},
  [])
    return (
          <>
     <div>
        <button className='border border-gray-300 rounded p-2 m-2 hover:bg-gray-300 hover:cursor-pointer bg-green-500'onClick={()=>navigate("/addJob")}>Add Job</button>
        <h1>Jobs</h1>
        <SearchBox jobs={jobs} handleJobSearch={handleJobSearch}/>
         {jobs.map((job)=>{
          return (
            <div className='grid grid-cols-12 flex justify-center'>
            <div onClick={()=>navigateToJob(job.postId)} key={job.postId} className='job-item col-span-6 border border-black bg-gray-300'>
            <div className='flex flex-col'>
              <h2>{job.postProfile}</h2>
              <div>
                <p>{job.postDesc}</p>
                <p>Required Experience: {job.reqExperience}</p>
              </div>
              <div>
                <span>Required Skills: {job.postTechStack.map((tech)=>{return <span key={tech}>{tech} </span>})}</span>
              </div>
              </div>
            </div>
            </div>
          )
         })}

     </div>
    </>
    )
}

export default Home
