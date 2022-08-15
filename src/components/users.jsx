import React, { useState } from "react";
import API from "../API";

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());

  // функция удаления
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user !== userId));
  };

  // смена фразы в заголовке
  const renderPhrase = (number) => {
    return number === 4
      ? "человекa "
      : number === 3
      ? "человекa "
      : number === 2
      ? "человекa "
      : "человек ";
  };

  // меняем цвет заголовка
  const getBadgeClasses = () => {
    let classes = "badge m-2 ";
    classes += users.length === 0 ? "bg-success" : "bg-primary";
    return classes;
  };
  // Заголовок
  const Heading = () => {
    return (
      <span className={getBadgeClasses()}>
        {users.length} {renderPhrase(users.length)} тусанут с тобой сегодня
      </span>
    );
  };

  return (
    <>
      <h2>{Heading()}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Качества</th>
            <th>Профессия</th>
            <th>Встретился,раз</th>
            <th>Оценка</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <>
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((qualitie) => (
                    <span className={"badge m-2 bg-" + qualitie.color}>
                      {qualitie.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleDelete(user)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
