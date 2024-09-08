import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "../ui/Input";
import { useUserData } from "../contexts/userDataContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  genres: Yup.string()
    .required("Favorite genres are required")
    .matches(/^[\w\s,]+$/, "Invalid characters in genres")
    .test("comma-separated", "Genres must be separated by commas", (value) => {
      return value.split(',').length >= 1; 
    }),
});

function GenreForm({onCloseModal}) {
  const { Add_Favorite_Genre } = useUserData();

  const formik = useFormik({
    initialValues: {
      genres: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // Process the genres
      const genresArray = values.genres.split(',').map((genre) => genre.trim());
      Add_Favorite_Genre(genresArray);
      toast.success("Genres updated successfully!", {
        autoClose: 1000,
      });
      setSubmitting(false);
      onCloseModal?.()
      resetForm();
    },
  });

  return (
    <Form title={"Personalize Feed"} onSubmit={formik.handleSubmit}>
      <p className="m-2 text-xs text-neutral-200">
        Separate genres by a comma
      </p>
      <Input
        title={"Favorite Genres"}
        type={"text"}
        placeholder={"Favorite Genres"}
        name="genres"
        value={formik.values.genres}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.genres && formik.errors.genres}
        errorMessage={formik.errors.genres}
      />
      <div className="mt-4">
        <Button type={"primary"} disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </Form>
  );
}

export default GenreForm;
