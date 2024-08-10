import TextInput from "../shared/components/TextInput";
import Button from "../shared/components/Button";

const ClientForm = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className=" bg-white p-5 rounded-md shadow-lg mt-10">
            <div className="flex justify-between items-center">
              <p className="font-bold text-xl mb-2">Client Data</p>
            </div>
            <TextInput
              label="Name"
              inputDivStyles="w-full  mb-4 "
              placeholder="Enter Name"
              name="name"
              onChange={() => {}}
            />
            <TextInput
              label="Email"
              inputDivStyles="w-full mb-4 "
              placeholder="Enter Email"
              name="email"
              onChange={() => {}}
            />
            <TextInput
              label="Address"
              inputDivStyles="w-full mb-4 "
              placeholder="Enter Address"
              name="address"
              onChange={() => {}}
            />
            <input type="checkbox" />
            <label className="ml-2 ">Save contact</label>
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

export default ClientForm;
