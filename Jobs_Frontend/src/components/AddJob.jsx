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
        console.log(job);
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
        <div>
            <h1>Add Job</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e)=>setJob({...job,postProfile:e.target.value})} placeholder="Job Title" value={job.postProfile||""}/>
                <textarea onChange={(e) => setJob({ ...job, postDesc: e.target.value })} placeholder="Job Description" value={job.postDesc || ""} />
                 <input type="text" onChange={(e)=>setJob({...job,reqExperience:e.target.value})} placeholder="Required Experience" value={job.reqExperience||""}/>
                <input type="text" onChange={(e)=>setJob({...job,postTechStack:e.target.value})} placeholder="Required Skills" value={job.postTechStack||""}/>
                <button type="submit">{params.id ? "Update Job" : "Add Job"}</button>
            </form>
        </div>
    )
}

export default AddJob
