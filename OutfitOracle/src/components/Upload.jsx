import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Grid2, Box } from "@mui/material";
import groq from "Groq";
import Groq from "groq-sdk";



const Upload = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [descriptions, setDescriptions] = useState([]); // State to hold image descriptions
    const [base64Image, setBase64Image] = useState(null);

    // Function to handle image removal
    const handleRemove = (index) => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(newImages);
        setDescriptions((prevDescriptions) => prevDescriptions.filter((_, i) => i !== index));
    };

    function convertToBase64(image) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
      
          reader.onload = () => {
            resolve(reader.result); // Resolve the promise with the Base64 string
          };
      
          reader.onerror = (error) => {
            reject(error); // Reject the promise in case of an error
          };
      
          reader.readAsDataURL(image); // Read the file as a Base64 string
        });
    }

    const groq = new Groq({ apiKey: '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', dangerouslyAllowBrowser: true });
    async function getDescription(image) {
        const base64_image = await convertToBase64(image);
        console.log(base64_image);
        const chatCompletion = await groq.chat.completions.create({
            "messages": [
            {
                "role": "user",
                "content": [
                {
                    "type": "text",
                    "text": "Please describe the outfits in the image in detail."
                },
                {
                    "type": "image_url",
                    "image_url": {
                    "url": `${base64_image}`,
                    // "url": "https://upload.wikimedia.org/wikipedia/commons/f/f2/LPU-v1-die.jpg"
                    },
                }
                ]
            }
            ],
            "model": "llama-3.2-11b-vision-preview",
        });

        console.log(chatCompletion.choices[0].message.content);
        return chatCompletion.choices[0].message.content;
    }

    const fetchDescriptions = async (images) => {
        let descriptions2 = [];
        console.log(images);
      
        // Use map to create an array of promises
        const descriptionPromises = images.map((image) => getDescription(image));
      
        // Wait for all promises to resolve
        descriptions2 = await Promise.all(descriptionPromises);
      
        return descriptions2;
    };
    

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
