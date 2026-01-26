import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utilis";
import { logOut } from "../../redux/slices/authSlice";

export const Navbar = () => {

    const [navOpen, setNavOpen] = useState(false);
    const navRef = useRef(null);
    let currentPath = window.location.pathname;

    const handleLogOut = () => {
        window.location.href = "/login";
        logOut();
        sessionStorage.clear();
    }

    const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setNavOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <>
            <div className={styles.logo2} onClick={() => setNavOpen(!navOpen)}>
                <img src={getImageUrl('cwg_logo.png')} alt="CWG Academy" />
            </div>
            <div className={navOpen ? styles.theWholeOpen : styles.theWhole} ref={navRef}>
                <div className={styles.logo} onClick={() => setNavOpen(!navOpen)}>
                    <img src={getImageUrl('Frame 349.png')} alt="CWG Academy" />
                </div>

                <div className={styles.linkList} >
                    <a href="/dashboard/overview" className={(currentPath.includes("/dashboard/overview") || currentPath === "/dashboard") ? styles.active : ""}>
                        <img src={getImageUrl("homeIcon.png")} />
                        Home
                    </a>
                    <a href="/dashboard/courses/active" className={currentPath.includes("/dashboard/courses") ? styles.active : ""}>
                        <img src={getImageUrl("coursesIcon.png")} />
                        Courses
                    </a>
                    <a href="/dashboard/gradebook" className={currentPath.includes("/dashboard/gradebook") ? styles.active : ""}>
                        <img src={getImageUrl("taskIcon.png")} />
                        Gradebook
                    </a>
                    <a href="/dashboard/calendar" className={currentPath.includes("/dashboard/calendar") ? styles.active : ""}>
                        <img src={getImageUrl("whiteCalendar.png")} />
                        Calendar
                    </a>
                    <a href="/dashboard/certificate" className={currentPath.includes("/dashboard/certificate") ? styles.active : ""}>
                        <img src={getImageUrl("certificateIcon.png")} />
                        Certificates
                    </a>
                    <a href="/dashboard/library" className={currentPath.includes("/dashboard/library") ? styles.active : ""}>
                        <img src={getImageUrl("coursesIcon.png")} />
                        Library
                    </a>
                </div>

                <div className={styles.logout}>
                    <a onClick={handleLogOut}>
                        <img src={getImageUrl('logoutIcon.png')} />
                        Logout
                    </a>
                </div>
            </div>
        </>
    )
}