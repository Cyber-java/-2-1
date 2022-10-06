import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  // метод сортировки
  const handleSort = (item) => {
    // добавим условие для сортировки, если итератор равен текущему значению, то обновляем состояние(setSortBy) беря при
    // этом предыдущее(prevState) если order данного состояния равен asc , то меняем его на desc или asc
    // иначе (else) оставляем его по умолчанию asc
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };
  const renderSortArrow = (selectedSort, currentPath) => {
    if (selectedSort.path === currentPath) {
      if (selectedSort.order === "asc") {
        return <i className="bi bi-caret-down-fill"></i>;
      } else {
        return <i className="bi bi-caret-up-fill"></i>;
      }
    }
    return null;
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            // указатель мыши
            {...{
              role: columns[column].path && "button",
            }}
          >
            {columns[column].name}
            {""}
            {renderSortArrow(selectedSort, columns[column].path)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableHeader;
