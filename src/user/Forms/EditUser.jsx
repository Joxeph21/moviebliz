import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import MiniLoader from "../../ui/MiniLoader";
import { useUser } from "../../features/Users/useUser";
import Loader from "../../ui/Loader";
import { useUpdateUser } from "../../features/Users/useUpdateUser";

const validationSchema = Yup.object({
  name: Yup.string().required("Username is required"),
});

function EditUser({ onCloseModal }) {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const [previewImage, setPreviewImage] = useState(user?.profile?.avatar || "");
  const [selectedFile, setSelectedFile] = useState(null); // store the file itself

  const formik = useFormik({
    initialValues: {
      name: user?.profile?.username || "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await updateUser(
          {
            username: values.name,
            avatar: selectedFile, // pass the actual file here
          },
          {
            onSuccess: () => {
              setSubmitting(false);
              onCloseModal?.();
            },
            onError: () => {
              setSubmitting(false);
            },
          }
        );
      } catch (error) {
        console.error(error);
        toast.error("An error occurred. Please try again.");
        setSubmitting(false);
      }
    },
  });

  if (isLoading) return <Loader />;
  
  const { profile } = user;
  const { username, avatar } = profile;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      setSelectedFile(file);
    }
  };

  return (
    <Form title="Update Profile" onSubmit={formik.handleSubmit}>
      <div
        className={`h-full w-full ${
          formik.isSubmitting || isUpdating ? "blur-sm" : ""
        } flex flex-col items-center`}
      >
        <div className="flex flex-col items-center justify-center gap-5 rounded-lg p-6 shadow-md md:w-96">
          <div className="relative flex h-40 w-40 overflow-hidden rounded-full border-4 border-[#328F29] shadow-md">
            <img
              src={previewImage || avatar}
              alt={`${username}_profile_picture`}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <label
            htmlFor="fileUpload"
            className="relative inline-block cursor-pointer"
          >
            <span className="hover:bg-brandGreen-dark inline-block rounded bg-[#328F29] px-4 py-2 text-white shadow-md">
              Upload Image
            </span>
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
        </div>

        <div className="w-full max-w-md space-y-6 px-6">
          <Input
            title="Username"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            errorMessage={formik.errors.name}
            placeholder="Enter your username"
            className="focus:ring-2 focus:ring-brandGreen"
          />

          <div className="flex w-full justify-between gap-4">
            <Button
              type="secondary"
              size="small"
              className="w-full"
              onClick={() => onCloseModal?.()}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              buttonType="submit" 
              className="w-full"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {formik.isSubmitting ? <MiniLoader /> : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default EditUser;
