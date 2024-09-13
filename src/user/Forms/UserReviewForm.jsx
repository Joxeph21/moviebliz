import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import StarRating from "../../ui/StarRating";
import { toast } from "react-toastify";
import MiniLoader from "../../ui/MiniLoader";
import { useAddReview } from "../../features/Userdata/Reviews/useReviewOptions";
import { useReviews } from "../../features/Userdata/Reviews/useReviews";

const validationSchema = Yup.object({
  reviewText: Yup.string().required("Review text is required"),
  starRating: Yup.number().required("Star rating is required").min(1).max(10),
});

function UserReviewForm({ name = "movie", movie, onCloseModal }) {
  const { reviews } = useReviews();
  const { addReview, isLoading: addingReview } = useAddReview();

  const existingReview = reviews?.find(
    (review) => review.movie.id === movie.id,
  );

  const formik = useFormik({
    initialValues: {
      starRating: existingReview?.starRating || "",
      reviewText: existingReview?.reviewText || "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        if (existingReview) {
          toast.success("Review updated!", { autoClose: 1000 });
        } else {
          addReview(
            { ...values, movie },
            {
              onError: (err) => {
                if (err.message === "User must be logged in") {
                  toast.error("Log in to review movies", {
                    autoClose: 1000,
                  });
                }
              },
            },
          );
        }
        if (!addingReview) {
          setTimeout(() => {
            setSubmitting(false);
            onCloseModal?.();
          }, 1000);
        }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    },
  });

  return (
    <Form
      title={existingReview ? "Edit Review" : "Add a Review"}
      onSubmit={formik.handleSubmit}
    >
      <div
        className={`flex w-full flex-col ${formik.isSubmitting ? "blur-sm" : "blur-none"} items-center gap-6 rounded-lg bg-neutral-900 p-6 shadow-lg`}
      >
        <div className="w-full space-y-4">
          <h3 className="text-left text-sm font-medium text-gray-50">
            How would you rate <span className="text-green-600">{name}?</span>{" "}
            🫡
          </h3>
          <StarRating
            color="gold"
            maxRating={10}
            size={24}
            defaultRating={existingReview?.starRating || 0} // Set default rating if editing
            onSetRating={(rating) => formik.setFieldValue("starRating", rating)}
          />
          {formik.touched.starRating && formik.errors.starRating ? (
            <div className="text-sm text-red-500">
              {formik.errors.starRating}
            </div>
          ) : null}
        </div>
        <textarea
          className="h-32 w-full resize-none rounded-md bg-gray-50 p-4 text-sm text-gray-800 placeholder-gray-500 shadow-sm outline-none focus:ring-2 focus:ring-brandGreen/50"
          placeholder="Share your thoughts..."
          name="reviewText"
          value={formik.values.reviewText}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.reviewText && formik.errors.reviewText ? (
          <div className="text-sm text-red-500">{formik.errors.reviewText}</div>
        ) : null}
        <div className="flex w-full justify-end gap-3">
          <Button
            onClick={() => onCloseModal?.()}
            type="secondary"
            size="small"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="small"
            disabled={formik.isSubmitting || !formik.dirty}
          >
            {formik.isSubmitting ? <MiniLoader /> : "Submit"}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default UserReviewForm;
