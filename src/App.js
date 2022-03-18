import "./styles.css";
import React, { useState } from "react";

function LikeCounter() {
  const [count, setCount] = useState(0);
  const [superCount, setSuperCount] = useState(0);

  const increment = () => {
    setCount((oldCount) => oldCount + 1);
  };

  const decrement = () => {
    setCount((oldCount) => oldCount - 1);
  };

  const superIncrement = () => {
    setSuperCount((oldCount) => oldCount + 1);
    setCount((oldCount) => oldCount + 10);
  };

  return (
    <div>
      <button onClick={increment}>Like</button>
      <button onClick={decrement}>Dislike</button>
      <button
        onClick={() => {
          if (superCount < 2) superIncrement();
        }}
      >
        Super Like
      </button>
      <p> Overall likes: {count}</p>
    </div>
  );
}

function Headline(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <LikeCounter />
    </div>
  );
}

function User(props) {
  return (
    <div className="User">
      <ul>
        <li>First Name: {props.first_name} </li>
        <li>Last Name: {props.last_name} </li>
        <li>E: {props.email} </li>
      </ul>
    </div>
  );
}

function fetchUser() {
  const url = `https://reqres.in/api/users/3`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data);
}

export default function App() {
  const [user, setUser] = useState([]);

  return (
    <div className="App">
      <Headline title="like counter" />
      <button
        onClick={() => {
          fetchUser().then((user) => {
            setUser(user);
          });
        }}
      >
        get user
      </button>
      <User {...user} />
    </div>
  );
}
