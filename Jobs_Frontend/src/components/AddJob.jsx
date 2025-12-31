import React,{useState,useEffect} from 'react'
import { useNavigate,useParams} from 'react-router';
function AddJob() {
    const navigate = useNavigate();
    const params = useParams();

    const [job,setJob]=useState({});
useEffect(()=>{
    if(params.id){
        const fetchJob = async ()=>{
            const res=await fetch(`http://localhost:8080/jobPost/${params.id}`);
            const data = await res.json();
            setJob({...data,postTechStack:data.postTechStack.join(",")});
        }
        fetchJob();
    }
},[params.id])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(job);
        job.postTechStack=job.postTechStack.split(",");
        job.postTechStack=job.postTechStack.map((tech)=>tech.trim());
        const res =await fetch(params.id ? 'http://localhost:8080/jobPost' : "http://localhost:8080/jobPost",{
            method:params.id ? "PUT" : "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(job)
        })
        if(res.ok){
            alert(params.id ? "Job Updated Successfully" : "Job Added Successfully");
        }else{
            alert(params.id ? "Job Not Updated" : "Job Not Added");
        }
        navigate("/");

    }
    return (
        <div className='flex flex-col'>
            <h1 className='text-lg'>Add Job</h1>
            <form onSubmit={handleSubmit} className='flex flex-col border border-black'>
                <label className='flex pl-2 font-md' htmlFor="profile">Profile</label>
                <input id='profile'className='border border-grey m-2 mt-0 p-1'type="text" onChange={(e)=>setJob({...job,postProfile:e.target.value})} placeholder="Job Title" value={job.postProfile||""}/>
                                <label htmlFor="profile" className='flex pl-2 '>Description</label>
                <textarea className='border border-grey m-2 mt-0 p-1' onChange={(e) => setJob({ ...job, postDesc: e.target.value })} placeholder="Job Description" value={job.postDesc || ""} />
                    <label className='flex pl-2' htmlFor="Experience">Experience</label>
                 <input className='border border-grey m-2 mt-0 p-1' type="text" onChange={(e)=>setJob({...job,reqExperience:e.target.value})} placeholder="Required Experience" value={job.reqExperience||""}/>
                  <label className='flex pl-2' htmlFor="Experience">Tech stack</label>
                <input className='border border-grey m-2 mt-0 p-1' type="text" onChange={(e)=>setJob({...job,postTechStack:e.target.value})} placeholder="Required Skills" value={job.postTechStack||""}/>
                <button className='border border-grey m-2 bg-gray-200 flex justify-center w-25'type="submit">{params.id ? "Update Job" : "Add Job"}</button>
            </form>
        </div>
    )
}

export default AddJob
