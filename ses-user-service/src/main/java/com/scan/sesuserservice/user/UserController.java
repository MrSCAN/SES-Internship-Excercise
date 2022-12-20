package com.scan.sesuserservice.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(path="api/v1/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin()
    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @CrossOrigin()
    @PostMapping
    public List<User> addUser(@RequestBody List<User> users){
        return userService.addNewUser(users);
    }

    @CrossOrigin()
    @DeleteMapping(path="{userId}")
    public Map<String, Object> deleteUser(@PathVariable("userId") Long userId){
        return userService.deleteUser(userId);
    }

    @CrossOrigin()
    @PutMapping(path="{userId}")
    public Map<String, Object> updateStudent(
            @PathVariable("userId") Long userId,
            @RequestBody User user
    ){
        return userService.updateUser(userId, user);
    }

}