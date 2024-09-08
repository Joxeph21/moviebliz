import { useAuth } from "../contexts/userAuthContext";
import Button from "../ui/Button";

import Modal from "../ui/Modal";
import GenreForm from "./GenreForm";

function PersonalizationForm() {
  const { user } = useAuth();
  const { name, isAuthenticated } = user;
  return (
    <Modal>
      <div className="my-4 flex h-80 w-dvw flex-col items-center justify-center gap-10 p-8 md:px-40">
        <div className="py-30 flex w-full flex-col items-center justify-center gap-10">
          <h1 className="w-max text-2xl font-bold md:text-3xl">
            😌Help us know you better,
          </h1>
          <p className="text-center text-sm">Personalize your feed</p>

          <div className="">
            <Modal.Open opens={"personalizeForm"}>
              <Button disabled={!name || !isAuthenticated} type={"primary"}>
                Get started
              </Button>
            </Modal.Open>
          </div>
        </div>
      </div>
      <Modal.Window name={"personalizeForm"}>
        <GenreForm />
      </Modal.Window>
    </Modal>
  );
}

export default PersonalizationForm;
