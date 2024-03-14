import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../utils/types";
import { userServiceLogic } from "../services/index";

const UserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    _id: -1,
    name: "",
    username: "",
    email: "",
  });

  const navigate = useNavigate();
  let { userId } = useParams<"userId">();
  let userIdNumber = userId ? parseInt(userId, 10) : 0;
  if (isNaN(userIdNumber)) {
    userIdNumber = 0;
  }

  useEffect(() => {
    const fetchUserData = async (id: number) => {
      const userData = await userServiceLogic.getUserById(id);
      setUser(userData);
    };

    if (userIdNumber) {
      fetchUserData(userIdNumber);
    }
  }, [userIdNumber]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", user);
    if (user._id) {
      userServiceLogic.updateUser(user).then((res) => {
        console.log("success, user updated", res);
        navigate(`/users`);
      });
    } else {
      //   createUser(user); // Implement this function based on your API
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1">
        {userIdNumber ? "Edit User" : "Add User"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="Name"
          value={user.name || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="username"
          label="Username"
          value={user.username || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="email"
          label="Email"
          value={user.email || ""}
          onChange={handleChange}
        />
        {/* Add more fields as needed */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          {userIdNumber ? "Update" : "Create"}
        </Button>
      </form>
    </Container>
  );
};

export default UserForm;
