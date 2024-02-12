import { Button } from "react-bootstrap";

export const ImageUpload = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const instanceEndpoint = "ec2-3-94-167-32.compute-1.amazonaws.com";

  const uploadFile = async (username, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      // const response = await fetch(
      //   `https://movieapi-yazx.onrender.com/users/${username}/upload`,
      //   {
      const response = await fetch(
        `https://${instanceEndpoint}/users/${username}/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${storedToken}`, // Replace with your authentication token
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert("Upload failed:", errorData.error);
      } else {
        const responseData = await response.json();
        alert("Upload successful:", responseData.message);
        alert("Original File URL:", responseData.fileUrl);
        alert("Resized File URL:", responseData.resizedFileUrl);
      }
    } catch (error) {
      alert("Error during upload:", error);
    }
  };

  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];

    if (file) {
      uploadFile(storedUser, file);
    }
  };

  return (
    <div className="upload-file-container">
      <p>Upload an image</p>

      <div className="btn-flex">
        <input type="file" onChange={fileSelectedHandler}></input>

        <Button>Upload</Button>
      </div>
    </div>
  );
};
