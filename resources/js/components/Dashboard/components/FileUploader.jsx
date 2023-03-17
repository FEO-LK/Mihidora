import React, { useEffect, useState, } from "react"
import { useParams, Link } from "react-router-dom";
import { Grid, Modal, Box, FormControlLabel, Checkbox, Button, Typography } from "@mui/material"

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
//FILE UPLOADER
export default function FileUploader(props) {
    const projectParams = useParams();
    const [loadImages, setloadImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [images, setImages] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleMediaOpen = () => setOpen(true);
    const handleMediaClose = () => setOpen(false);
    const [error, setError] = useState([]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90vh',
        maxWidth: 1100,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    useEffect(() => {
        getMediaFiels();

    }, [localStorage.getItem('auth_id')]);

    const getMediaFiels = () => {
        axios.get(`/api/view-doc-by-user`).then(res => {
          if (res.data.status === 200) {
            setloadImages(res.data.mediafiles);
          }
          else if (res.data.status === 404) {
            console.log(res.message, "message");
          }
        });
    }
    
    const changeHandler = (e) => {
        const validImageFiles = [];
        const { files } = e.target; 
        for (let i = 0; i < files.length; i++) {
            const seleFile = files[i];
            validImageFiles.push(seleFile);
        }
        if (validImageFiles.length) {
            setImageFiles(validImageFiles);
            return;
        }
        alert("Sorry, Selected files are not of valid type!");
    };

    useEffect(() => {
        const images = [], fileReaders = [];
        let isCancel = false;
        if (imageFiles.length) {
            imageFiles.forEach((file) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                // console.log(fileReaders);
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if (result) {
                        images.push(result)
                    }
                    if (images.length === imageFiles.length && !isCancel) {
                        setImages(images);
                        uploadedFiles(images, imageFiles[0].name);
                    }  
                }
                fileReader.readAsDataURL(file);
            })
        };

        return () => {
            isCancel = true;
            fileReaders.forEach(fileReader => {
                if (fileReader.readyState === 1) {
                    fileReader.abort()
                }
            })
        }

    }, [imageFiles]);

    const uploadedFiles = (value, fileName) => {
        const data = {
            file: value,
            fileName: fileName
        }
        console.log(data);
        axios.post(`/api/media-upload`, data).then(res => {  //FILE UPLOADER
          if(res.data.status === 200) {
            setloadImages([...loadImages, ...res.data.imgIds])
            setError([]);
          }
          else if(res.data.status === 422) {
            setError(res.data.errors, "422");
          }
          else {
            console.log(res.data.errors, "error");
          }
        });
    }

    const handleCheckboxChange = (e) => {
        setSelectedImages([...selectedImages, e.target.value]);
    }

    const insertMedia = () => {
        props.setSelectedFiles([...selectedImages, ...props.files]);
        setSelectedImages([]);
        handleMediaClose();
    }

    return (
        <div className="image-uploader_wrap">
            <Button onClick={handleMediaOpen}>Add Files</Button>
            <Modal
                open={open}
                onClose={handleMediaClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="action-row">
                        <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={changeHandler}
                            accept="*/*"
                        />
                    </div>
                    <div className="media-list">
                        {loadImages.map((item, index) => {
                            var fileType = item.file_path.split('.');
                            if(fileType[1] == 'pdf') {
                                return <div key={item.file_path} className="media-icon">
                                    <div className="media-thumbnail">
                                        <img src={`../../../../images/pdf-icon.png`} />
                                        <div className="med_file_name">
                                            <Typography>{item.file_name}</Typography>
                                        </div>
                                    </div>
                                    <FormControlLabel
                                        value={item.id}
                                        control={<Checkbox value={item.file_path} onChange={e => handleCheckboxChange(e)} />}
                                    />
                                </div>
                            }
                            else if(fileType[1] == 'xls' || fileType[1] == 'xlsx' || fileType[1] == 'csv') {
                                return <div key={item.file_path} className="media-icon">
                                    <div className="media-thumbnail">
                                        <img src={`../../../../images/excel-icon.png`} />
                                        <div className="med_file_name">
                                            <Typography>{item.file_name}</Typography>
                                        </div>
                                    </div>
                                    <FormControlLabel
                                        value={item.id}
                                        control={<Checkbox value={item.file_path} onChange={e => handleCheckboxChange(e)} />}
                                    />
                                </div>
                            }
                            else if(fileType[1] == 'pptx' || fileType[1] == 'ppt') {
                                return <div key={item.file_path} className="media-icon">
                                    <div className="media-thumbnail">
                                        <img src={`../../../../images/pp-icon.png`} />
                                        <div className="med_file_name">
                                            <Typography>{item.file_name}</Typography>
                                        </div>
                                    </div>
                                    <FormControlLabel
                                        value={item.id}
                                        control={<Checkbox value={item.file_path} onChange={e => handleCheckboxChange(e)} />}
                                    />
                                </div>
                            }
                            else if(fileType[1] == 'doc' || fileType[1] == 'docx') {
                                return <div key={item.file_path} className="media-icon">
                                    <div className="media-thumbnail">
                                        <img src={`../../../../images/word-icon.png`} />
                                        <div className="med_file_name">
                                            <Typography>{item.file_name}</Typography>
                                        </div>
                                    </div>
                                    <FormControlLabel
                                        value={item.id}
                                        control={<Checkbox value={item.file_path} onChange={e => handleCheckboxChange(e)} />}
                                    />
                                </div>
                            }
                            else if(fileType[1] == 'zip' || fileType[1] == 'rar') {
                                return <div key={item.file_path} className="media-icon">
                                    <div className="media-thumbnail">
                                        <img src={`../../../../images/zip-icon.png`} />
                                        <div className="med_file_name">
                                            <Typography>{item.file_name}</Typography>
                                        </div>
                                    </div>
                                    <FormControlLabel
                                        value={item.id}
                                        control={<Checkbox value={item.file_path} onChange={e => handleCheckboxChange(e)} />}
                                    />
                                </div>
                            }
                            else {
                                return <div key={item.file_path} className="media-icon">
                                    <div className="media-thumbnail">
                                        <img src={`../../../../images/unknown-icon.png`} />
                                        <div className="med_file_name">
                                            <Typography>{item.file_name}</Typography>
                                        </div>
                                    </div>
                                    <FormControlLabel
                                        value={item.id}
                                        control={<Checkbox value={item.file_path} onChange={e => handleCheckboxChange(e)} />}
                                    />
                                </div>
                            }
                        })}
                    </div>
                    <div className="action-row">
                        <Button
                            variant={"outlined"}
                            className="user__theme-btn"
                            sx={{ marginY: 2 }}
                            onClick={insertMedia}
                        >Insert</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}