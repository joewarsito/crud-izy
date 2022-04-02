import React from "react";

// Styles
import "./style.scss";

// Images
import PlaceholderImg from "../../img/placeholder-user.jpg";
import SortIcon from "../../img/sort-icon.png";

const DataTable = props => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
            <th
              onClick={() => {
                props.onSortChange("name");
              }}
            >
              <span className="column-sort">
                First Name
                <img src={SortIcon} alt="First Name" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("surname");
              }}
            >
              <span className="column-sort">
                Last Name
                <img src={SortIcon} alt="Last Name" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("email");
              }}
            >
              <span className="column-sort">
                E-Mail
                <img src={SortIcon} alt="E-Mail" />
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.foods.length ? (
            props.foods.map(food => (
              <tr key={food.id}>
                <td className="field-avatar">
                  <img
                    src={food.avatar ? food.avatar : PlaceholderImg}
                    alt={food.first_name}
                  />
                </td>
                <td>{food.first_name}</td>
                <td>{food.last_name}</td>
                <td>{food.email}</td>
                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(food);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(food)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <div className="no-record-message">No Record!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
