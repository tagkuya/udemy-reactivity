import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
import { resolve } from "dns";
import { rejects } from "assert";

var GetResponce = () => {
  console.log("axios直前");
  return axios.get("http://localhost:5000/api/values");
};

function App() {
  var data;
  const [values, setState]: any = useState([]);
  console.log("values are " + values);

  return (
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      {console.log("List直前")}
      {/* <List>
        {values.map((value: any) => (
          <List.Item key={value.key}>{value.Name}</List.Item>
        ))}
      </List> */}
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx </code>and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  );
}

export default App;
