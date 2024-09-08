import Box from "../components/Box";
import Banner from "../ui/Banner";
import { useUserData } from "../contexts/userDataContext";
import Empty from "../ui/Empty";
import MovieGrid from "../ui/MovieGrid";
import Button from "../ui/Button";
import { HiX } from "react-icons/hi";

function Lists() {
  const { listsArray, ClearList } = useUserData();

  if (!listsArray.length)
    return (
      <Empty
        icon="👀"
        title={"Your List Looks Empty"}
        message={"Add Movies to List"}
        RouteText={"Explore"}
        RouteLink={"/movies"}
      />
    );
  return (
    <Banner>
      <Box title={`Lists (${listsArray.length})`} />
      <MovieGrid array={listsArray} />
      <div className="mt-4">
        <Button icon={<HiX />} onClick={() => ClearList()} type={"primary"}>
          Clear List
        </Button>
      </div>
    </Banner>
  );
}

export default Lists;
