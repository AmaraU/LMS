import React, { useEffect, useState } from "react";
import { getImageUrl } from "../../utilis";
import styles from "./Library.module.css";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { BASE_URL } from "../../../config";
import { customToast, customToastError } from "../../Components/Notifications";
import { useAppSelector } from "../../redux/store";
import Button from "../../Components/UI/Button";

export const Library = () => {

    const { student } = useAppSelector((state) => state.app.auth);

    const [docs, setDocs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        fetchLibraryDocs();
    }, []);

    const fetchLibraryDocs = async () => {
        setIsLoading(true);
        try {
            const result = await axios(BASE_URL + `/library`);
            console.log(result);
            setDocs(result.data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            customToastError("We're having trouble fetching the library. Please try again later.")
            setIsLoading(false);
        }
    }

    const goToCourse = (id) => {
        window.location.href = `/dashboard/library/${id}`;
    }


    return (
        <>
            <div className={styles.whole}>

                <div className={styles.breadcrumb}>Library</div>

                <div>
                    <div className={styles.title}>
                        <h1>Library <span>({docs?.length})</span></h1>
                        {/* <button>Sort By <img src={getImageUrl('sortIcon.png')} alt="" /></button> */}
                    </div>

                    {isLoading ? <h5 className={styles.loading}>Loading...</h5> :
                        docs?.length < 1 ? <h5 className={styles.loading}>Library is Empty</h5>
                            :
                            <div className={styles.course}>
                                {docs?.map((cour, index) => (
                                    <div className={styles.courseInfo} key={index}>
                                        <div className={styles.infoHeader}>
                                            <h3>{cour.name}</h3>
                                            {/* <button><img src={getImageUrl('threeDots.png')} alt="" /></button> */}
                                        </div>
                                        <p>{cour.description}</p>
                                        <div className={styles.courseData}>
                                            <div className={styles.crumb}>
                                                <div className={styles.profile}><img src={getImageUrl('profile.svg')} alt="" />{cour?.instructor_name}</div>
                                                <div className={styles.students}><img src={getImageUrl('frame5.png')} alt="" />{cour?.file_count} {parseInt(cour?.file_count) === 1 ? 'File' : 'Files'}</div>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => goToCourse(cour.library_id)}
                                            text="Go to Folder"
                                            type='button'
                                            px={'12px'}
                                            py={'7px'}
                                            fontSize={'14px'}
                                            height={'fit-content'}
                                        // isDisabled={isLoadingE}
                                        // isLoading={isLoadingE}
                                        />
                                    </div>
                                ))}
                            </div>
                    }
                </div>
            </div>
        </>
    )


}