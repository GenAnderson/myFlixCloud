import { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";

import "./upload-image.scss";

export const ImageUpload = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const instanceEndpoint = "localhost:8080";

  const [uploadedImages, setUploadedImages] = useState([]);
  const [updatedImage, setUpdatedImage] = useState([]);

  // Upload an image
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    console.log(file);
    try {
      const response = await fetch(
        `http://${instanceEndpoint}/users/${storedUser.Username}/upload`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${storedToken}` },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert("Upload failed:", errorData.error);
      } else {
        const responseData = await response.json();
        alert("Upload successful", responseData.message);
        setUpdatedImage((prev) => !prev);
      }
    } catch (error) {
      alert("Error during upload:", error);
    }
  };

  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    console.log(file, storedUser);
    if (file) {
      uploadFile(file, storedUser);
    }
  };

  // Upload all S3 images at startup
  useEffect(() => {
    if (!storedToken) {
      return;
    }

    fetch(
      `http://${instanceEndpoint}/users/${storedUser.Username}/listObjects`,
      { method: "get", headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const contents = data.Contents;
        const keysFromFetch = contents.map((object) => {
          return {
            key: `https://imagebucketresizer.s3.amazonaws.com/${object.Key}`,
          };
        });

        setUploadedImages(keysFromFetch);
      })
      .catch((error) => console.error("Error:", error));
  }, [storedToken, updatedImage]);

  // Conditional rendering
  // if (!uploadedImages.length) {
  // You can render a loading spinner or message while waiting for the data
  // return <div>Loading...</div>;
  // }

  return (
    <div className="upload-file-container">
      <p>Upload an image</p>

      <div className="btn-flex">
        <input type="file" onChange={fileSelectedHandler}></input>
      </div>

      <div>
        {uploadedImages.map((imageObj, index) => (
          <img
            className="uploaded-images"
            key={index}
            src={imageObj.key}
            alt={`${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
