import React,{useState,useEffect} from 'react'
import SearchBox from './SearchBox';
import { useNavigate } from "react-router";
function Home() {
    const navigate = useNavigate();
    const response = async ()=>{
   const res=await fetch('http://localhost:8080/jobPosts');
   const data = await res.json();
   setJobs(data);
}
useEffect(()=>{
  response();
},[])
const [jobs,setJobs]=useState([]);
const navigateToJob=(id)=>{
    navigate(`/job/${id}`);
}
const handleJobSearch = (job) => {
  if(job.length!==0){
    setJobs(job);
  }
}
    return (
          <>
     <div>
        <button onClick={()=>navigate("/addJob")}>Add Job</button>
        <h1>Jobs</h1>
        <SearchBox jobs={jobs} handleJobSearch={handleJobSearch}/>
         {jobs.map((job)=>{
          return (
            <div onClick={()=>navigateToJob(job.postId)} key={job.postId} className='w-screen job-item grid grid-cols-12 border border-black'>
            <div className='col-span-2'>
              <h2>{job.postProfile}</h2>
              <div>
                <p>{job.postDesc}</p>
                <p>Required Experience: {job.reqExperience}</p>
              </div>
              <div>
                <span>Required Skills: {job.postTechStack.map((tech)=>{return <>{tech} </>})}</span>
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
