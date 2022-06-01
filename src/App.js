import { useState, useRef } from "react";
import $ from "jquery";
import "./App.css";
import axios from "axios";

function App() {
  const form = useRef(null);
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  const handleSumbit = (e) => {
    e.preventDefault();
    const currentform = form.current;
    console.log(currentform.name.value);

    axios
      .post(
        "http://localhost:8000/server.php",
        "name=" + currentform.name.value
      )
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    // $.ajax({
    //   type: "POST",
    //   url: currentform.action,
    //   data: "name=" + currentform.name.value,
    //   success(data) {
    //     console.log(data);
    //     setResult(data);
    //   },
    // });
  };

  return (
    <div className="App">
      <form
        action="http://localhost:8000/server.php"
        method="post"
        ref={form}
        onSubmit={(event) => handleSumbit(event)}
      >
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <h1>{result}</h1>
    </div>
  );
}

export default App;
