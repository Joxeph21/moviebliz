import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Form from "../ui/Form";
import FormBanner from "../ui/FormBanner";
import LogoHeader from "../ui/LogoHeader";
import Input from "../ui/Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import MiniLoader from "../ui/MiniLoader";
import { useAuth } from "../contexts/userAuthContext";

const initialValues = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email(`That doesn't look like an email ☹️`)
    .required("We really need your email ☹️"),
  username: Yup.string().required("Username cannot be empty"),
  password: Yup.string().required("Password cannot be empty"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Your Passwords don't look the same 👀")
    .required(`C'mon this can't be empty 🙄`),
});

function Signup() {
  const { Register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (values, { setSubmitting }) => {
    try {
      Register(values);
      setTimeout(() => {
        setSubmitting(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
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
    isSubmitting,
  } = formik;
  const { username, email, password, confirmPassword } = values;


  return (
    <FormBanner>
      <LogoHeader />
      <Form title={"Create your Account"} onSubmit={handleSubmit}>
        <div className="grid w-1/2 content-center justify-center gap-6 justify-self-center text-xs text-gray-50">
          <Input
            title={"Email Address"}
            placeholder={"joe@example.com"}
            type={"email"}
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
            value={email}
            error={errors.email && touched.email ? true : false}
            errorMessage={errors.email}
            name={"email"}
          />
          <Input
            title={"Username"}
            placeholder={"Desired Username"}
            type={"text"}
            required={true}
            value={username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username && touched.username ? true : false}
            errorMessage={errors.username}
            name={"username"}
          />
          <Input
            title={"Password"}
            placeholder={"Password"}
            type={"password"}
            required={true}
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password ? true : false}
            errorMessage={errors.password}
            name={"password"} // Corrected the typo here
          />
          <Input
            title={"Confirm Password"}
            placeholder={"Confirm Password"}
            type={"password"}
            value={confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.confirmPassword && touched.confirmPassword ? true : false
            }
            errorMessage={errors.confirmPassword}
            required={true}
            name={"confirmPassword"}
          />

          {/* <p>
            Already have an Account?{" "}
            <Link to={"/Login"} className="text-green-400">
              Log in
            </Link>
          </p> */}

          <h4>
            By clicking the{" "}
            <span className="font-bold text-green-500">
              &quot;Create Account&quot;
            </span>{" "}
            button below, I certify that I have read and agree to the MOVIEBLIZ
            terms of use and privacy policy.
          </h4>
          <Button
            size="large"
            type={"primary"}
            buttonType={"submit"}
            disabled={!isValid || isSubmitting || !dirty}
          >
            {isSubmitting ? <MiniLoader /> : "Create your account"}
          </Button>
        </div>
      </Form>
    </FormBanner>
  );
}

export default Signup;
