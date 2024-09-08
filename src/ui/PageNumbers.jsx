import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function PageNumbers({ page, setPage }) {
  const [searchParms, setSearchParams] = useSearchParams();

  const handlePageChange = (event, value) => {
    searchParms.set("page", value);
    setSearchParams(searchParms);
    setPage(value);

    window.scrollTo(0, 0);
  };
  return (
    <div className="mt-4">
      <Pagination
        count={50}
        color="green"
        onChange={handlePageChange}
        shape="rounded"
        page={Number(page)}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white",
          },
        }}
      />
    </div>
  );
}

export default PageNumbers;
