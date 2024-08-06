import { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onSearch: Function;
};

function SearchBar({ onSearch }: Props) {

  const [text, setText] = useState("");

  function handleChange(event: any) {
    setText(event.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    onSearch(text);
  }

  function handleResetClick() {
    setText("");
    onSearch("");
  }

  return (
    <form className="carguide-search-bar" onSubmit={handleSubmit}>
      <button type="submit" style={{ cursor: "pointer" }}>🔎︎</button>
      <input
        value={text}
        type="text"
        placeholder="Digite o nome do produto que esteja buscando "
        onChange={handleChange}
      />
      <button type="reset" onClick={handleResetClick} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon={faClose}/>
      </button>
    </form>
  );
}

export default SearchBar;
