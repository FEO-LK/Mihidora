import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Alert, Box, Button, Modal, TextField } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "50vh",
    maxWidth: 1100,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const VolunteerModalButton = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");

    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertContent, setAlertContent] = useState("");

    const handleSubmit = () => {
        axios
            .post("/api/send-new-volunteer-notification", {
                name,
                email,
                notificationEmail: props.notificationEmail,
            })
            .then((res) => {
                if (res.data.status === 200) {
                    setAlert(true);
                    setAlertType("success");
                    setAlertContent(res.data.message);
                } else {
                    setAlert(true);
                    setAlertType("error");
                    setAlertContent(Object.values(res.data.message)[0]);
                }
            });
    };

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Typography mr={2}>{props.title}</Typography>
                <Chip
                    label={props.linkLabel}
                    onClick={() => setIsModalOpen(!isModalOpen)} // Call the function to handle button click
                    variant="outlined"
                    clickable
                    sx={{
                        border: "solid 2px #93aa40",
                        color: "#93aa40",
                    }}
                />
            </Stack>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Volunteer Information
                    </Typography>
                    {alert ? (
                        <Alert className="response-alert" severity={alertType}>
                            {alertContent}
                        </Alert>
                    ) : (
                        <></>
                    )}
                    <TextField
                        label="Name"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        type="text"
                        required
                        small
                        InputLabelProps={{
                            style: { fontSize: 14 },
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        type="text"
                        required
                        small
                        InputLabelProps={{
                            style: { fontSize: 14 },
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Contact Number"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        type="text"
                        required
                        small
                        InputLabelProps={{
                            style: { fontSize: 14 },
                        }}
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: "24px",
                            fontSize: "12px",
                            minWidth: "100px",
                            float: "right",
                            backgroundColor: "#93aa40",
                            "&:hover": {
                                backgroundColor: "black",
                            },
                        }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default VolunteerModalButton;
