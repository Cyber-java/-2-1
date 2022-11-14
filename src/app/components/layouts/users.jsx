import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../page/userPage";
import UsersListPage from "../page/userListPage";
import Edit from "../page/editUserPage";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  return (
    <>
      {userId ? (
        edit ? (
          <Edit />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  );
};

export default Users;
