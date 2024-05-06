package student.mangement.code.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import student.mangement.code.model.Role;
import student.mangement.code.repository.RoleRepository;
import student.mangement.code.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleRepository roleRepository;

    @Override
    public Role findRoleByAuthority(String authority) {
        Optional<Role> role = roleRepository.findByAuthority(authority);
        return role.isEmpty() ? null : role.get();

    }

}
