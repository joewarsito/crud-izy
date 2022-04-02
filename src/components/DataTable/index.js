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
                Name
                <img src={SortIcon} alt="Name" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("description");
              }}
            >
              <span className="column-sort">
                Description
                <img src={SortIcon} alt="Description" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("price");
              }}
            >
              <span className="column-sort">
                Price
                <img src={SortIcon} alt="Price" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("hotel");
              }}
            >
              <span className="column-sort">
                Hotel
                <img src={SortIcon} alt="Hotel" />
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.menus.length ? (
            props.menus.map(menu => (
              <tr key={menu.id}>
                <td className="field-avatar">
                  <img
                    src={menu.imageUrl ? menu.imageUrl : PlaceholderImg}
                    alt={menu.name}
                  />
                </td>
                <td>{menu.name}</td>
                <td>{menu.description}</td>
                <td>{menu.price}</td>
                <td>{menu.hotel}</td>
                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(menu);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(menu)}
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
