import React, { Component } from "react";

import AppHeader from "../appHeader";
import SearchPanel from "../searchPanel";
import TodoList from "../todoList";
import ItemStatusFilter from "../itemStatusFilter";
import ItemAddForm from "../itemAddForm";

class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch")
    ],
    term: "",
    filter: "all" // all, active, done
  };

  createTodoItem(name) {
    return {
      name: name,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  addItem = name => {
    const newItem = this.createTodoItem(name);

    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newItem];
      return { todoData: newTodoData };
    });
  };

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex(el => el.id === id);
      const newTodoData = [
        ...todoData.slice(0, index),
        ...todoData.slice(index + 1)
      ];
      return { todoData: newTodoData };
    });
  };

  toggleProperty = (array, id, property) => {
    const index = array.findIndex(el => el.id === id);
    const oldItem = array[index];
    const newItem = { ...oldItem, [property]: !oldItem[property] };
    return [...array.slice(0, index), newItem, ...array.slice(index + 1)];
  };

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "important") };
    });
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "done") };
    });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter(item => item.name.toLowerCase().indexOf(term) > -1);
  }

  onSearchTermChange = term => {
    this.setState({ term });
  };

  onFilterChange = filter => {
    this.setState({ filter });
  };

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter(item => !item.done);
      case "done":
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneItemsCount = todoData.filter(item => item.done).length;
    const todoCount = todoData.length - doneItemsCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneItemsCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchTermChange={this.onSearchTermChange} />
          <ItemStatusFilter
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
