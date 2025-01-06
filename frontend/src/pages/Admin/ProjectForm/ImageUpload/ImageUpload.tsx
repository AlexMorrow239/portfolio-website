import React from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import './ImageUpload.scss';

interface ImageUploadProps {
  imagePreview: string | null;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  imagePreview,
  onImageSelect,
  onImageRemove,
  error,
}) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  return (
    <div
      className={`image-upload ${error ? 'image-upload--error' : ''}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {imagePreview ? (
        <div className="image-upload__preview">
          <img src={imagePreview} alt="Preview" />
          <button type="button" className="image-upload__remove" onClick={onImageRemove}>
            <X size={20} />
          </button>
        </div>
      ) : (
        <label className="image-upload__label">
          <ImageIcon size={24} />
          <span>Drag & drop or click to upload</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onImageSelect(file);
              }
            }}
          />
        </label>
      )}
      {error && <span className="image-upload__error">{error}</span>}
    </div>
  );
};

export default ImageUpload;
