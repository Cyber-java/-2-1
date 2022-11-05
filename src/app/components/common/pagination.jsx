import React from "react";
import _ from "lodash"; // импорт lodash
import PropTypes from "prop-types"; // импортируем типы

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  // Кол-во страниц(pageCount) получаем,общее кол-во пользователей(itemsCount) на кол-во user на странице(pageSize)
  // и Math.ceil чтобы округлить до целого числа в большую сторону
  const pageCount = Math.ceil(itemsCount / pageSize);
  // добавим условие, если страница всего одна, то скрыть пагинацию
  if (pageCount === 1) return null;
  // Массив страниц(pages)используем библиотеку lodash и метод range, который позволяет из числа сделать массив.
  // в методе указываем число с которого начинается и число которым заканчиватся массив
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(
          (
            page // чтобы отобразить кнопки страниц используем map и в li обязательно указываем key т.к. это массив
          ) => (
            <li
              className={"page-item" + (page === currentPage ? " active" : "")} // добавим класс active для закрашивания номера выбранной страницы
              key={"page_" + page}
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li> // onClick делаем через callback функцию чтобы отображать номера страницы
          )
        )}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Pagination;
