import React from "react";
import { Card, CardBody, CardImg, CardText } from "reactstrap";

const UserCard = ({ user }) => {
  return (
    <>
      <Card className="text-center mt-3 mb-20">
        <CardImg src={user.avatar_url} className="img-thumbnail" />
        <CardBody>
          <div className="text-primary">{user.name}</div>
          <div className="text-primary">{user.location}</div>
          <div className="text-primary">{user.bio}</div>
          <div className="text-info">
            Available for hire: {user.hireable ? "YES" : "NOPE"}
          </div>
          <div className="text-info">Following {user.following}</div>
        </CardBody>
      </Card>
      <div className="row">
        <div className="col-sm-8">
          <img
            className="img-fluid"
            src={`https://github-readme-stats.vercel.app/api?username=${user.login}&&show_icons=true&theme=tokyonight `}
          />
        </div>
        <div className="col-sm-8">
          <img
            className="img-fluid"
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&layout=compact&theme=tokyonight`}
          />
        </div>
      </div>
    </>
  );
};

export default UserCard;
