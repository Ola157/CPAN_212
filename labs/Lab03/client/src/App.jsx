import { useState } from "react";

const App = () => {
  // what do we need to track
  const [singleFile, setSingleFile] = useState(null);
  // const [multipleFiles, setMultipleFiles] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);
  const [message, setMessage] = useState("");

  // Handlers
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  // fetch functions -> fetch a random single image
  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);

      const blob = await response.blob(); // we made a blob - Binary Large Object
      // but thats not an image, so we need to make an image element

      // using createObjectURL
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  // fetch functions -> save single
  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", singleFile);

      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // fetch functions -> save multiple [TODO]
  const fetchMultipleFiles = async () => {
    try {
      // fetch -fetch/multiple => [01,02,03]
      const response = await fetch(`http://localhost:8000/fetch/multiple`);
      const data = await response.json();
      console.log(data);
      // fetch -/fetch/file/filename variable
      const filePromises = data.map(async (filename) => {
        const fileResponse = await fetch(
          `http://localhost:8000/fetch/file/${filename}`
        );

        const fileBlob = await fileResponse.blob();
        const imageUrl = URL.createObjectURL(fileBlob);
        return imageUrl;
      });

      const imageUrls = await Promise.all(filePromises);
      setDisplayImages(imageUrls);
    } catch (error) {
      console.log(error);
    }
  };
  // fetch functions -> fetch multiple [TODO]
  // fetch functions -> fetch dog image [TODO]
  const [displayDogImage, setDisplayDogImage] = useState("");
  const fetchDogImage = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await response.json();
      setDisplayDogImage(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  // fetch functions -> save dog image [TODO]
  const saveDogImage = async () => {
    try {
      const fileResponse = await fetch(displayDogImage);
      const blob = await fileResponse.blob();


      const formData = new FormData();
      formData.append("file", blob, "dog-image.jpg");

      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    }}>
      <h1 style={{ color: "#333" }}>Image Upload & Fetch</h1>
      <p style={{ color: "#d9534f" }}>{message}</p>

      <h2>Fetch Single Random Image</h2>
      <button onClick={fetchSingleFile} style={buttonStyle}>Fetch Single File</button>
      {displayImage && (
        <div>
          <h3>Single File</h3>
          <img
            src={displayImage}
            alt="Display Image"
            style={imageStyle}
          />
        </div>
      )}
      <form onSubmit={handleSubmitSingleFile} style={formStyle}>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button type="submit">Upload Single File</button>
      </form>
      <button onClick={fetchMultipleFiles} style={buttonStyle}>Fetch Multiple Files</button>
      {displayImages.length > 0 ? (
        displayImages.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} style={imageStyle} />
          </div>
        ))
      ) : (
        <p>No images to display</p>
      )}
      <button onClick={fetchDogImage} style={buttonStyle}>Fetch Dog Image</button>
      {displayDogImage && (
        <div>
          <img src={displayDogImage} style={imageStyle} />
          <br />
          <button onClick={saveDogImage} style={buttonStyle}>Save it</button>
        </div>
      )}

    </div>

  );
};

const buttonStyle = {
  padding: "10px 15px",
  margin: "10px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer"
};

const imageStyle = {
  width: "200px",
  margin: "10px",
  borderRadius: "5px"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px"
};


export default App;