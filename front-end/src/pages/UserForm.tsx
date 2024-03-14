import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/types";
import { userServiceLogic } from "../services/index";
import useParsedParam from "../utils/useParsedParam";

const UserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    _id: -1,
    name: "",
    username: "",
    email: "",
  });

  const navigate = useNavigate();
  const userId = useParsedParam("userId");

  useEffect(() => {
    const fetchUserData = async (id: number) => {
      const userData = await userServiceLogic.getUserById(id);
      setUser(userData);
    };

    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", user);
    if (user.name && user.username && user.email) {
      if (user._id && user._id !== -1) {
        userServiceLogic.updateUser(user).then((res) => {
          console.log("success, user updated", res);
          navigate(`/users`);
        });
      } else {
        userServiceLogic.createUser(user).then((res) => {
          console.log("success, user added", res);
          navigate(`/users`);
        });
      }
    } else {
      alert("Form cannot be submitted with empty fields");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1">
        {userId ? "Edit User" : "Add User"}
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          {userId ? "Update" : "Create"}
        </Button>
      </form>
    </Container>
  );
};

export default UserForm;
