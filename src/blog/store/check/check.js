import React from "react";
// import "./styles.css";
import Model from "./model";

function App() {
  const [status, setState] = React.useState(false);
  const [text, setText] = React.useState("");
  const handleClick = () => {
    setState((prevStatus) => !prevStatus);
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      <h1>React Modal</h1>
      <hr />
      <button onClick={handleClick}>Open photo entry dialog</button>
      <ChildComponent
        isOpen={status}
        text={text}
        handleChange={handleChange}
        handleClick={handleClick}
      />
    </div>
  );
}

const ChildComponent = ({ isOpen, text, handleChange, handleClick }) => {
  return (
    <>
      {isOpen && (
        <Model
          status={isOpen}
          handleClick={handleClick}
          text={text}
          handleChange={handleChange}
        />
      )}
    </>
  );
};
export default App;
