import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import API from "../../../API";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAriaField";
const initialData = { userId: "", content: "" };

const AddCommentsList = ({ onSubmit }) => {
  const [data, setData] = useState(initialData);
  const [users, setUsers] = useState({});
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    userId: {
      isRequired: {
        message: "Выберите от чьего имени хотите отправить сообщение",
      },
    },
    content: {
      isRequired: {
        message: "Сообщение не может быть пустым",
      },
    },
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  useEffect(() => {
    API.users.fetchAll().then(setUsers);
  }, []);
  const clearForm = () => {
    setData(initialData);
    setErrors({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };
  const arrayOfUsers =
    users &&
    Object.keys(users).map((userId) => ({
      label: users[userId].name,
      value: users[userId]._id,
    }));
  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          label=""
          onChange={handleChange}
          options={arrayOfUsers}
          name="userId"
          value={data.userId}
          defaultOption="Выберите пользователя"
          error={errors.userId}
        />
        <TextAreaField
          name="content"
          onChange={handleChange}
          value={data.content}
          label="Сообщение"
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Опубликовать</button>
        </div>
      </form>
    </div>
  );
};

AddCommentsList.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddCommentsList;
