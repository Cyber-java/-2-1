import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../page/userPage";
import UsersListPage from "../page/userListPage";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>;
};

export default Users;
