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
import { useAcademyLoginMutation, useGetUserProfileMutation, useLoginMutation, useRegisterFromAcademyMutation } from "../../redux/services/auth.service";


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


  // const [login, { errorr, isLoadinggg }] = useLoginMutation();
  const [adminlogin, { error, isLoading }] = useAcademyLoginMutation();
  const [register, { isLoading: isLoading2 }] = useRegisterFromAcademyMutation();
  const [getUserProfile, { isLoading: isLoading3 }] = useGetUserProfileMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // await login({
    //   email,
    //   password,
    // })
    //   .unwrap()
    //   .then(response => {
    //     console.log(response)
    //     sessionStorage.setItem("type", "student");
    //     sessionStorage.setItem("last_logged", new Date());
    //     dispatch(setStudent(response));
    //     dispatch(setCredentials(response));

    //     window.location.href = "/dashboard";
    //   })

    //   .catch(err => {
    //     console.log('error registering: ', err);
    //     customToastError("Error registering student. Please try again.")
    //   })

    await adminlogin({
      email,
      password
    })
      .unwrap()
      .then(response => {
        console.log(response);
        if (response?.Success) {
          dispatch(setCredentials(response));
          getUserProfile({
            body: {
              Username: email,
            },
            token: response.Token,
            // token: "FALSE TOKEN",
          })
            .unwrap()
            .then(res1 => {
              console.log(res1);

              if (res1?.Success) {
                register({
                  email: res1?.User?.Email,
                  academyId: res1?.User?.UserId,
                  first_name: res1?.User?.StudentFullName?.split(" ")[1],
                  last_name: res1?.User?.StudentFullName?.split(" ")[0],
                  password
                })
                  .unwrap()
                  .then(res => {
                    console.log(res);
                    sessionStorage.setItem("type", "student");
                    sessionStorage.setItem("last_logged", new Date());
                    dispatch(setStudent(res));

                    window.location.href = "/dashboard";
                  })
                  .catch(err => {
                    console.log('error registering: ', err);
                    customToastError("Error registering student. Please try again.")
                  })
              }
              else {
                customToastError(res1?.Message);
              }
            })

            .catch(error => {
              console.log('error getting profile: ', error);
              customToastError("Error getting user profile. Please try again.")
            })

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
            <button className={styles.butt} disabled={isLoading || isLoading2}>{isLoading || isLoading2 ? 'Logging in...' : 'Log In'}</button>
            <p>Don't Have An Account? <a href={ACADEMY_URL}>Create An Account</a></p>
          </div>

        </form>

      </div>

    </div>
  )
}