import React, { useState, useEffect } from "react";

const DeleteMenu = props => {
  const [menu, setMenu] = useState(props.currentMenu);

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setMenu(props.currentMenu);
  }, [props]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.deleteMenu(menu.id);
      }}
    >
      <div className="form-group">
        Are you sure you want to delete {menu.name}?
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Delete</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DeleteMenu;
