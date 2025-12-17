import { useRef } from "react";
import { Upload, Camera } from "lucide-react";

const PhotoUploader = ({ selectedFiles = [], onFilesChange, maxFiles = 4 }) => {
  const fileInputRef = useRef(null);

  const handleFileClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, maxFiles);
    onFilesChange(files);
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl">
          <Camera className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-bold text-gray-800 text-lg">Upload Photos</h3>
      </div>

      <div
        onClick={handleFileClick}
        className="border-2 border-dashed border-gray-300 rounded-2xl p-6 sm:p-8 text-center cursor-pointer hover:border-green-400 hover:bg-green-50/50 transition-all group"
      >
        <div className="p-4 bg-gray-100 group-hover:bg-green-100 rounded-2xl inline-block mb-3 transition-colors">
          <Upload className="w-8 h-8 text-gray-400 group-hover:text-green-500 transition-colors" />
        </div>
        <p className="text-gray-700 font-semibold">Click to add photos</p>
        <p className="text-sm text-gray-500 mt-1">
          Upload up to {maxFiles} photos showing the issue clearly
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {selectedFiles.length > 0 && (
        <div className="mt-4 flex gap-3 flex-wrap justify-center">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview ${index}`}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PhotoUploader;
