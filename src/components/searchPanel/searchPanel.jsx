import React, { Component } from "react";
import "./search-panel.css";

class SearchPanel extends Component {
  state = {
    term: ""
  };

  onChange = e => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchTermChange(term);
  };

  render() {
    return (
      <input
        type="text"
        placeholder="Search.."
        className="form-control search-input"
        value={this.state.term}
        onChange={this.onChange}
      />
    );
  }
}

export default SearchPanel;
