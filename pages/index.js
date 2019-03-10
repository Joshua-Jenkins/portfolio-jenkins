import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Index extends React.Component {
  render() {
    return (
      <BaseLayout>
        <h1>I am Index Page from Class Component</h1>
        <Button color="danger">Danger</Button>
      </BaseLayout>
    );
  }
}

export default Index;
