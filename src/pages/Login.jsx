import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Form from "../ui/Form";
import FormBanner from "../ui/FormBanner";
import Input from "../ui/Input";
import LogoHeader from "../ui/LogoHeader";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import useLogin from "../features/Users/useLogin";
import MiniLoader from "../ui/MiniLoader";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Email is required"),
  password: Yup.string().required("Password cannot be empty"),
});

function Login() {
  const navigate = useNavigate();
  const { login } = useLogin();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { username: identifier, password } = values;
      try {
        await login(
          { identifier, password },
          {
            onSuccess: () => {
              setTimeout(() => {
                setSubmitting(false);
                navigate("/");
              }, 2000);
            },
            onError: () => {
              setSubmitting(false);
            },
          },
        );
      } catch (error) {
        console.error(error);
        toast.error("Login failed, please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    errors,
    handleChange,
    handleBlur,
    values,
    handleSubmit,
    touched,
    isSubmitting,
    isValid,
    dirty,
  } = formik;

  return (
    <FormBanner>
      <LogoHeader />
      <Form title="Login" onSubmit={handleSubmit}>
        <div className="grid w-1/2 content-center justify-center gap-6 justify-self-center text-xs text-gray-50">
          <Input
            title="Username or Email"
            type="text"
            placeholder="Username or Email"
            required
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && errors.username}
            errorMessage={errors.username}
            name="username"
          />
          <Input
            title="Password"
            type="password"
            placeholder="Password"
            required
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
            errorMessage={errors.password}
            name="password"
          />

          <Link className="font-bold text-green-400" to="/pasword_reset">
            Forgot Password?
          </Link>
          <p className="text-sm text-neutral-50">
            Don&apos;t have an account?{" "}
            <Link className="font-bold text-green-400" to="/create-account">
              Register
            </Link>
          </p>
          <Button
            buttonType={"submit"}
            type="primary"
            size="large"
            disabled={!isValid || !dirty}
          >
            {isSubmitting ? <MiniLoader /> : "Login"}
          </Button>
        </div>
      </Form>
    </FormBanner>
  );
}

export default Login;
