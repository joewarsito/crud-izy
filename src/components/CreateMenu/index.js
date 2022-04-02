import React, { useState } from "react";

const CreateMenu = props => {
  const initialData = { id: null, name: "", description: "", price: "" };
  const [menu, setMenu] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;

    setMenu({ ...menu, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        // if (!menu.first_name || !menu.last_name) return;
        // props.createMenu(menu);
      }}
    >
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={menu.name}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={menu.description}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="text"
          name="price"
          value={menu.price}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Hotel</label>
        <input
          type="text"
          name="hotel"
          value={menu.hotel}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Create</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateMenu;
