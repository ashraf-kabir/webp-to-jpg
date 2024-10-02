import { useState } from 'react';
import imageCompression from 'browser-image-compression';

const ImageConverter = () => {
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadFileName, setDownloadFileName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const convertWebPToJPG = async (file) => {
    try {
      const options = {
        fileType: 'image/jpeg',
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        initialQuality: 1,
      };

      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error('Error during conversion:', error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const unixTimestamp = Date.now();
    setDownloadFileName(
      `${file.name.split('.').slice(0, -1).join('.')}_${unixTimestamp}`
    );

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    convertWebPToJPG(file).then((jpgFile) => {
      const downloadLink = URL.createObjectURL(jpgFile);
      setDownloadUrl(downloadLink);
    });
  };

  return (
    <div className='container'>
      <h2 className='header'>WebP to JPG Converter</h2>
      <input
        type='file'
        accept='.webp'
        onChange={handleImageUpload}
        className='file-input'
      />
      {imagePreview && (
        <div className='preview-container'>
          <p>Image Preview:</p>
          <img src={imagePreview} alt='Preview' className='image-preview' />
        </div>
      )}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download={`${downloadFileName}.jpg`}
          className='download-link'
        >
          Converted && Download
        </a>
      )}
    </div>
  );
};

export default ImageConverter;
