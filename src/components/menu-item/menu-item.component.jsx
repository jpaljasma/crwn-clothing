import React from "react";
import { withRouter } from "react-router-dom"; // withRouter is a higher order component

import "./menu-item.styles.scss";

// by using withRouter HOC we now have access to history and match from Route
const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
  return (
    <div
      className={`menu-item ${size || ""}`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">Shop Now</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
