import React, { useState, useEffect } from "react";
import Users from "./components/users";
import API from "./API";

function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, [users]);

  // функция удаления
  const handleDelete = (userId) =>
    setUsers(users.filter((user) => user._id !== userId));
  // функция избранного bookmark
  const handleToggleBookMark = (id) =>
    setUsers(
      users.map((user) => {
        if (user._id === id) return { ...user, bookmark: !user.bookmark };
        return user;
      })
    );

  return (
    <div>
      {users && (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookMark={handleToggleBookMark}
        />
      )}
    </div>
  );
}
export default App;
