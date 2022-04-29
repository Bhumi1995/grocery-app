import { useState, useEffect } from "react";
import Alert from "./components/Alert";
import List from "./components/List";
import "./App.css";
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter text");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
    } else {
      showAlert(true, "success", "item added");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    setList([]);
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id == id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  return (
    <section className="container">
      <div className="grocery-list">
        <h1 className="header">Grocery List</h1>
        <div className="form">
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <input
            type="text"
            placeholder="Add grocery items.."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="grocery-input"
          />
          <button type="submit" onClick={handleSubmit}>
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
        {list.length > 0 && (
          <div className="grocery">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button onClick={clearList} className="clear-btn">
              Clear items
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
