import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Grid2, Box } from "@mui/material";

const Upload = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [descriptions, setDescriptions] = useState([]); // State to hold image descriptions

    // Function to handle image removal
    const handleRemove = (index) => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(newImages);
        setDescriptions((prevDescriptions) => prevDescriptions.filter((_, i) => i !== index));
    };

    // Placeholder function to fetch descriptions
    const fetchDescriptions = async (images) => {
        // Simulate an API call
        return images.map((_, index) => `Description for image ${index + 1}`);
    };

    // const fetchDescriptions = async (images) => {
    //     const formData = new FormData();
    //     images.forEach((image) => formData.append("images", image));
    
    //     const response = await fetch("YOUR_API_ENDPOINT", {
    //         method: "POST",
    //         body: formData,
    //     });
    //     const data = await response.json();
    //     return data.descriptions; // Adjust this based on your API response format
    // };
    

    // Handle "Get Descriptions" button click
    const handleGetDescriptions = async () => {
        if (selectedImages.length === 0) {
            alert("Please select images first.");
            return;
        }

        const fetchedDescriptions = await fetchDescriptions(selectedImages);
        setDescriptions(fetchedDescriptions);
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
                                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                                            {descriptions[index] || "No description available"}
                                        </Typography>
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
                    event.target.value = ""; // Reset the file input
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

            {/* Get Descriptions Button */}
            {selectedImages.length > 0 && (
                <Box sx={{ marginTop: 2 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleGetDescriptions}
                    >
                        Get Descriptions
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Upload;
