package com.example.spring_boot_rest.controller;


import com.example.spring_boot_rest.model.JobPost;
import com.example.spring_boot_rest.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class JobRestController {
    @Autowired
    private JobService service;

    @GetMapping("jobPosts")
    @ResponseBody//it tells we are returning not the view name
     //but we and returning the json data to viewResolver or we can use annotation @RestController instead of @Controller
    public List<JobPost> getAllJobs(){
        return service.getAllJobs();
    }

    @GetMapping("jobPost/{postId}")
    public JobPost getJob(@PathVariable("postId") int postId){
        return service.getJob(postId);
    }
    @PostMapping("jobPost")
    public JobPost addJob(@RequestBody JobPost job){
        service.addJob(job);
        return service.getJob(job.getPostId());
    }
    @PutMapping("jobPost")
    public  JobPost updateJob(@RequestBody JobPost job){
        service.updateJob(job);
        return service.getJob(job.getPostId());
    }
    @DeleteMapping("jobPost/{postId}")
    public String deleteJob(@PathVariable("postId") int postId){
        service.deleteJob(postId);
        return "Delete Successfull";
    }

    @GetMapping("load")
    public String loadJobs(){
        service.loadJobs();
        return "loaded successfully";
    }

    @GetMapping("jobPosts/keyword/{keyword}")
    public List<JobPost> searchByKeyword(@PathVariable String keyword){
        return service.search(keyword);
    }
}

