import React,{useEffect,useCallback} from 'react'
const SearchBox = ({job,handleJobSearch}) => {
    const fetchJobs = async (job) => {
        if(job==="" || job=== undefined){
            handleJobSearch([]);
            return;
        }
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
            <input className='border border-gray-300 rounded p-2 w-1/2 m-2' type="text" placeholder="Search" onChange={(e)=>debouncedFetchJobs(e.target.value)}/>
        </div>
    );
};
export default SearchBox;
