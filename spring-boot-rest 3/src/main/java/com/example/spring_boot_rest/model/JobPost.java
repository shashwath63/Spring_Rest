package com.example.spring_boot_rest.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data // for not writing getters and setters and toString methods as it will handle it
@NoArgsConstructor // for initialising no args constructor not manually
@AllArgsConstructor// for initialising multi args constructor not manually
@Entity
public class JobPost {
    @Id
    private int postId;
    private String postProfile;
    private String postDesc;
    private Integer reqExperience;
    private List<String> postTechStack;
}
