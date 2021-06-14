import { Calendar, Badge } from "antd";
import "./Calendar.css";
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Row, NavDropdown, Container } from 'react-bootstrap';



const CalendarTodo = (props) => {
  function getListData(value) {
    let listData = [];
    for (let i = 0; i <= allTodos.length; i++) {
      let todo = allTodos[i];
      let dateOfTodo = new Date(allTodos[i]?.date).toLocaleDateString("tr-TR");
      let dayOfTodo = dateOfTodo.substring(0, 2);
      dayOfTodo = parseInt(dayOfTodo);
      let monthOfTodo = parseInt(dateOfTodo.substring(3, 5));
      let yearOfTodo = parseInt(dateOfTodo.substr(6, 10));
      let newCalendarTodo = { type: "warning", content: todo?.title };
      if (
        value.date() === dayOfTodo &&
        value.month() === monthOfTodo - 1 &&
        value.year() === yearOfTodo
      ) {
        listData.push(newCalendarTodo);
      }
    }
    return (
      listData || []
    );
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  function NavApp() {
    return (
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
              <Link className="dropdown-item" to="/logout">Logout</Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  const { allTodos } = props;
  return (
    <NavApp />,
    <Calendar dateCellRender={dateCellRender} />
  );
};

export default CalendarTodo;