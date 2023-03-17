import React, { useEffect, useState, } from "react"
import { useParams, Link } from "react-router-dom";
import { Grid, Modal, Box, FormControlLabel, Checkbox, Button } from "@mui/material"

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

export default function FileUploader(props) {
    const projectParams = useParams();
    const [loadImages, setloadImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [images, setImages] = useState('fhchgchgc');
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
        axios.get(`/api/view-file-by-user`).then(res => {
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
            if (seleFile.type.match(imageTypeRegex)) {
                validImageFiles.push(seleFile);
            }
        }
        if (validImageFiles.length) {
            setImageFiles(validImageFiles);
            return;
        }
        alert("Selected images are not of valid type!");
    };

    useEffect(() => {
        const images = [], fileReaders = [];
        let isCancel = false;
        if (imageFiles.length) {
            imageFiles.forEach((file) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if (result) {
                        images.push(result)
                    }
                    if (images.length === imageFiles.length && !isCancel) {
                        setImages(images);
                        uploadedFiles(images);
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

    const uploadedFiles = (value) => {
        const data = {file: value}
        axios.post(`/api/fileupload`, data).then(res => {
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
        props.setSelectedFiles(selectedImages);
        handleMediaClose();
    }

    return (
        <div className="image-uploader_wrap">
            {/* {
                images.length > 0 ?  
                    <Grid container>
                        {
                            images.map((image, idx) => {
                                return <Grid item md={4} key={idx}>
                                    <img src={image} alt="" />
                                </Grid>
                            })
                        }
                    </Grid> : null
            } */}
            <Button onClick={handleMediaOpen}>Add Media</Button>
            <Modal
                open={open}
                onClose={handleMediaClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {/* <Box component={"form"} onSubmit={insertMedia}>    */}
                    <Box sx={style}>
                        <div className="action-row">
                            <input
                                type="file"
                                id="file"
                                onChange={changeHandler}
                                accept="image/png, image/jpg, image/jpeg"
                                multiple
                            />
                        </div>
                        <div className="media-list">
                            {loadImages.map((item, index) => {
                                return <div key={index} className="media-icon">
                                    <div className="media-thumbnail">
                                        <img src={`/storage/`+item.file_path} />
                                    </div>
                                    <FormControlLabel
                                        value={item.id}
                                        control={<Checkbox value={item.file_path} onChange={e => handleCheckboxChange(e)} />}
                                    />
                                </div>
                            })}
                        </div>
                        <div className="action-row">
                            <Button
                                fullWidth
                                variant={"outlined"}
                                className="user__theme-btn"
                                sx={{ marginY: 2 }}
                                onClick={insertMedia}
                            >Insert</Button>
                        </div>
                    </Box>
                {/* </Box>  */}
            </Modal>
        </div>
    );
}