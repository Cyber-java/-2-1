import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../API";
import Qualities from "../../ui/qualities";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  });
  const handleClick = () => {
    history.push("/users");
  };
  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Профессия:{user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings} </p>
        <h2>rate:{user.rate}</h2>
        <button onClick={handleClick}>Все пользователи</button>
      </div>
    );
  } else {
    return <h1>Loding</h1>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPage;
