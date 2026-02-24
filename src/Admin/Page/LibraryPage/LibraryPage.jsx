import React, { useEffect, useRef, useState } from "react";
import { getImageUrl } from "../../../utilis";
import styles from "./Library.module.css";
import axios from 'axios';
import Modal from "../../Components/Modals/Modal";
import { ConfirmModal } from "../../Components/Modals/ConfirmModal";
import { customToast, customToastError } from "../../../Components/Notifications";
import { useCreateLibraryMutation, useGetLibrariesForIntructorQuery } from "../../../redux/services/library.service";
import { Form, Formik } from "formik";
import Input from "../../../Components/UI/Input";
import Select from "../../../Components/UI/Select";
import { Stack } from "@chakra-ui/react";
import Button from "../../../Components/UI/Button";
import Pagination from "../../../Components/Pagination/Pagination";

export const LibraryPage = () => {

    const [open, setOpen] = useState(false);
    const [actionsOpen, setActionsOpen] = useState({});
    const [selected, setSelected] = useState({});
    const [confirmType, setConfirmType] = useState('');
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);

    const actionsRef = useRef(null);
    const createRef = useRef(null);

    const { data: libraries, refetch, isError, isLoading } = useGetLibrariesForIntructorQuery(
        sessionStorage.getItem('id')
    );
    // console.log(libraries)
    useEffect(() => {
        if (isError) {
            customToastError("Error getting library. Please try again")
        }
    })
    const [newLibrary, { error, isLoading: isLoading2 }] = useCreateLibraryMutation();

    const handleToDetails = (event, lib) => window.location.href = `library/${lib.library_id}`;


    const createNewLibrary = async (values) => {
        await newLibrary({
            ...values,
            instructor_id: sessionStorage.getItem('id'),
        })
            .unwrap()
            .then(res => {
                console.log(res)
                setOpen(false);
                refetch();
                customToast('Successfully added new folder.')
            })

            .catch(err => {
                console.log(err);
                customToastError('Error adding folder. Try again');
            })
    }

    const handleDelete = (e, clas) => {
        e.preventDefault();
        setSelected(clas);
        setConfirmType('delete');
        setIsOpenConfirm(true);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };
    const filteredLibraries = libraries?.filter(cour => {
        const searchLower = search?.toLowerCase();
        return (
            cour.description?.toLowerCase().includes(searchLower) ||
            cour.instructor_name?.toLowerCase().includes(searchLower) ||
            cour.level?.toLowerCase().includes(searchLower) ||
            cour.name?.toLowerCase().includes(searchLower)
        )
    });


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLibraries = filteredLibraries?.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePageNumber = (itemNumber) => {
        setItemsPerPage(itemNumber);
        setCurrentPage(1);
        scroll.current.scrollIntoView();
    };


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
        if (createRef.current && !createRef.current.contains(event.target)) {
            setOpen(false);
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
            <div className={styles.whole}>

                <div className={styles.breadcrumb}>Library</div>

                <div>
                    <div className={styles.title}>
                        <h1>Library</h1>
                        <div className={styles.buttons}>
                            <div className={styles.searchBar}>
                                <img src={getImageUrl('searchIcon.png')} />
                                <input
                                    placeholder="Search"
                                    type="text"
                                    value={search}
                                    onChange={handleSearch}
                                />
                            </div>
                            {/* <button className={styles.buttonOne}>Sort By<img src={getImageUrl('sortIcon.png')} /></button> */}
                            <button className={styles.buttonTwo} onClick={() => setOpen(true)} ><img src={getImageUrl('whitePlus.png')} />Create New Folder</button>
                        </div>
                    </div>


                    {isLoading ? <h5 className={styles.loading}>Loading...</h5> :

                        currentLibraries?.length === 0 ?

                            <p className={styles.none}>Library is empty</p>
                            :
                            <div>
                                <div className={styles.library}>

                                    {currentLibraries?.map((lib, index) => (
                                        <div key={index} className={styles.libInfo} id="outer">
                                            <div className={styles.infoHeader}>
                                                <h3>{lib.name}</h3>
                                                <div>
                                                    <button className={styles.actionsButton} onClick={(e) => toggleAction(e, index)}><img src={getImageUrl('threeDots.png')} /></button>
                                                    {actionsOpen[index] && <div className={styles.theActions} ref={actionsRef}>
                                                        <h5>ACTION</h5>
                                                        <button onClick={(e) => handleToDetails(e, lib)}><img src={getImageUrl('edit.png')} />EDIT</button>
                                                        <button onClick={(e) => handleDelete(e, lib)}><img src={getImageUrl('delete.png')} />DELETE</button>
                                                    </div>}
                                                </div>
                                            </div>
                                            <p><u>Description:</u> {lib.description}</p>
                                            <div className={styles.crumb}>
                                                <div className={styles.profile}><img src={getImageUrl('profile.svg')} alt="" />{lib.instructor_name}</div>
                                                <div className={styles.students}><img src={getImageUrl('frame5.png')} alt="" />{lib.file_count} {parseInt(lib.file_count) === 1 ? 'File' : 'Files'}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>


                                <div style={{ w: '100%', display: "flex", alignItems: 'center', marginTop: '25px' }}>
                                    <div className={styles.showRows}>
                                        Show
                                        <select onChange={(e) => handlePageNumber(e.target.value)} >
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={15}>15</option>
                                        </select>
                                        Rows
                                    </div>
                                    <Pagination className={styles.pag}
                                        currentData={filteredLibraries}
                                        currentPage={currentPage}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={handlePageChange}
                                    />

                                </div>
                            </div>
                    }
                </div>
            </div>


            <Modal isOpen={open}>
                <Stack align="flex-start" py={4} className={styles.class_modal}>
                    <Formik
                        initialValues={{
                            name: "",
                            description: "",
                            level: "",

                        }}
                        onSubmit={(values, actions) => {
                            // console.log(values);
                            createNewLibrary(values);
                        }}
                    >
                        {(props) => (
                            <Form style={{ width: "100%" }}>
                                <Stack spacing={4}>
                                    <Input
                                        label={"Folder Name"}
                                        name={"name"}
                                        type={"text"}
                                        placeholder={"Enter folder name"}
                                    />
                                    <Input
                                        label={"Description"}
                                        name={"description"}
                                        type={"text"}
                                        placeholder={"Enter description"}
                                    />
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

                                    <Stack direction="row" justify="space-between" w="100%">
                                        <Stack></Stack>
                                        <Stack direction="row">
                                            <Button
                                                text="Cancel"
                                                type='button'
                                                onClick={() => setOpen(false)}
                                                isDisabled={isLoading2}
                                                isLoading={isLoading2}
                                            />

                                            <Button
                                                text="Submit"
                                                type='submit'
                                                isDisabled={isLoading2}
                                                isLoading={isLoading2}
                                            />
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Stack>
            </Modal>


            <ConfirmModal isOpen={isOpenConfirm} setOpen={setIsOpenConfirm} item={'Library'} cohort={'none'} selected={selected} confirmType={confirmType} reload={refetch} />

        </>
    )
}