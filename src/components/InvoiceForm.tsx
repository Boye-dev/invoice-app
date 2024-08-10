import { useState } from "react";
import TextInput from "../shared/components/TextInput";
import { FaUsers } from "react-icons/fa";
import SelectInput from "../shared/components/SelectInput";
import Button from "../shared/components/Button";
import Modal from "../shared/components/Modal";

const InvoiceForm = ({ quotation }: { quotation?: boolean }) => {
  const [openContacts, setOpenContacts] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className=" bg-white p-5 rounded-md shadow-lg">
            <p className="font-bold text-xl mb-2">
              {quotation ? "Quotation" : "Invoice"} Information
            </p>
            <TextInput
              label="Name"
              inputDivStyles="w-full "
              placeholder="Enter Name"
              name="name"
              onChange={() => {}}
            />
          </div>

          <div className=" bg-white p-5 rounded-md shadow-lg mt-10">
            <div className="flex justify-between items-center">
              <p className="font-bold text-xl mb-2">Client Data</p>
              <div
                onClick={() => setOpenContacts(true)}
                className="flex items-center gap-1 bg-blue-900 text-white px-4 py-1 rounded-lg cursor-pointer"
              >
                <FaUsers />
                <p className="">Contacts</p>
              </div>
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

        <div className=" bg-white p-5 rounded-md shadow-lg">
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl mb-2">
              Items {quotation || "& Payment"}{" "}
            </p>
          </div>
          <SelectInput
            multiple
            label="Products"
            placeholder="Select Products"
            inputDivStyles="w-full"
            name="products"
            data={[
              {
                label: "5",
                value: 5,
              },
              {
                label: "10",
                value: 10,
              },
              {
                label: "20",
                value: 20,
              },
              {
                label: "30",
                value: 30,
              },
            ]}
            onChange={(val) => {}}
          />
          {!quotation && (
            <SelectInput
              label="Payment Status"
              placeholder="Select Payment Method"
              inputDivStyles="w-full mt-4"
              name="payment"
              renderOption={(val) =>
                [
                  {
                    label: "Paid Cash",
                    value: "PAID_CASH",
                  },
                  {
                    label: "Paid Online",
                    value: "PAID_ONLINE",
                  },
                  {
                    label: "Fully Paid",
                    value: "FULLY_PAID",
                  },
                  {
                    label: "Installmental Payment",
                    value: "INSTALLMENT",
                  },
                ].find((value) => value.value === val)?.label
              }
              data={[
                {
                  label: "Paid Cash",
                  value: "PAID_CASH",
                },
                {
                  label: "Paid Online",
                  value: "PAID_ONLINE",
                },
                {
                  label: "Fully Paid",
                  value: "FULLY_PAID",
                },
                {
                  label: "Installmental Payment",
                  value: "INSTALLMENT",
                },
              ]}
              onChange={(val) => {}}
            />
          )}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full mt-10 md:w-[500px]">
          <Button text="Submit" fullWidth />
        </div>
      </div>
      <Modal
        open={openContacts}
        close={() => setOpenContacts(false)}
        content={<FaUsers />}
      />
    </div>
  );
};

export default InvoiceForm;
