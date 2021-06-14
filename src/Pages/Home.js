import './Home.css';
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Nav, Row, NavDropdown, Container } from 'react-bootstrap';
import AddButton from '../Components/AddButton';
import ModalView from '../Components/ModalView';
import ModalInnerView from '../Components/ModalInnerView';
import ModalToDoDetailsView from '../Components/ModalToDoDetailsView';
import Search from '../Components/Search';
import ToDoFilter from '../Components/ToDoFilter';
import ToDoList from '../Components/TodoList';
import AuthContext from '../Context/AuthContext';


function Home(props) {
  let [email, setEmail] = useState(localStorage.getItem("email") || sessionStorage.getItem("email"));
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [allTodos, setAllTodos] = useState(JSON.parse(localStorage.getItem("todos"))?.filter(function (item) {
    return (item.userEmail == email);
  }) || []);
  let [showTodoType, setShowTodoType] = useState("All");
  let [todoType, setTodoType] = useState(["All", "Uncompleted", "Completed"]);
  let [searchTerm, setSearchTerm] = useState("");
  let [showDetailsModal, setShowDetailsModal] = useState(false);
  let [showDetailsOf, setShowDetailsOf] = useState("");

  const onTitleChange = (title) => setTitle(title);

  const onDescChange = (description) => setDescription(description);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const resetData = () => (setTitle(""), setDescription(""));


  const completedToDo = (id) => {
    const todoIndex = allTodos.findIndex(todo => todo.id === id);
    let todo = allTodos[todoIndex];
    todo.completed = true;
    updateLocalStorage(todo);
    updateTodo();
    setAllTodos(JSON.parse(localStorage.getItem("todos")).filter(function (item) {
      return (item.userEmail == email);
    }));
  };

  const addTodo = () => {
    let todoItem = {};
    if (!title) return;
    const previousList = allTodos;
    let date = new Date();
    const id = date.valueOf();
    todoItem = { id: id, title, description, completed: false, userEmail: email, date: Date.now() };
    addLocalStorage(todoItem);
    updateTodo();
    toggleModal();
    resetData();
  };

  const updateTodo = () => setAllTodos(JSON.parse(localStorage.getItem("todos")).filter(function (item) {
    return (item.userEmail == email);
  }));

  const addLocalStorage = (todo) => {
    let list = JSON.parse(localStorage.getItem("todos")) || [];
    list.push(todo);
    localStorage.setItem("todos", JSON.stringify(list));
  };

  const updateLocalStorage = (todo) => {
    let list = JSON.parse(localStorage.getItem("todos"));
    let newList = list.filter(todos => todos.id !== todo.id);
    newList.push(todo);
    localStorage.setItem("todos", JSON.stringify(newList));
  }

  const deleteLocalStorage = (id) => {
    let list = JSON.parse(localStorage.getItem("todos"));
    let newList = list.filter(todos => todos.id !== id);
    localStorage.setItem("todos", JSON.stringify(newList));
  }

  const deleteTodo = (id) => {
    deleteLocalStorage(id);
    updateTodo();
  };

  const todosToShow = (type) => setShowTodoType(type);


  const fiilerTodosToShow = (type) => {
    switch (type) {
      case "Completed":
        return allTodos.filter(todo => todo.completed === true);
      case "Uncompleted":
        return allTodos.filter(todo => todo.completed === false);
      default:
        return allTodos;
    }
  };

  const searchTodo = (e) => setSearchTerm(e.target.value);


  const filterWithSearchTerm = (searchTerm, toDoList) => {
    const pattern = new RegExp(`^.*${searchTerm}.*$`);
    return toDoList.filter(item => {
      if (pattern.test(item.title) || pattern.test(item.description)) {
        return item;
      }
    });
  };

  const todoToView = (id) => {
    const detailsToShow = allTodos.filter(todo => todo.id === id);
    setShowDetailsModal(!showDetailsModal);
    setShowDetailsOf(detailsToShow);
  };

  const listOfTodos = filterWithSearchTerm(
    searchTerm,
    fiilerTodosToShow(showTodoType)
  );

  const context = useContext(AuthContext);
  return (
    <div className="home-wrapper">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">ToDo's</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link ><Link className="cal-navbar" to="/CalendarTodo">Calendar</Link></Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown alignRight title="My Account" id="basic-nav-dropdown">
              <Link className="dropdown-item" to="/logout">Logout ({context.email})</Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid className="flex-fill">
        <Row className="h-100">
          <div className="todo-wrapper">
            <ToDoFilter
              buttonArray={todoType}
              onClick={todosToShow}
              btnActive={showTodoType}
            />
            {listOfTodos.length > 1 || searchTerm !== "" ? (
              <Search onChange={searchTodo} />
            ) : null}
            <ToDoList
              todos={listOfTodos}
              deleteTodo={deleteTodo}
              completedToDo={completedToDo}
              viewToDo={todoToView}
            />
            {!isModalOpen && !showDetailsModal && (
              <AddButton onClick={toggleModal} />
            )}
            <ModalView isVisible={isModalOpen}>
              <ModalInnerView
                title={title}
                description={description}
                onTitleChange={onTitleChange}
                OnDescChange={onDescChange}
                add={addTodo}
                reset={resetData}
                cancel={toggleModal}
              />
            </ModalView>
            <ModalView isVisible={showDetailsModal}>
              <ModalToDoDetailsView
                detailsToView={showDetailsOf}
                cancel={() => setShowDetailsModal(!showDetailsModal)}
              />
            </ModalView>
          </div>
        </Row>
      </Container>
    </div>
  );
}


export default Home;