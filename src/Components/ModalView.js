import React from "react";

const ModalView = props => {
  return (
    <div className={`${props.isVisible ? 'modal' : 'modal-closed'}`}>
      <div className="modal-container">{props.children}</div>
    </div>
  );
};

export default ModalView;