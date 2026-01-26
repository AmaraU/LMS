import React, { useEffect, useRef, useState } from "react";
import { getImageUrl } from "../../utilis.js";
import styles from "./Library.module.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { customToast, customToastError } from "../../Components/Notifications.jsx";
import { BASE_URL, TEST_URL } from "../../../config.js";
import { useAppSelector } from "../../redux/store.js";
import { useLazyGetDocumentQuery, useLazyGetLibraryByIdQuery } from "../../redux/services/library.service.js";


export const LibraryDetailss = () => {

    const { docId } = useParams();

    const [doc, setDoc] = useState([]);
    const details = useRef(null);
    const instructor = useRef(null);
    // const { student } = useAppSelector((state) => state.app.auth);

    const [getLibraryInfo, { error, isLoading }] = useLazyGetLibraryByIdQuery();
    // const [getLibraryFile, { isLoading: isLoadingg }] = useLazyGetDocumentQuery();


    useEffect(() => {
        loadLibraryDetails();
    }, [])

    const loadLibraryDetails = async () => {
        await getLibraryInfo(docId)
            .unwrap()
            .then(data => {
                console.log(data)
                if (data?.length !== 1) {
                    window.location.href = "/dashboard/library"
                }
                else { setDoc(data[0]); }
            })

            .catch(err => {
                console.log(err)
                setDoc(undefined);
                customToastError("We're having trouble getting the library details. Try again later.")
            })
    }


    const handleDownload = async (file) => {
        try {
            const response = await fetch(BASE_URL + `/library-doc/${file.file_id}`);

            if (!response.ok) {
                customToastError('Failed to download file. Please try again.');
                throw new Error('Failed to download file');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const fileName = file.file_name;

            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
            customToastError('Failed to download file');
        }
    };

    const toDetails = (itemNumber) => details.current.scrollIntoView();
    const toInstructor = () => instructor.current.scrollIntoView();


    return (
        <>

            <div className={styles.whole}>

                <div className={styles.breadcrumb}><a href="/dashboard/library">Library</a>{'>'} {doc ? doc.name : 'NA'}</div>

                {isLoading ? <p className={styles.loading}>Loading...</p>
                    :
                    doc === undefined ? <p className={styles.none}>No library folder information</p>
                        :
                        <div className={styles.split}>

                            <div className={styles.larger}>

                                <div className={styles.courseTitle}>
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <h3>{doc.name}</h3>
                                        <div className={styles.titleInfo}>
                                            <div className={styles.teach}>
                                                <img src={getImageUrl('profile.svg')} alt="" />
                                                {doc?.instructor_name}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <button>
                                        <img src={getImageUrl('share.svg')} alt="" />
                                        Share
                                    </button> */}
                                </div>


                                {/* <div className={styles.courseImg} style={{
                                    backgroundImage: `url(${getImageUrl('courseImg.jpeg')})`
                                }}>
                                </div> */}

                                {/* <div className={styles.tabs}>
                                    <button onClick={toDetails}>Details</button>
                                    <button onClick={toInstructor}>Instructor</button>
                                    {/* <button>Course</button> *}
                                </div> */}

                                <div className={styles.theDetails} ref={details}>
                                    {(doc?.description || doc?.obectives) &&
                                        <div className={styles.details}>
                                            {doc?.description && <>
                                                <h3>Folder Overview</h3>
                                                <p>{doc?.description}</p>
                                            </>}

                                            {doc?.objectives && <>
                                                <h3>Key Learning Objectives</h3>
                                                <ul>
                                                    <li>Gain a clear understanding of what User Experience (UX) Design entails and its importance in today's digital world.</li>
                                                    <li>Explore the fundamental principles of user-centered design and how to apply them to create intuitive and user-friendly interfaces.</li>
                                                    <li>Learn about the various elements that contribute to a positive user experience, including information architecture, interaction design, and visual design.</li>
                                                </ul>
                                            </>}
                                        </div>
                                    }

                                    <div ref={instructor}>

                                        <h3>Instructor</h3>

                                        <div className={styles.details}>
                                            <h4>{doc.instructor_name}</h4>
                                            <h5>{doc.title}</h5>

                                            <div className={styles.flex}>
                                                <img className={styles.teachPic} src={getImageUrl('teach.svg')} alt="" />
                                                <div>
                                                    {/* <div className={styles.teacherInfo}>
                                                        <img src={getImageUrl('review.svg')} alt="" />
                                                        40,445 Reviews
                                                    </div> */}
                                                    <div className={styles.teacherInfo}>
                                                        <img src={getImageUrl('hat.svg')} alt="" />
                                                        {doc.student_count} Students
                                                    </div>
                                                    <div className={styles.teacherInfo}>
                                                        <img src={getImageUrl('play.svg')} alt="" />
                                                        {doc.course_count} Courses
                                                    </div>
                                                </div>
                                            </div>

                                            {doc.instructor_description}

                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className={styles.smaller}>

                                <div className={styles.completion}>
                                    <h3>Library Folder Files</h3>

                                    <div className={styles.accordionDiv}>
                                        {doc?.library_files?.length < 1 ? <p className={styles.noLessons}>No files yet</p>
                                            :
                                            doc?.library_files?.map((file, i) => (
                                                <div key={file.file_id} className={styles.accordion}>
                                                    <div className={styles.accHeader}>
                                                        <h4>File {i + 1} : {file.file_name}</h4>
                                                    </div>
                                                    <div className={styles.len}>
                                                        <div className={styles.lenn}>
                                                            <img src="" alt="" />
                                                            File size: {Math.floor(file.file_size / 1000)}KB
                                                        </div>
                                                        <button className={styles.download} onClick={() => handleDownload(file, 'library')}>Download</button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                            </div>

                        </div >
                }
            </div >
        </>
    )
}