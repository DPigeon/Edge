import React from 'react';

export default (props) => {
    if (!props.user) {
      return <div className="user-detail detail-view"><span>No user selected</span></div>;
    }

    const { firstname, lastname, age } = props.user;

    const childName = props.user.xxxxxxxxxxx ? props.user.xxxxxxxxxxxxx.join(', ') : '';// insted of xxxxxxxxxx need to add a rout to the children of the person

    return (
      <div className="user-detail detail-view">
        <h4>Profile for: {firstname} {lastname}</h4>
        <div>
          <ul>
            <li><b>Parent of: </b>: {allegiances}</li>
            <li><b>Age</b>: {age}</li>
          </ul>
        </div>
      </div>
    );
}

