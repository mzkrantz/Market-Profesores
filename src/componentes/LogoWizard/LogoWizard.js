import React from 'react';
import ImagenOriginal from "../../data/img/LogoWizard.png"

class LogoWizard extends React.Component {
  render() {
    const { width, height } = this.props;

    return (
      <img
        src={ImagenOriginal}
        alt={"Logo EduWizard"}
        width={width}
        height={height}
        style={{ maxWidth: "100%", height:"auto" }}
      />
    );
  }
}

export default LogoWizard;
