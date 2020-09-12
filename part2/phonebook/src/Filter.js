import React from "react";

const Filter = ({ filter, setFilter }) => {
  const onFilter = (event) => {
    console.log(event.target.value);
    //ensure special character does not break the filter
    const regex = /[^\-a-zA-Z0-9' ]+/gi;
    let filteredInput = event.target.value.replace(regex, "");
    setFilter(filteredInput);
  };

  return (
    <div>
      filter shown with
      <input value={filter} onChange={onFilter} />
    </div>
  );
};

export default Filter;
