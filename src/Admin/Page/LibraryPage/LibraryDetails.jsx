import React, { useEffect, useRef, useState } from "react";
import { getImageUrl } from "../../../utilis";
import styles from "./Library.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from "../../Components/Modals/Modal";
import "../../../App.css"
import { customToast, customToastError } from "../../../Components/Notifications";
import { BASE_URL } from "../../../../config";
import { ConfirmModal } from "../../Components/Modals/ConfirmModal";
import { useEditLibraryMutation, useLazyGetLibraryByIdForInstructorQuery, useLazyGetLibraryByIdQuery, useRemoveDocumentMutation } from "../../../redux/services/library.service";
import { Form, Formik } from "formik";
import Input from "../../../Components/UI/Input";
import Select from "../../../Components/UI/Select";
import Button from "../../../Components/UI/Button";


export const LibraryDetails = () => {

    const { id } = useParams();

    const [theLibrary, setLibrary] = useState([]);
    const [charCount, setCharCount] = useState(theLibrary?.description != null ? (255 - theLibrary?.description.length) : 255);
    const [showFileName, setShowFileName] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [actionsOpen, setActionsOpen] = useState({});
    const [item, setItem] = useState('');
    const [selected, setSelected] = useState({});
    const [confirmType, setConfirmType] = useState('');
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);

    // console.log(theLibrary);

    const navigate = useNavigate();
    const actionsRef = useRef(null);

    useEffect(() => {
        loadLessonDetails();
    }, [id, theLibrary]);

    const [getLibrary, { error, isLoading }] = useLazyGetLibraryByIdForInstructorQuery();
    const [getLibraryAdmin, { error: errorA, isLoading: isLoadingA }] = useLazyGetLibraryByIdQuery();
    const [editLibrary, { error: errorE, isLoading: isLoadingE }] = useEditLibraryMutation();
    const [deleteLibFile, { error: errorD, isLoading: isLoadingD }] = useRemoveDocumentMutation();


    const loadLessonDetails = async () => {
        try {
            if (sessionStorage.getItem("role") === 'Teacher') {
                await getLibrary({
                    instructor_id: sessionStorage.getItem('id'),
                    library_id: id
                })
                    .unwrap()
                    .then(data => {
                        // console.log(data)
                        if (data?.length !== 1) {
                            window.location.href = "/admin-dashboard/library"
                        }
                        else { setLibrary(data[0]); }
                    })

                    .catch(err => {
                        console.log(err)
                        customToastError("We're having trouble getting the library details. Try again later.")
                    })

            }
            else if (sessionStorage.getItem("role") === 'Admin') {
                await getLibraryAdmin(id)
                    .unwrap()
                    .then(data => {
                        // console.log(data)
                        if (data?.length !== 1) {
                            window.location.href = "/admin-dashboard/library"
                        }
                        else { setLibrary(data[0]); }
                    })

                    .catch(err => {
                        console.log(err)
                        customToastError("We're having trouble getting the library details. Try again later.")
                    })
            }

        } catch (err) {
            console.log(err);
            customToast("We're having trouble getting the library details. Try again later.")
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLibrary((prevClass) => ({
            ...prevClass,
            [name]: value,
        }));
        if (name === 'files') {
            const files = Array.from(e.target.files);
            setShowFileName(true);
            files.forEach((file) => {
                fileNames.push(file.name);
                selectedFiles.push(file);
            });
        }
    }

    const handleSubmit = async (values) => {
        // console.log(values);

        const formData = new FormData();
        formData.append('library_id', theLibrary.library_id);
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('level', values.level);
        if (selectedFiles && selectedFiles.length > 0) {
            selectedFiles.forEach((file) => {
                formData.append('files', file);
            });
        }

        editLibrary(
            formData,
        )
            .unwrap()
            .then(response => {
                console.log(response);
                customToast('Library updated successfully');
                loadLessonDetails();
                setShowFileName(false);
                setFileNames([]);
                // navigate('/admin-dashboard/library');
            })
            .catch(err => {
                console.log('Error updating library:', err);
                customToastError('Error updating library. Please try again');
            })
    };

    const handleCancel = () => {
        navigate('/admin-dashboard/library');
    }

    const deleteFile = async (id) => {
        const deleteValues = {
            library_id: theLibrary.library_id,
            file_id: id,
        }

        await deleteLibFile(deleteValues)
            .unwrap()
            .then(res => {
                console.log(res);
                loadLessonDetails();
                setActionsOpen({});
            })

            .catch(error => {
                console.log('Error deleting file', error);
                customToast('Unable to delete file. Try again later')
            })
    }


    const toggleAction = (event, index) => {
        event.stopPropagation();
        setActionsOpen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleClickOutside = (event) => {
        if (actionsRef.current && !actionsRef.current.contains(event.target)) {
            setActionsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);


    return (
        <div className={styles.whole}>

            {(isLoading || isLoadingA) ? <p className={styles.loading}>Loading...</p> :

                <>
                    <div className={styles.breadcrumb}><a href="/admin-dashboard/library">Library</a> {'>'} {theLibrary?.name}</div>

                    <Formik
                        initialValues={{
                            name: theLibrary?.name,
                            description: theLibrary?.description,
                            level: theLibrary?.level,

                        }}
                        onSubmit={(values, actions) => {
                            // console.log(values);
                            handleSubmit(values);
                        }}
                    >
                        <Form encType="multipart/form-data">


                            <div className={styles.classTitle}>
                                <h3>{theLibrary.name}</h3>
                                <div className={styles.buttons}>
                                    <Button
                                        text="Cancel"
                                        type='button'
                                        variant="outline"
                                        px={'12px'}
                                        py={'7px'}
                                        fontSize={'12px'}
                                        height={'fit-content'}
                                        onClick={handleCancel}
                                        isDisabled={isLoadingE}
                                        isLoading={isLoadingE}
                                    />
                                    <Button
                                        text="Save"
                                        type='submit'
                                        px={'12px'}
                                        py={'7px'}
                                        fontSize={'12px'}
                                        // onClick={handleSubmit}
                                        height={'fit-content'}
                                        isDisabled={isLoadingE}
                                        isLoading={isLoadingE}
                                    />
                                    {/* <button className={styles.button1} onClick={handleCancel} type="button">Cancel</button>
                                    <button className={styles.button2} type="submit">Save</button> */}
                                </div>
                            </div>

                            <div className={styles.grid}>
                                <div className={styles.larger}>

                                    <div className={styles.box}>
                                        <div className={styles.header}>
                                            <h5>Basic Info</h5>
                                            <p>Provide information about the library folder</p>
                                        </div>
                                        <div className={styles.detailForm}>


                                            <Input
                                                label="Name"
                                                name="name"
                                                type="text"
                                                placeholder="Enter folder name"
                                            />
                                            <Input
                                                label={"Description"}
                                                name={"description"}
                                                type={"text"}
                                                placeholder={"Enter description"}
                                            />
                                            {/* <p>{charCount} characters left</p> */}

                                            <Select
                                                label="Select level"
                                                name="level"
                                                options={[
                                                    { value: "Beginner", label: "Beginner" },
                                                    { value: "Intermediate", label: "Intermediate" },
                                                    { value: "Advanced", label: "Advanced" },
                                                    { value: "Expert", label: "Expert" },
                                                ]}
                                                placeholder="Select level"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.box}>
                                        <div className={styles.header}>
                                            <h5>Upload files</h5>
                                            <p>Select and upload the files of your choice</p>
                                        </div>
                                        <div className={styles.uploadBox}>
                                            <div htmlFor="files" className={styles.uploadDiv}>
                                                <img src={getImageUrl('uploadDocs.png')} />
                                                <h5>Choose a file or drag & drop it here</h5>
                                                <p>JPEG, PNG, and PDF formats, up to 50MB</p>

                                                {showFileName && <div className={styles.theFiles}>Selected file(s):
                                                    {fileNames.map((fil, i) => (
                                                        <p key={i}>{fil}</p>
                                                    ))}
                                                </div>}

                                                <label className={styles.uploadButton}>
                                                    Browse Files
                                                    <input type="file" name="files" id="files" multiple accept="image/png, image/jpeg, application/pdf" onChange={handleInputChange} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.box}>
                                        <div className={styles.flexHeader}>
                                            <h5>Files</h5>
                                        </div>
                                        {theLibrary.library_files && theLibrary.library_files.map((file, i) => (
                                            <div className={styles.section} key={i}>
                                                <div className={styles.text}>
                                                    {file.file_name}
                                                </div>
                                                <div>
                                                    <button type="button" className={styles.actionsButton} onClick={(e) => toggleAction(e, i)}><img src={getImageUrl('threeDots.png')} /></button>
                                                    {actionsOpen[i] && <div className={styles.theActions} ref={actionsRef}>
                                                        <h5>ACTION</h5>
                                                        <button type="button" onClick={() => deleteFile(file.file_id)}><img src={getImageUrl('delete.png')} />DELETE</button>
                                                    </div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                        </Form>
                    </Formik>

                </>
            }


            <ConfirmModal isOpen={isOpenConfirm} setOpen={setIsOpenConfirm} item={item} cohort={'none'} selected={selected} confirmType={confirmType} reload={loadLessonDetails} />

        </div>
    )
}