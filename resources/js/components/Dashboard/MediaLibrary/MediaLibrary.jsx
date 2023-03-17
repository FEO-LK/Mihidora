import React, { useState, useEffect } from "react"
import { Grid, Box, FormControlLabel } from "@mui/material";
import MainLayout from "../BaseLayout";
import FileUploader from '../components/FileUploader'

function MediaLibrary(props) {
  const [photos, setPhotos] = useState([]);
  const [loadImages, setloadImages] = useState([]);

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

  const getMediaFiles = (e) => {
    setPhotos(e);
  }

  return (
    <MainLayout title={"Media Library"}>
      <Box>
        <Grid container className="media_library">
          <Grid item xs={12}>

            <FileUploader setSelectedFiles={getMediaFiles} />
            
            <Grid container spacing={2} sx={{ 'marginBottom': 2 }}>
              {photos.map((element, index) => (
                <Grid key={index} item xs={4} className="photo-preview">
                  <img src={`/storage/` + element} />
                </Grid>
              ))}
            </Grid>

            <div className="media-list">
              {loadImages.map((item, index) => {
                return <div key={index} className="media-icon">
                  <div className="media-thumbnail">
                    <img src={`/storage/` + item.file_path} />
                  </div>
                </div>
              })}
            </div>

          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  )
}

export default MediaLibrary