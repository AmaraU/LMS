import React, { useState } from "react";

import { getImageUrl } from "../../utilis";
import styles from "./Onboarding.module.css";
import { useResetPasswordMutation } from "../../redux/services/auth.service";
import { customToast, customToastError } from "../../Components/Notifications";


export const ResetPage = () => {

  const [email, setEmail] = useState("");

  const [reset, { isLoading }] = useResetPasswordMutation();
  const handleReset = async (event) => {
    event.preventDefault();
    await reset({
      email
    })
      .unwrap()
      .then(response => {
        console.log(response);
        customToast("Reset email sent successfully")
      })
      .catch(err => {
        console.error('Error', err.message);
        customToastError("We're having trouble resetting your password. Please try again.")
      })
  }

  return (
    <div className={styles.big}>
      <div className={styles.bread}>
        <img src={getImageUrl("Frame 349.png")} alt="" />
        <h3>The ultimate financial management solution. Seize control,gain insightful data.</h3>
      </div>
      <div className={styles.crumb}>

        <a href="/Login" className={styles.pan}>
          <img src={getImageUrl("arrow.png")} alt="" />
          Back to<span> login</span>
        </a>

        <div className={styles.crumbs}>
          <h1>Reset Your Password</h1>
          <p>Lets help you get started on CWG Academy</p>
        </div>

        <form className={styles.form}>
          <div className={styles.formgroup}>
            <label for="name">Email Address</label>
            <input onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" name="ID" />
          </div>

          <button onClick={handleReset} className={styles.butt}>{isLoading ? 'Sending...' : 'Send Reset Mail'}</button>

        </form>

      </div>

    </div >
  )
}