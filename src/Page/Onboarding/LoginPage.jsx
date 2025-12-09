import React, { useEffect, useState } from "react";

import { getImageUrl } from "../../utilis";
import styles from "./Onboarding.module.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ACADEMY_URL, BASE_URL, TEST_URL } from "../../../config";
import { customToast, customToastError } from "../../Components/Notifications";
import { useDispatch } from "react-redux";
import { setCredentials, setStudent } from "../../redux/slices/authSlice";
import { useAppSelector } from "../../redux/store";
import { useAcademyLoginMutation, useLoginMutation } from "../../redux/services/auth.service";


export const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMesage] = useState(false);
  const [isLoadingg, setIsLoading] = useState(false);
  const { userInfo, student, authToken } = useAppSelector((state) => state.app.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const router = useRouter();

  useEffect(() => {
    sessionStorage.clear();
  }, []);


  // useEffect(() => {
  //   if (userInfo && authToken) {
  //     window.location.href = "/dashboard";
  //   }
  // }, [userInfo, authToken]);

  console.log(student);


  const [login, { error, isLoading }] = useLoginMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // setIsLoading(true);
    // try {
    await login({
      email,
      password
    })
      .unwrap()
      .then(response => {
        console.log(response);
        if (response?.Success) {
          sessionStorage.setItem("type", "student");
          sessionStorage.setItem("last_logged", new Date());
          dispatch(setCredentials(response));
          dispatch(setStudent(response));

          window.location.href = "/dashboard";
        } else {
          if (response?.Message === "Invalid Client Credentials") {
            setErrorMesage(true);
            customToastError("Invalid username or password. Please try again.")
          } else {
            customToastError(response?.Message);
          }
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.error('Error', err.message);
        customToast("We're having trouble logging you in. Please try again.")
      })
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.big}>

      <div className={styles.bread}>
        <img src={getImageUrl("Frame 349.png")} alt="" />
        <h3>The ultimate financial management solution. Seize control, gain insightful data.</h3>
      </div>

      <div className={styles.crumb}>

        <a href="/CWG" className={styles.pan}>
          <img src={getImageUrl("arrow.png")} alt="" />
          Back to <span>Home</span>
        </a>

        <div className={styles.crumbs}>
          <h1>Log in to your account</h1>
          <p>Let's help you get started on CWG Academy</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>

          {errorMessage && <p style={{ color: 'red' }}>Wrong username or password. Try again</p>}

          <div className={styles.formgroup}>
            <label htmlFor="email">Username</label>
            <input placeholder="Enter your Academy username" name="email" onChange={e => setEmail(e.target.value)} />
          </div>

          <div className={styles.formgroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.password}>

              <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" name="password" onChange={e => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPassword((showPassword) => !showPassword)}><img src={getImageUrl("visibility_off.png")} alt="y" /></button>

            </div>
          </div>

          <p>Forgot password? <a href="/Reset">Reset Password</a></p>

          <div className={styles.home}>
            <button className={styles.butt} disabled={isLoading}>{isLoading ? 'Logging in...' : 'Log In'}</button>
            <p>Don't Have An Account? <a href={ACADEMY_URL}>Create An Account</a></p>
          </div>

        </form>

      </div>

    </div>
  )
}