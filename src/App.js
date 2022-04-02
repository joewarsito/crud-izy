import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMenus,
  getCreatedMenu,
  getUpdatedMenu,
  getDeletedMenu
} from "./app/api";

// Styles
import "./app.scss";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable";
import CreateMenu from "./components/CreateMenu";
import UpdateMenu from "./components/UpdateMenu";
import DeleteMenu from "./components/DeleteMenu";
import Modal from "./components/Modal";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import MySwal from "./index";

function App() {
  const dispatch = useDispatch();
  const menus = useSelector(state => state.menus);
  // console.log(menus, 'iajsojdosa')

  const [loading, setLoading] = useState(false);

  const [currentMenu, setCurrentMenu] = useState({
    id: null,
    imageUrl: null,
    name: "",
    description: "",
    hotel: "",
    price: ""
  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedMenus, setSavedMenus] = useState(menus);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const menusLastIndex = currentPage * pageSize;
  const menusFirstIndex = menusLastIndex - pageSize;
  const currentMenus = menus.slice(menusFirstIndex, menusLastIndex);
  console.log(currentMenus, 'jdjsdjjdshjk')

  // Setting up Modal
  const setModal = modal => {
    search("");
    setActiveModal({ name: modal, active: true });
  };

  console.log(activeModal, 'modal')
  // Pagination
  const paginate = page => {
    setCurrentPage(page);
  };

  // Search
  const search = term => {
    if (term.length > 2) {
      setCurrentPage(1);

      const results = savedMenus.filter(menu =>
        Object.keys(menu).some(key =>
          menu[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_MENUS", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_MENUS", data: savedMenus });
    }
  };

  // Sorting
  const sorting = key => {
    setSorted(!sorted);
    switch (key) {
      case "name":
        const nameSort = [...savedMenus].sort((a, b) => {
          return sorted
            ? a.name.localeCompare(b.name, "tr")
            : b.name.localeCompare(a.name, "tr");
        });
        dispatch({ type: "SET_MENUS", data: nameSort });
        return;
      case "description":
        const descriptionSort = [...savedMenus].sort((a, b) => {
          return sorted
            ? a.description.localeCompare(b.description, "tr")
            : b.description.localeCompare(a.description, "tr");
        });
        dispatch({ type: "SET_MENUS", data: descriptionSort });
        return;
      case "price":
        const priceSort = [...savedMenus].sort((a, b) => {
          return sorted
            ? a.price.localeCompare(b.price, "tr")
            : b.price.localeCompare(a.price, "tr");
        });
        dispatch({ type: "SET_MENUS", data: priceSort });
        return;
      case "hotel":
        const hotelSort = [...savedMenus].sort((a, b) => {
          return sorted
            ? a.hotel.localeCompare(b.hotel, "tr")
            : b.hotel.localeCompare(a.hotel, "tr");
        });
        dispatch({ type: "SET_MENUS", data: hotelSort });
        return;
      default:
        break;
    }
  };

  // Create Menu
  const createMenu = async menu => {
    setActiveModal(false);
    setLoading(true);
    // console.log('create menu')
    try {
      await getCreatedMenu(menu).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Menu created successfully."
        }).then(() => {
          dispatch({ type: "CREATE_MENU", data: result });
          setSavedMenus([...menus, result]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create menu."
      });
    } finally {
      setLoading(false);
    }
  };

  // Update Menu
  const updateRow = menu => {
    setModal("Update Menu");

    setCurrentMenu({
      id: menu.id,
      name: menu.name,
      description: menu.description,
      price: menu.price,
      hotel: menu.hotel
    });
  };

  const updateMenu = async (id, updatedMenu) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedMenu(id, updatedMenu).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Menu updated successfully."
        }).then(() => {
          dispatch({
            type: "SET_MENUS",
            data: menus.map(menu =>
              menu.id === id ? Object.assign(menu, result) : menu
            )
          });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update menu."
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete Menu
  const deleteRow = menu => {
    setModal("Delete Menu");

    setCurrentMenu({
      id: menu.id,
      avatar: menu.avatar,
      description: menu.description,
      price: menu.price,
      hotel: menu.hotel
    });
  };

  const deleteMenu = async id => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getDeletedMenu(id).then(() => {
        MySwal.fire({
          icon: "success",
          title: "Menu deleted successfully."
        }).then(() => {
          dispatch({
            type: "SET_MENUS",
            data: menus.filter(menu => menu.id !== id)
          });
          setSavedMenus(savedMenus.filter(menu => menu.id !== id));
          setCurrentPage(1);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to delete menu."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Menu
  const fetchMenus = async () => {
    setLoading(true);
    // console.log("adafa")
    try {
      await getMenus().then(({ data }) => {
        setSavedMenus(data);
        console.log(data, 'data')
        // console.log(data);
        dispatch({ type: "SET_MENUS", data: data });
        // console.log("string")
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch menus."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchMenus();
    // console.log(fetchMenus)
  },[]);

  return (
    <div className="app">
      <Header />
      <main className="content">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="content-wrapper">
              <div className="toolbar">
                <Search search={search} resetSearch={search} />
                <button
                  className="primary-btn"
                  onClick={() => setModal("Create Menu")}
                  // onClick={() => alert('tess')}
                >
                  Create New Menu
                </button>
              </div>
              <DataTable
                menus={currentMenus}
                updateRow={updateRow}
                deleteRow={deleteRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={menus.length}
                currentPage={currentPage}
                pageSize={pageSize}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </main>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "Create Menu" && (
            <CreateMenu
              createMenu={createMenu}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update Menu" && (
            <UpdateMenu
              currentMenu={currentMenu}
              updateMenu={updateMenu}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete Menu" && (
            <DeleteMenu
              currentMenu={currentMenu}
              deleteMenu={deleteMenu}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default App;
