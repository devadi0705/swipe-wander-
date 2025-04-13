
import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MediaUploaderProps {
  onMediaUpload: (files: File[]) => void;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({ onMediaUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      processFiles(filesArray);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      processFiles(filesArray);
    }
  };

  const processFiles = (files: File[]) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
    const validFiles = files.filter(file => allowedTypes.includes(file.type));
    
    if (validFiles.length !== files.length) {
      toast.warning("Some files were not included because they are not supported images or videos.");
    }
    
    if (validFiles.length > 0) {
      onMediaUpload(validFiles);
      toast.success(`${validFiles.length} ${validFiles.length === 1 ? 'file' : 'files'} uploaded successfully!`);
    }
    
    // Reset the input value to allow uploading the same file again
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors ${dragActive ? 'border-wander-purple bg-wander-softPurple/30' : 'border-gray-300 hover:border-wander-purple'}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <Upload size={40} className={`mb-4 ${dragActive ? 'text-wander-purple' : 'text-gray-400'}`} />
        <p className="mb-2 text-lg font-medium">
          {dragActive ? 'Drop files here' : 'Drag and drop your travel moments'}
        </p>
        <p className="mb-4 text-sm text-gray-500">Supported formats: JPEG, PNG, GIF, MP4</p>
        
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/gif,video/mp4,video/quicktime"
          onChange={handleChange}
          className="hidden"
        />
        
        <Button onClick={onButtonClick} className="button-gradient">
          Browse files
        </Button>
      </div>
    </div>
  );
};

export default MediaUploader;
