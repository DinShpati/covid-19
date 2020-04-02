import React from 'react';
import '../style.css';

function ShowDetail() {
  return (
    <div className="loader center">
      <h3>Please wait...Gathering data...</h3>
      <i className="fa fa-virus fa-spin" />
    </div>
  );
}

export default ShowDetail;