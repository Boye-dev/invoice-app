import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import fileUpload from "../../assets/fileUpload.png";
import { FaTrash } from "react-icons/fa";
import { FileIcon, defaultStyles } from "react-file-icon";
import clsx from "clsx";

export type FileWithUrl = File & {
  url: string;
};
interface IFileUpload {
  multiple?: boolean;
  onChange?: (files: FileWithUrl[] | null) => void;
  name: string;
  accept?: string;
  label?: string;
  labelStyles?: string;
  withAsterisks?: boolean;
  error?: boolean;
  helperText?: string;
}
const FileUpload = forwardRef(
  (props: IFileUpload, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      multiple = false,
      onChange,
      name,
      label,
      accept,
      labelStyles,
      withAsterisks,
      error,
      helperText,
    } = props;
    const [allFiles, setAllFiles] = useState<FileWithUrl[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const hanleChange = (files: FileList | null) => {
      if (files) {
        const filesUrl: FileWithUrl[] = Array.from(files).map((file) => {
          const fileWithUrl = file as FileWithUrl;
          fileWithUrl.url = URL.createObjectURL(file);
          return fileWithUrl;
        });

        setAllFiles((prev) => {
          if (multiple) {
            if (prev.length > 0) {
              const allFiles = [...prev];
              filesUrl.map((value) => {
                const fileFound = allFiles.find((v) => v.name === value.name);
                if (!fileFound) {
                  allFiles.push(value);
                }
              });
              return allFiles;
            }
            return filesUrl;
          }
          return filesUrl;
        });
      }
    };

    useEffect(() => {
      onChange && onChange(allFiles);
    }, [allFiles]);

    const handleRemove = (file: FileWithUrl) => {
      setAllFiles((prev) => prev.filter((v) => v.name !== file.name));
      if (inputRef.current) inputRef.current.value = "";
    };
    const combinedLabelStles = clsx("font-bold pb-10", {
      [`${labelStyles}`]: Boolean(labelStyles),
    });
    return (
      <div className="w-full">
        {label && (
          <label className={combinedLabelStles} htmlFor={name}>
            {label}
            {withAsterisks && <span className="text-red-700">*</span>}
          </label>
        )}
        <label htmlFor={name} className="w-full">
          <div
            className={`border ${
              error ? "border-red-700" : "border-black"
            } border-dashed w-full min-h-10 rounded-sm flex flex-col gap-4 items-center justify-center py-5 cursor-pointer mb-5`}
          >
            <img src={fileUpload} alt="fileUpload" className="w-20 h-20" />
            <p className="text-center">Upload File</p>
          </div>
        </label>
        <input
          ref={inputRef}
          multiple={multiple}
          type="file"
          accept={accept}
          className="hidden"
          id={name}
          name={name}
          onChange={(e) => {
            hanleChange(e.target.files);
          }}
        />
        {allFiles?.map((file) => {
          const ext = file.name.split(".");
          const extension = ext[ext.length - 1];
          return (
            <div className="flex gap-1 w-full items-center justify-between">
              {file.type.startsWith("image") ? (
                <img
                  src={file.url}
                  key={file.url}
                  className="w-[50px] h-[50px] rounded-md"
                />
              ) : (
                <div className="w-[50px] h-[50px] rounded-md">
                  <FileIcon
                    extension={extension}
                    //@ts-ignore
                    {...defaultStyles[extension]}
                  />
                </div>
              )}

              <div className="text-wrap break-words w-3/5 ">
                <p className="text-balance">{file.name}</p>
              </div>

              <FaTrash
                className="text-red-600 w-4"
                onClick={() => handleRemove(file)}
              />
            </div>
          );
        })}
        {error && <p className="text-red-700 text-xs">{helperText}</p>}
      </div>
    );
  }
);

export default FileUpload;
