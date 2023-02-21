import { CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CircularProgress className="mb-10" />
    </div>
  );
}
