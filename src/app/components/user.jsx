import React from "react";
import PropTypes from "prop-types";
import Qualities from "./qualities";
import Bookmark from "./bookmark";

const User = ({
  _id,
  name,
  profession,
  qualities,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToggleBookMark,
}) => {
  return (
    <>
      <tr key={_id}>
        <td>{name}</td>
        <td>
          {qualities.map((item) => (
            <Qualities key={item._id} {...item} />
          ))}
        </td>
        <td>{profession.name}</td>
        <td>{completedMeetings}</td>
        <td>{rate} /5</td>
        <td>
          <Bookmark status={bookmark} onClick={() => onToggleBookMark(_id)} />
        </td>
        <td>
          <button onClick={() => onDelete(_id)} className="btn btn-danger">
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profession: PropTypes.object.isRequired,
  qualities: PropTypes.array.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  bookmark: PropTypes.bool,
  onToggleBookMark: PropTypes.func.isRequired,
};
export default User;
