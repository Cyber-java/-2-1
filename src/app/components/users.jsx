import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import UserTable from "./usersTable";
import _ from "lodash";
import GroupList from "./groupList";
import API from "../API";
import SearchStatus from "./seachStatus";

const Users = () => {
  // currentPage - срез пользователей котрых хотим отобразить(или текущая страница) и в useState указываем 1 страницу по умолчанию
  const [currentPage, setCurrentPage] = useState(1);
  // хук для профессий
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  // хук для сортировки, первым параметром идет итератор по которому будем сортировать,вторым параметром будет направление сортировки
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 8; // кол-во user на странице
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

  // метод сортировки
  const handleOnSort = (item) => {
    setSortBy(item);
  };
  if (users) {
    // фильтрация
    const filteredUsers = selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users;

    // общее кол-во user
    const count = filteredUsers.length;
    // сортировка, первым параметром передаем отфильтрованных пользователей, вторым параметром указываем по какому
    // значению будет происходить сортировка и третьим параметром передаем массив направления(по алф-ту или обратно)
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    // Вызываем метод Пагинации и передаем параметры, получаем массив из 4-х пользователей
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
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
            <UserTable
              users={userCrop}
              onSort={handleOnSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
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
  }
  return "loading";
};

Users.propTypes = {
  users: PropTypes.array,
};

export default Users;
