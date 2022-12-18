import React, { useState, useEffect } from "react";
import API from "../../../API";
import PropTypes from "prop-types";
import Comments from "../../ui/comments";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, []);

  if (user) {
    return (
      <div>
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard user={user} />
              <QualitiesCard data={user.qualities} />
              <MeetingsCard value={user.completedMeetings} />
            </div>
            <div className="col-md-8">
              <Comments />
            </div>
          </div>
        </div>
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
