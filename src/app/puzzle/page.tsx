import React from "react";
import Grid from "../../components/Grid";
import InputButtons from "../../components/InputButtons";
import MenuBar from "../../components/MenuBar";
import CellContextProvider from "../../context/cellContext";

const Puzzle = () => {
  return (
    <CellContextProvider>
      <div className="flex min-h-screen flex-col items-center p-10">
        <Grid />
        <InputButtons />
        <MenuBar />
      </div>
    </CellContextProvider>
  );
};

export default Puzzle;
