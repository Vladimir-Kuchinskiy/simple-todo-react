import React, { Component } from "react";

import "./itemAddForm.css";

class ItemAddForm extends Component {
  state = { name: "" };

  onInputChange = e => {
    this.setState({ name: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({ name: "" });
  };

  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onInputChange}
          value={this.state.name}
          placeholder="What needs to be done?"
        />
        <button className="btn btn-outline-secondary">Add Item</button>
      </form>
    );
  }
}

export default ItemAddForm;
