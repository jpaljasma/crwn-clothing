import React from 'react'

const NotFound = ({ location, match }) => {
  return (
    <div className="error">
      <h1>404</h1>
      <p>
        The requested document <code>{location.pathname}</code> was not found.
      </p>
      <p>
        Please proceed to <a href={match.url}>home page</a>.
      </p>
    </div>
  );
};

export default NotFound;
