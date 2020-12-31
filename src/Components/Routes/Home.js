import React, { useState, useContext } from "react";
import Axios from "axios";

import {
  Row,
  Container,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";

import { Redirect } from "react-router-dom";
import UserCard from "../Ui/UserCard";
import Repos from "../Ui/Repos";
import { toast } from "react-toastify";
import UserContext from "../Context/UserContext";
import { Bounce } from "react-activity";

const Home = () => {
  const Context = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [activityIndicator, setActivityIndicator] =useState(false);

  const hitApi = async () => {
    try {
      setActivityIndicator(true);
      const { data } = await Axios.get(`https://api.github.com/users/${query}`);
      setUser(data);
      setActivityIndicator(false);
     
    } catch (err) {
      setActivityIndicator(false);
      toast("User not found", {
        type: "error",
      });
      setUser(null)
    }
  };
  if(Context.user){
    if(activityIndicator){
      return (
        <Container className="text-center mt-1">
          <Bounce color="grey" speed={1} animating={true} />
        </Container>
      );
    }else{
      return (
        <Container>
          <Row className=" mt-3">
            <Col md="5">
              <InputGroup>
                <Input
                  type="text"
                  value={query}
                  placeholder="Please provide the username"
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={hitApi}>
                    Fetch User
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              {user ? <UserCard user={user} /> : null}
            </Col>
            <Col md="7">{user ? <Repos repo_url={user.repos_url} /> : null}</Col>
          </Row>
        </Container>
      );
    }}else{
      return <Redirect to="/signin" />
  }
};

export default Home;
