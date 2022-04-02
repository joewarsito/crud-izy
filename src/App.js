import React from "react";

//Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    // Fetch Food
    // const fetchFoods = async () => {
    //   setLoading(true);
  
    //   try {
    //     await getFoods().then(({ data }) => {
    //       setSavedFoods(data.data);
    //       dispatch({ type: "SET_USERS", data: data.data });
    //     });
    //   } catch (err) {
    //     MySwal.fire({
    //       icon: "error",
    //       title: "Failed to fetch users."
    //     });
    //   } finally {
    //     setTimeout(() => {
    //       setLoading(false);
    //     }, 500);
    //   }
    // };
  
    // useEffect(() => {
    //   fetchFoods();
    // }, []);
  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
