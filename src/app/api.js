import axios from "axios";

const apiURL = process.env.MOCKAPI;

function getFoods() {
  const response = axios.get(`${apiURL}/v1/Menu`);

  return response;
}

function getCreatedFood({ first_name, last_name, email }) {
  const response = axios.post(`${apiURL}/v1/Menu`, {
    email,
    first_name,
    last_name
  });

  return response;
}

function getUpdatedFood(id, food) {
  const response = axios.put(`${apiURL}/v1/Menu/${id}`, {
    avatar: food.avatar,
    id: id,
    email: food.email,
    first_name: food.first_name,
    last_name: food.last_name
  });

  return response;
}

function getDeletedFood(id) {
  const response = axios.delete(`${apiURL}/v1/Menu/${id}`);

  return response;
}

export { getFoods, getCreatedFood, getUpdatedFood, getDeletedFood };
