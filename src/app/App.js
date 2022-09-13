import React, { useState } from "react";
import Users from "./components/users";
import SeachStatus from "./components/seachStatus";
import API from "./API";

function App() {
  const [users, setUsers] = useState(API.users.fetchAll());

  // функция удаления
  const handleDelete = (userId) =>
    setUsers(users.filter((user) => user._id !== userId));
  // функция избранного
  const handleToggleBookMark = (id) =>
    setUsers(
      users.map((user) => {
        if (user._id === id) return { ...user, bookmark: !user.bookmark };
        return user;
      })
    );

  return (
    <div>
      <SeachStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />
    </div>
  );
}
export default App;
