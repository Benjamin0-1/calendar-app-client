import React from "react";
import SearchByName from "./SearchByName";
import SearchByPhone from "./SearchByPhone";
import SearchByDateRange from "./SearchByDateRange";


function ParentSearch() {
  return (
    <div>
      <SearchByName/>
      <SearchByPhone />
      <SearchByDateRange />
    </div>
  );
};

export default ParentSearch;
