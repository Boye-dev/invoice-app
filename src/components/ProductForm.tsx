import TextInput from "../shared/components/TextInput";
import Button from "../shared/components/Button";
import FileUpload from "../shared/components/FileUpload";

const ProductForm = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className=" bg-white p-5 rounded-md shadow-lg mt-10">
            <div className="flex justify-between items-center">
              <p className="font-bold text-xl mb-2">Product Data</p>
            </div>
            <TextInput
              label="Name"
              inputDivStyles="w-full  mb-4 "
              placeholder="Enter Name"
              name="name"
              onChange={() => {}}
            />
            <TextInput
              label="price"
              inputDivStyles="w-full mb-4 "
              placeholder="Enter Email"
              name="email"
              onChange={() => {}}
            />
            <TextInput
              label="Description"
              inputDivStyles="w-full mb-4 "
              placeholder="Enter Description"
              name="description"
              onChange={() => {}}
            />
            <FileUpload name="file" label="Product Image" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full mt-10 md:w-[500px]">
          <Button text="Submit" fullWidth />
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
