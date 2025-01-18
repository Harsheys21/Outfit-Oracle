import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Grid2, Box } from "@mui/material";

const Upload = () => {
    const [selectedImages, setSelectedImages] = useState([]);

    // Function to handle image removal
    const handleRemove = (index) => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(newImages);
    };

    return (
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
            {/* Header */}
            <Typography variant="h4" gutterBottom>
                Upload and Display Images
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
                Accepted Image formats are JPEG, PNG, and WEBP
            </Typography>

            {/* Conditionally render the selected images if they exist */}
            {selectedImages.length > 0 && (
                <Box sx={{ marginBottom: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Selected Images:
                    </Typography>
                    <Grid2 container spacing={2} justifyContent="center">
                        {selectedImages.map((image, index) => (
                            <Grid2 item key={index}>
                                <Card sx={{ maxWidth: 250, textAlign: "center" }}>
                                    <CardContent>
                                        <img
                                            alt="Selected"
                                            width="100%"
                                            height="auto"
                                            src={URL.createObjectURL(image)}
                                        />
                                        <Button
                                            sx={{ marginTop: 1 }}
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRemove(index)}
                                        >
                                            Remove
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            )}

            {/* File Input */}
            <input
                type="file"
                name="myImages"
                accept="image/webp, image/png, image/jpeg" 
                multiple
                onChange={(event) => {
                    const files = Array.from(event.target.files); // Convert FileList to Array
                    setSelectedImages((prevImages) => [...prevImages, ...files]); // Append new images
                }}
                style={{ display: "none" }}
                id="upload-image-input"
            />
            <label htmlFor="upload-image-input">
                <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    sx={{ marginTop: 2 }}
                >
                    Choose Images
                </Button>
            </label>
        </Box>
    );
};

export default Upload;
