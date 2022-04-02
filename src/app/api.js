import axios from "axios";

const apiURL = process.env.MENUAPI;

function getMenus() {
  const response = axios.get(`${apiURL}/Menu`);

  return response;
}

function getCreatedMenu() {
  const response = axios.post(`${apiURL}/Menu`, {
    
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
