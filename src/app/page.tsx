import Grid from "./components/Grid";
import InputButtons from "./components/InputButtons";
import CellContextProvider from "./context/cellContext";
export default function Home() {
  return (
    <CellContextProvider>
      <div className="flex min-h-screen flex-col items-center p-10">
        <Grid />
        <InputButtons />
      </div>
    </CellContextProvider>
  );
}
