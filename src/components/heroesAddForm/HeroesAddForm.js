import { v4 as uuidv4 } from "uuid";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { createHero } from "../../actions";

const HeroesAddForm = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [element, setElement] = useState("");

  const submitingNewHero = (e) => {
    e.preventDefault();

    const newHero = {
      name: name,
      description: description,
      element: element,
      id: uuidv4(),
    };

    const dataToSend = JSON.stringify(newHero);

    dispatch(createHero(dataToSend));
    request("http://localhost:3001/heroes", "POST", dataToSend)
      .then((answ) => console.log("Sucsec" + answ))
      .then(dispatch(createHero(newHero)))
      .catch((err) => console.log(err));

    setName("");
    setDescription("");
    setElement("");
  };

  return (
    <form
      onSubmit={(e) => submitingNewHero(e)}
      className="border p-4 shadow-lg rounded"
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          required
          value={name}
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          required
          value={description}
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          value={element}
          className="form-select"
          id="element"
          name="element"
          onChange={(e) => setElement(e.target.value)}
        >
          <option>Я владею элементом...</option>
          <option value="fire">Огонь</option>
          <option value="water">Вода</option>
          <option value="wind">Ветер</option>
          <option value="earth">Земля</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
