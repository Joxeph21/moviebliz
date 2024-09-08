import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Form from "../ui/Form";
import FormBanner from "../ui/FormBanner";
import Input from "../ui/Input";
import LogoHeader from "../ui/LogoHeader";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "../contexts/userAuthContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Username or Email is required"),
  password: Yup.string().required("Password cannot be empty"),
});

function Login() {
  const navigate = useNavigate();
  const { Login: loginUser, user } = useAuth();
  const { errorMessage } = user;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await loginUser(values);
        if (!errorMessage) {
          setTimeout(() => {
            setSubmitting(false);
            navigate("/");
          }, 2000);
        }
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
    isValid,
    dirty,
  } = formik;

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  }, [errorMessage]);

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
          <p className="text-sm text-neutral-50">
            Don&apos;t have an account?{" "}
            <Link className="text-green-400" to="/create-account">
              Register
            </Link>
          </p>
          <Button
            type="primary"
            size="large"
            disabled={!isValid || !dirty}
          >
            Login
          </Button>
        </div>
      </Form>
    </FormBanner>
  );
}

export default Login;
