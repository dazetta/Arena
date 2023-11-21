import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { CONFIG } from "../config";
import { AuthContext } from "../Context/AuthContext";
import { setCookie } from "../utils";

export default function Login() {
  const navigate = useNavigate();
  const submitRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { auth, setAuth } = useContext(AuthContext);

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
        } else if(data.status == 301) {
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

  return (
    <div className="py-20">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="font-bold text-center text-[#0351aa] text-2xl cursor-pointer">
              DaZetta - Arena
            </div>
          </div>
          <form className="mt-8 space-y-6" onSubmit={loginSubmitHandler}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete={false}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-center text-sm text-[#971111] font-semibold">{error}</p>}
            <div>
              <button
                type="submit"
                ref={submitRef}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#0351aa] py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-[#0351aa] group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
