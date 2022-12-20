package com.scan.sesuserservice.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public List<User> addNewUser(List<User> users) {
        return userRepository.saveAll(users);

    }

    public Map<String, Object> deleteUser(Long userId) {
        if(!userRepository.existsById(userId)){
            throw new IllegalStateException("User with ID "+userId+" does not exist");
        }
        userRepository.deleteById(userId);

        boolean success = true;
        String message = "User with ID "+userId+ " deleted successfully";

        return new ResponseBody(success, message).sendResponseJson();
    }

    @Transactional
    public Map<String, Object> updateUser(Long userId, User user) {
        User currentUser = userRepository.findById(userId).orElseThrow(() -> new IllegalStateException("User with ID "+userId+" does not exist"));

        if(user.getName() != null && !user.getName().isEmpty() && !currentUser.getName().equals(user.getName())){
            currentUser.setName(user.getName());
        }

        if(user.getSurName() != null && !user.getSurName().isEmpty() && !currentUser.getSurName().equals(user.getName())){
            currentUser.setSurName(user.getSurName());
        }
        boolean success = true;
        String message = "User with ID "+userId+ " updated successfully";

        return new ResponseBody(success, message).sendResponseJson();
    }
}
