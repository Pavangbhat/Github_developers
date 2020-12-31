import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  CardFooter,
} from "reactstrap";

import firebase from "firebase/app"; //use for init
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../Context/UserContext";
import { Bounce } from "react-activity";
import "react-activity/dist/react-activity.css";

const Signin = () => {
  const Context = React.useContext(UserContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [activityIndicator, setActivityIndicator] = React.useState(false);

  const handelSignup = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        Context.setUser({
          email: response.user.email,
          uid: response.user.uid,
        });
        setActivityIndicator(false);
      })
      .catch((err) => {
        console.log(err);
        setActivityIndicator(false);
        toast(err.message, {
          type: "error",
        });
      });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setActivityIndicator(true);
    handelSignup();
  };
  if (Context.user?.email) {
    return (
      <>
        {toast("Signin successfull", {
          type: "info",
        })}
        <Redirect to="/" />
      </>
    );
  } else {
    if (activityIndicator) {
      return (
        <Container className="text-center">
          <Bounce color="grey" speed={1} animating={true} />
        </Container>
      );
    }else
      {
        return (
          <Container className="text-center">
            <Row>
              <Col lg={6} className="offset-lg-3 mt-5">
                <Card>
                  <Form onSubmit={handelSubmit}>
                    <CardHeader className="">Signin</CardHeader>
                    <CardBody>
                      <FormGroup row>
                        <Label for="email" sm={3}>
                          Email
                        </Label>
                        <Col sm={9}>
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="provide your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="password" sm={3}>
                          Password
                        </Label>
                        <Col sm={9}>
                          <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="your password here"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Col>
                      </FormGroup>
                    </CardBody>
                    <CardFooter>
                      <Button type="submit" block color="primary">
                        Signin
                      </Button>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        );
      }
    }
  
};

export default Signin;
