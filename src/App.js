import React from "react";

//Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable";
import Modal from "./components/Modal";

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const [loading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    id: null,
    avatar: null,
    first_name: "",
    last_name: "",
    email: ""
  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedUsers, setSavedUsers] = useState(users);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const usersLastIndex = currentPage * pageSize;
  const usersFirstIndex = usersLastIndex - pageSize;
  const currentUsers = users.slice(usersFirstIndex, usersLastIndex);
    // Fetch Food
    const fetchFoods = async () => {
      setLoading(true);
  
      try {
        await getFoods().then(({ data }) => {
          setSavedFoods(data.data);
          dispatch({ type: "SET_USERS", data: data.data });
        });
      } catch (err) {
        MySwal.fire({
          icon: "error",
          title: "Failed to fetch users."
        });
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
  
    useEffect(() => {
      fetchFoods();
    }, []);
  return (
    <div className="App">
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
                  onClick={() => setModal("Create User")}
                >
                  Create New User
                </button>
              </div>
              <DataTable
                users={currentUsers}
                updateRow={updateRow}
                deleteRow={deleteRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={users.length}
                currentPage={currentPage}
                pageSize={pageSize}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
