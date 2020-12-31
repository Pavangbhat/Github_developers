import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Axios from "axios";

const Repos = ({ repo_url }) => {
  const [repoList, setRepoList] = React.useState([]);

  const getRepos = async () => {
    const { data } = await Axios.get(repo_url);
    setRepoList(data);
  };
  React.useEffect(() => {
    getRepos();
  }, [repoList]);

  return (
    <ListGroup>
      {repoList.map((repo) => (
        <ListGroupItem key={repo.id}>
          <div className="text-primary">{repo.name}</div>
          <div className="text-secondary">{repo.language}</div>
          <div className="text-info">{repo.description}</div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default Repos;
