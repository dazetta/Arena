import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../config";
import { AuthContext } from "../Context/AuthContext";
import { setCookie } from "../utils";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorAlert from "../components/Alert/ErrorAlert";

export default function Login() {
  const navigate = useNavigate();
  const submitRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { auth, setAuth } = useContext(AuthContext);

  const loginSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .required('Email is required')
        .email('Enter a valid email'),
      password: Yup.string()
        .required('Password is required')
    });
  }

  const initialValues = {
    email: '',
    password: '',
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    const payload = {
      user_id: email,
    };
    submitRef.current.disabled = true;
    setError('');
    const url = CONFIG.BASE_URL + CONFIG.VALIDATE_USER + "&email=" + email + "&password=" + password;
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        submitRef.current.disabled = false;
        if(data.status === 300) {
          setError('Account does not exist');
        } else if(data.status === 301) {
          setError(CONFIG.exceptionError);
        } else {
          setCookie('user', JSON.stringify({ ...payload, loggedIn_status: 'Logged-in' }))
          setAuth({
            ...payload,
            user_name: data.user_data.user_name,
            loggedIn_status: 'Logged-in'
          })
          navigate("/my-account");
        }
    });
  };
/*
  useEffect(() => {
    var dataLayer = {
      "page_name" : "login",
      "page_type" : "Login",
      "page_section": "MyAccount",
      "login_status": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web",
      "login_method": "Email",
      "login_time": new Date().getTime()
    }
    auth.user_id && (dataLayer["customer_id"] = auth.user_id);
  }, []);
*/

useEffect(() => {
window.adobeDataLayer.push({
  "event": "landed",
  "eventInfo": {
      "eventName": "landed"
  },
  "custData": {
      "custId": auth.user_id,
      "loginStatus": auth.loggedIn_status,
      "login_time": new Date().getTime()
  },
  "page": {
      "pageName": "login",
      "pageType": "Login",
      "viewName": "login"
  }
});
}, []);

  /*
  if(window.alloy){
    window.alloy("sendEvent", {
      "renderDecisions": true,
      decisionScopes: ["__view__"],
      "xdm": {
        "web": {
          "webPageDetails": {
            "viewName": "login"
          }
        }
      },
      data: {
        __adobe: {
          target: {
            "profile.username": "randomemail@gmail.com"
          }
        }
      }
    })
  }
*/
  return (
    <div className="py-20">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <h2 className="font-montserrat leading-normal text-center text-secondary text-4xl font-bold mb-2">Log in to Your Account</h2>
          { error && <ErrorAlert disappearTime="2000">{error}</ErrorAlert> }
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={async (values, { setSubmitting } ) => {
                await sleep(500);
                const payload = {
                  user_id: values.email,
                };
                setError('');
                const url = CONFIG.BASE_URL + CONFIG.VALIDATE_USER + "&email=" + values.email + "&password=" + values.password;
                var requestOptions = {
                  method: 'GET',
                  redirect: 'follow'
                };
                fetch(url, requestOptions)
                  .then((res) => res.json())
                  .then((data) => {
                    if(data.status === 300) {
                      setError('Account does not exist');
                      setSubmitting(false);
                    } else if(data.status === 301) {
                      setError(CONFIG.exceptionError);
                      setSubmitting(false);
                    } else {
                      setCookie('user', JSON.stringify({ ...payload, loggedIn_status: 'Logged-in' }))
                      setAuth({
                        ...payload,
                        user_name: data.user_data.user_name,
                        loggedIn_status: 'Logged-in'
                      })
                      setSubmitting(false);
                      navigate("/my-account");
                    }
                });
            }}
          >
            {({ errors, touched, isSubmitting  }) => (
                <Form className="space-y-4 md:space-y-6">
                    <div className="form-group">
                        <Field
                          name="email"
                          type="email"
                          className={
                            'bg-gray-50 border border-gray-10 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none' + (errors.email && touched.email ? ' is-invalid' : '')
                          }
                          placeholder="Enter your email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="mt-1 text-sm text-error"
                        />
                    </div>
                    <div className="form-group">
                        <Field
                            name="password"
                            type="password"
                            className={
                              'bg-gray-50 border border-gray-10 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none' + (errors.password && touched.password ? ' is-invalid' : '')
                            }
                            placeholder="Enter password"
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="mt-1 text-sm text-error"
                        />
                    </div>
                    <div className="form-group">
                        <PrimaryButton type="submit" className="w-full" disabled={isSubmitting}>Create account</PrimaryButton>
                    </div>
                    <p className="text-sm font-light text-gray-500">
                        Don't have a account? <a href="#" className="font-medium text-primary-600 hover:underline" onClick={(e) => {
                          e.preventDefault();
                          navigate('/auth/register')
                        }} >Register</a>
                    </p>
                </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
