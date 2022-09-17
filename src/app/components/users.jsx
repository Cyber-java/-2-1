import React from "react";
import { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";

const Users = ({ users, ...rest }) => {
  const count = users.length; //общее кол-во user
  const pageSize = 4; //кол-во user на странице
  //currentPage - срез пользователей котрых хотим отобразить(или текущая страница) и в useState указываем 1 страницу по умолчанию
  const [currentPage, setCurrentPage] = useState(1);
  //функция перелистывания страницы по клику
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex); // обновленное состояние страницы после ее выбора
  };
  //Вызываем метод Пагинации и передаем параметры, получаем массив из 4-х пользователей
  const userCrop = paginate(users, currentPage, pageSize);

  return (
    <>
      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился,раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              <User key={user._id} {...user} {...rest} />
            ))}
          </tbody>
        </table>
      )}
      <Pagination //компонет пагинации(разделения на страницы)
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange} // отлавливает клик на страницу
      />
    </>
  );
};

export default Users;
