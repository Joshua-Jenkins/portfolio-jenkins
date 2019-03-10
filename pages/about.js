import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

class About extends React.Component {
  render() {
    return (
      <BaseLayout className="about-page">
        <BasePage>
          <h1>About Page!</h1>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default About;
