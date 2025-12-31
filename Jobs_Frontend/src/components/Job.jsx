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
            <div  className='job-item border border-black bg-gray-300'>
            <div className='flex flex-col'>
              <span> Post Profile<em className='text-md flex align-left pl-2'>{job.postProfile}</em></span>

              <div>
                <p className='text-md flex align-left pl-2'>{job.postDesc}</p>
                <p className='text-md flex align-left pl-2'>Required Experience: {job.reqExperience}</p>
              </div>
              <div>
                <span className='text-md flex align-left pl-2'>Required Skills: {job?.postTechStack?.map((tech)=>{return <>{tech} </>})}</span>
              </div>
              </div>

            </div>
             <div className='flex flex-row'>
                <button className='border border-grey p-1.5 m-2'onClick={()=>navigate(`/addJob/${job.postId}`)}>Update Job</button>
                <button className='border border-grey p-1.5 m-2' onClick={()=>deleteJob()}>Delete Job</button>
          </div>
        </div>
    )
}

export default Job
