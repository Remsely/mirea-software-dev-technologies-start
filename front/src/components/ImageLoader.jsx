import React, { useState } from "react";

const ImageUploader = ({ setImage }) => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
            setImage(file);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            {imagePreview && (
                <div>
                    <img
                        src={imagePreview}
                        alt="Uploaded"
                        style={{ maxWidth: "300px" }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
