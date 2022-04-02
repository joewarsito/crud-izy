import axios from "axios";

const apiURL = "https://624589316b7ecf057c1f9fa6.mockapi.io/api/v1";
// console.log(apiURL)
function getMenus() {
  const response = axios.get(`${apiURL}/Menu`);

  return response;
}

function getCreatedMenu({ name, description, price, hotel }) {
  const response = axios.post(`${apiURL}/Menu`, {
    name,
    description,
    price,
    hotel
  });

  return response;
}

function getUpdatedMenu(id, menu) {
  const response = axios.put(`${apiURL}/Menu/${id}`, {
    avatar: menu.avatar,
    id: id,
    name: menu.name,
    description: menu.description,
    price: menu.price,
    hotel: menu.hotel
  });

  return response;
}

function getDeletedMenu(id) {
  const response = axios.delete(`${apiURL}/Menu/${id}`);

  return response;
}

export { getMenus, getCreatedMenu, getUpdatedMenu, getDeletedMenu };
