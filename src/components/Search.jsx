import React from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../redux/slieces/filterSlice";
import { VscChromeClose } from "react-icons/vsc";

export default function Search() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef();

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 400),
    []
  );

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className="search-wrapper">
      <input
        ref={inputRef}
        type="text"
        className="search"
        placeholder="Поиск..."
        value={value}
        onChange={onChangeInput}
      />
      <button onClick={onClickClear} className="clear-btn">
        <VscChromeClose />
      </button>
    </div>
  );
}
