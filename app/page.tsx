"use client";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { FaTrashAlt } from "react-icons/fa";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState<string>("");

  const dropHandler = (acceptedFiles: File[]) => {
    const uniqueFiles = acceptedFiles.filter(
      (file) => !files.some((existingFile) => existingFile.name === file.name)
    );
    setFiles([...files, ...uniqueFiles]);
  };

  const removeHandler = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("title", title);

    try {
      const res = await fetch("/api/finetune", {
        method: "POST",
        body: formData,
      });

      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="container max-w-2xl mx-auto my-10 px-4">
      {/* Image Input Section */}
      <section className="w-full mx-auto mb-12">
        <div className="text-center mb-10">
          <h1
            className="font-semibold text-transparent text-5xl bg-gradient-to-r
           from-blue-500 to-indigo-400 inline-block bg-clip-text"
          >
            AI Avatar Generator
          </h1>
        </div>

        <div className="flex flex-wrap mb-3">
          <input
            id="title"
            name="title"
            value={title}
            placeholder="Type model name"
            type="text"
            className="appearance-none block w-full bg-gray-200 text-gray-700
            border border-gray-200 rounded py-3 px-4 mb-3 leading-tight
            focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div
          className="w-full text-center border-4 border-gray-500 border-dashed
        rounded-md cursor-pointer mb-2 text-gray-500"
        >
          <Dropzone onDrop={dropHandler}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className="p-10">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        {title && (
          <div className="flex justify-center mt-4 mb-10">
            <button
              className="py-3 w-1/3 bg-yellow-500 rounded-md
           text-black text-md font-semibold hover:scale-105 duration-500"
              onClick={submitHandler}
            >
              Fine Tune
            </button>
          </div>
        )}
      </section>

      {/* Image Preview */}
      <section className="grid grid-cols-3 gap-4 mt-4">
        {files.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="object-cover w-full h-full rounded-md"
            />
            <button
              className="absolute top-0 right-0 p-2 bg-yellow-500 text-black"
              onClick={() => removeHandler(index)}
            >
              <FaTrashAlt />
            </button>
            <div
              className="absolute bottom-0 left-0 right-0 bg-gray-900
            bg-opacity-50 text-white p-2"
            >
              <p className="text-center">{file.name}</p>b
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
