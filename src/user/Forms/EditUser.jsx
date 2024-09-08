import { useAuth } from "../../contexts/userAuthContext";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import MiniLoader from "../../ui/MiniLoader";

const imgSrc = "src/user/profile-pics/";

const validationSchema = Yup.object({
  name: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

function EditUser({ onCloseModal }) {
  const { user, updateProfilePic, updateUserDetails } = useAuth();

  const [selectedImg, setSelectedImg] = useState(
    user.profileImage || "profile1.jpg",
  );

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      updateProfilePic(selectedImg);
      try {
        updateUserDetails(values);
        toast.success("Updated Profile", {
          autoClose: 1000,
        });
        setTimeout(() => {
          setSubmitting(false);
          onCloseModal?.();
        }, 1000);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    },
  });

  const handleImageClick = (imgName) => {
    setSelectedImg(imgName);
  };

  return (
    <Form title={"Update Profile"} onSubmit={formik.handleSubmit}>
      <div className={`h-full w-full ${formik.isSubmitting ? "blur-sm" : ""} flex flex-col items-center`}>
        <div className="flex w-1/2 items-center justify-between rounded-lg bg-neutral-500/20 p-4 shadow-md md:w-[40em]">
          <div className="relative flex h-40 w-40 overflow-hidden rounded-lg border-2 border-green-300 shadow-md">
            <img
              src={`${imgSrc}${selectedImg}`}
              alt={`${formik.values.name}_profile_picture`}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="flex w-2/3 gap-2 overflow-x-auto p-2">
            {[...Array(10)].map((_, index) => {
              const imgIndex = index + 1;
              const imgName = `profile${imgIndex}.jpg`;
              return (
                <div
                  key={imgIndex}
                  onClick={() => handleImageClick(imgName)}
                  className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                    selectedImg === imgName
                      ? "border-blue-400"
                      : "border-transparent"
                  } cursor-pointer hover:border-blue-400`}
                >
                  <img
                    className="h-full w-full object-cover object-center transition-transform duration-200 hover:scale-105"
                    src={`${imgSrc}${imgName}`}
                    alt={`profile${imgIndex}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 space-y-5 w-fit  flex-col p-4">
          <Input
            title="Username"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            errorMessage={formik.errors.name}
          />
          <Input
            title="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            errorMessage={formik.errors.email}
          />
          <div className="flex w-full justify-end gap-3">
            <Button
              type="secondary"
              size="small"
              onClick={() => onCloseModal?.()}
            >
              Cancel
            </Button>
            <Button type="primary" size="small" disabled={!formik.isValid}>
              {formik.isSubmitting ? <MiniLoader /> : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default EditUser;
