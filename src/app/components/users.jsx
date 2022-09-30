import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import GroupList from "./groupList";
import API from "../API";
import SearchStatus from "./seachStatus";

const Users = ({ users: allUsers, ...rest }) => {
  // currentPage - срез пользователей котрых хотим отобразить(или текущая страница) и в useState указываем 1 страницу по умолчанию
  const [currentPage, setCurrentPage] = useState(1);
  // хук для пользователей
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 2; // кол-во user на странице
  // функция перелистывания страницы по клику
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex); // обновленное состояние страницы после ее выбора
  };
  // отслеживает нажатие меню профессий
  const handleProfessionsSelect = (item) => {
    setSelectedProf(item);
  };
  // хук который вызывается каждый раз когда мы монтируем что-то в DOM(т.е когда компонент появляется,
  // изменяется или удаляется(return доп. функция),можно отслеживать опредленный объект если в конце разместить массив
  // если массив пустой то функция вызовется только один раз)
  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  // фильтрация
  const filteredUsers = selectedProf
    ? allUsers.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
    : allUsers;
  // общее кол-во user
  const count = filteredUsers.length;
  // Вызываем метод Пагинации и передаем параметры, получаем массив из 4-х пользователей
  const userCrop = paginate(filteredUsers, currentPage, pageSize);
  const r = allUsers.filter((user) => JSON.stringify(user.profession));
  console.log(r);
  console.log(JSON.stringify(selectedProf));
  // кнопка очистить
  const clearFilter = () => {
    setSelectedProf();
  };
  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionsSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus length={count} />
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
        <div className="d-flex justify-content-center">
          <Pagination // компонет пагинации(разделения на страницы)
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange} // отлавливает клик на страницу
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array,
};

export default Users;
