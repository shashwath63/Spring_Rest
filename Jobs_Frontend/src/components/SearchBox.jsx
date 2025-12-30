import React,{useState,useEffect,useCallback} from 'react'
const SearchBox = ({job,handleJobSearch}) => {
    const [jobs,setJobs]=useState([]);
    const fetchJobs = async (job) => {
        const response = await fetch(`http://localhost:8080/jobPosts/keyword/${job}`);
        const data = await response.json();
        handleJobSearch(data);
    }
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);//clear previous timeout
            timeout = setTimeout(() => func(...args), delay);
        };
    };
    const debouncedFetchJobs = useCallback(
        debounce(fetchJobs, 1000), []);
    useEffect(()=>{
            debouncedFetchJobs(job);
    },[job])
    return (
        <div>
            <input type="text" placeholder="Search" onChange={(e)=>debouncedFetchJobs(e.target.value)}/>
        </div>
    );
};
export default SearchBox;
