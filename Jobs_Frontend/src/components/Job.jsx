import React,{useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router';
function Job() {
    const params = useParams();
    const navigate = useNavigate();
    const [job,setJob]=useState({});
const getElementById=async()=>{
  const res=await fetch(`http://localhost:8080/jobPost/${params.id}`);
  const data = await res.json();
  setJob(data);
  console.log(data);
}
useEffect(()=>{
  getElementById();
},[])
const deleteJob = async()=>{
  const res = await fetch(`http://localhost:8080/jobPost/${params.id}`,{
    method:"DELETE"
  })
  if(res.ok){
    alert("Job Deleted Successfully");
    navigate("/");
  }
}
    return (
        <div>
            <div  className='w-screen job-item grid grid-cols-12 border border-black'>
            <div className='col-span-2'>
              <h2>{job.postProfile}</h2>
              <div>
                <p>{job.postDesc}</p>
                <p>Required Experience: {job.reqExperience}</p>
              </div>
              <div>
                <span>Required Skills: {job?.postTechStack?.map((tech)=>{return <>{tech} </>})}</span>
              </div>
              <div>
                <button onClick={()=>navigate(`/addJob/${job.postId}`)}>Update Job</button>
              </div>
              <div>
                <button onClick={()=>deleteJob()}>Delete Job</button>
              </div>
              </div>
            </div>
        </div>
    )
}

export default Job
