import React, { useState } from "react";

import { getImageUrl } from "../../utilis";
import styles from "./Onboarding.module.css";
import { useChangePasswordMutation } from "../../redux/services/auth.service";
import { customToast, customToastError } from "../../Components/Notifications";
import { useParams } from "react-router-dom";


export const ChangePasswordPage = () => {

  const { id } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [changePassword, { error, isLoading }] = useChangePasswordMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await changePassword({
      password,
      confirmPassword,
      id
    })
      .unwrap()
      .then(response => {
        console.log(response);
        customToast("Password changed successfully");
        setTimeout(() => window.location.href = "/login", 5000);

      })
      .catch(err => {
        console.error('Error', err?.data?.message);
        customToastError(err?.data?.message || "We're having trouble changing your password. Please try again.")
      })
  }


  return (
    <div className={styles.big}>

      <div className={styles.bread}>
        <img src={getImageUrl("Frame 349.png")} alt="" />
        <h3>The ultimate financial management solution. Seize control, gain insightful data.</h3>
      </div>

      <div className={styles.crumb}>

        <a href="/account" className={styles.pan}>
          <img src={getImageUrl("arrow.png")} alt="" />
          Back to <span>Account</span>
        </a>

        <div className={styles.crumbs}>
          <h1>Reset your password</h1>
          <p>Enter your new password</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formgroup}>
            <label for="name">Password</label>
            <div className={styles.password}>
              <input type={showPassword ? 'text' : 'password'} placeholder="Create your password" name="password" onChange={e => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPassword((showPassword) => !showPassword)}><img src={getImageUrl("visibility_off.png")} alt="view" /></button>
            </div>
          </div>
          <div className={styles.formgroup}>
            <label for="Re-type password">Retype your password</label>
            <div className={styles.password}>
              <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Retype your password" name="confirm" onChange={e => setConfirmPassword(e.target.value)} />
              <button type="button" onClick={() => setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)}><img src={getImageUrl("visibility_off.png")} alt="view" /></button>
            </div>
          </div>

          <button className={styles.butt}>{isLoading ? "Changing..." : "Change Password"}</button>

        </form>

      </div>

    </div>
  )
}