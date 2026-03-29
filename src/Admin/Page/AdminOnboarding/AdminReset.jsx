import React, { useState } from "react";

import { getImageUrl } from "../../../utilis";
import styles from "./AdminOnboarding.module.css";
import { useAdminResetPasswordMutation, useResetPasswordMutation } from "../../../redux/services/auth.service";


export const AdminReset = () => {

  const [email, setEmail] = useState("");

  const [reset, { isLoading }] = useAdminResetPasswordMutation();
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
        <img src={getImageUrl("academy_logo.svg")} alt="" />
        <h3>The ultimate Learning Management System dedicated to training young tech enthusiasts on career boosting IT and Tech courses.</h3>
      </div>
      <div className={styles.crumb}>

        <a href="/Admin-login" className={styles.pan}>
          <img src={getImageUrl("arrow.png")} alt="" />
          Back to{' '}<b>login</b>
        </a>

        <div className={styles.crumbs}>
          <h1>Reset Your Password</h1>
          <p>Lets help you get started on CWG Academy</p>
        </div>

        <form className={styles.form}>
          <div className={styles.formgroup}>
            <label for="name">Phone Number or Email Address</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your phone number or email address" name="ID" />
          </div>

          <button onClick={handleReset} className={styles.butt}>{isLoading ? '...' : 'Send Reset Mail'}</button>

        </form>

      </div>

    </div >
  )
}