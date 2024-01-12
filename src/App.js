import React, { useState } from "react";
import Tesseract from "tesseract.js";

const ImageUploadComponent = () => {
  const [imagePath, setImagePath] = useState(null);
  const [extractedText, setExtractedText] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const uploadedImagePath = reader.result;
        setImagePath(uploadedImagePath);

        // Use Tesseract.js to extract text from the image
        extractTextFromImage(uploadedImagePath);
      };

      reader.readAsDataURL(file);
    }
  };

  const extractTextFromImage = (imagePath) => {
    Tesseract.recognize(
      imagePath,
      "eng", // Language: English
      {
        logger: (info) => console.log(info),
      }
    )
      .then(({ data: { text } }) => {
        setExtractedText(text);
      })
      .catch((error) => {
        console.error("Error extracting text:", error);
      });
  };

  return (
    <div>
      <h1>Image To Text Extractor</h1>
      <div className="input">

      <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <section className="flex">

      {imagePath && (
        <div className="image">
          <p>Uploaded Image:</p>
          <img
            src={imagePath}
            alt="Uploaded"
            style={{ maxWidth: "100%", maxHeight: "900px" }}
          />
        </div>
      )}
      {extractedText && (
        <div className="text">
          <p>Extracted Text:</p>
          <pre>{extractedText}</pre>
        </div>
      )}
      </section>
    </div>
  );
};

export default ImageUploadComponent;
