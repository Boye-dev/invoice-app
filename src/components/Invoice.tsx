import { UseFormReturn } from "react-hook-form";
import { CreateInvoice } from "../interfaces/invoice.interface";
import { ApiResponse } from "../interfaces/helper.interface";
import { IUser } from "../interfaces/user.interface";
import Button from "../shared/components/Button";
import { useRef } from "react";
//@ts-ignore
import html2pdf from "html2pdf.js";
import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "../services/invoice.service";
import { handleErrors } from "../utils/handleErrors";
import { toast } from "react-toastify";
const Invoice = ({
  form,
  profile,
  invoiceNumber,
  download = false,
}: {
  form: UseFormReturn<CreateInvoice, any, undefined>;
  profile: ApiResponse<IUser> | undefined;
  invoiceNumber?: string;
  download?: boolean;
}) => {
  const options = {
    filename: "invoice.pdf",
    margin: 0,
    html2canvas: { dpi: 300, letterRendering: true, useCORS: true, scale: 1 },

    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
      putTotalPages: true,
    },

    image: { type: "jpeg", quality: 1 },
  };
  const getCurrentDate = () => {
    const date = new Date();
    return `${date.toUTCString()}`;
  };
  const pdf = useRef<HTMLDivElement | null>(null);

  const handleGeneratePdf = async () => {
    if (pdf.current) {
      html2pdf().set(options).from(pdf.current).save();
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: sendEmail,
    onError: (error) => {
      handleErrors(error);
    },
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });
  const sendInvoice = () => {
    html2pdf()
      .set(options)
      .from(pdf.current)
      .output("blob")
      .then(function (blob: any) {
        const formData = new FormData();
        const file = new File([blob], "invoice.pdf", {
          type: "application/pdf",
        });

        formData.append("invoice", file);

        formData.append("email", form.getValues().client.email);
        formData.append("user", profile?.data?.businessEmail || "");
        mutate(formData);
      });
  };
  return (
    <>
      {download && (
        <div className="flex justify-between">
          <Button
            text="Download invoice"
            buttonStyles="mb-10"
            onClick={handleGeneratePdf}
          />

          <Button
            loading={isPending}
            text="Send Invoice"
            buttonStyles="mb-10"
            onClick={sendInvoice}
          />
        </div>
      )}
      <div ref={pdf}>
        <div className="w-full min-h-dvh border border-black">
          <div className="bg-blue-700 h-20 flex justify-between items-end px-10 pb-3">
            <p className="text-white font-bold text-2xl">INVOICE </p>
            <p className="text-white font-bold text-2xl">
              #{invoiceNumber || "GENERATED"}
            </p>
          </div>
          <div className="p-10">
            <div className="flex justify-between items-center">
              <div className="h-[150px] w-[150px]">
                <img
                  src={profile?.data?.businessLogo}
                  className="h-full w-full"
                />
              </div>
              <div className="text-right">
                <p className="font-extrabold text-2xl">
                  {profile?.data?.businessName}
                </p>
                <p>{profile?.data?.businessAddress}</p>
                <p>
                  {profile?.data?.businessCity}, {profile?.data?.businessZip}
                </p>
                <p>
                  {profile?.data?.businessState},{" "}
                  {profile?.data?.businessCountry}
                </p>

                <p>{profile?.data?.businessPhone}</p>
                <p>{profile?.data?.businessEmail}</p>
                <p>{profile?.data?.businessWebsite}</p>
              </div>
            </div>
            <hr className="my-10 h-1 bg-blue-700" />
            <p className="text-center font-extrabold text-4xl">
              {form.getValues().name || "Invoice Name"}
            </p>
            <p className="text-blue-700 text-2xl font-bold mt-5">
              {form.getValues().client.lastname || "Lastname"}{" "}
              {form.getValues().client.firstname || "Firstname"}
            </p>
            <p className="mt-5 font-bold text-xl">Address</p>
            <p className="w-[250px] text-wrap">
              {form.getValues().client.address || "Client Address"}
            </p>

            <div className="flex justify-between">
              <div>
                <p className="mt-5 font-bold text-xl">Email</p>

                <p className="">
                  {form.getValues().client.email || "johndoe@gmail.com"}
                </p>
              </div>

              <div>
                <p className="mt-5 font-bold text-xl text-right">Invoice ID</p>

                <p className="text-right">#{invoiceNumber || "GENERATED"}</p>
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <div>
                <p className="mt-5 font-bold text-xl">Phone Number</p>

                <p className="">
                  {form.getValues().client.phoneNumber || "########"}
                </p>
              </div>
              <div>
                <p className="mt-5 font-bold text-xl text-right">Date</p>

                <p className="text-right">{getCurrentDate()}</p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="bg-blue-700 flex justify-between items-center px-7 py-2">
              <div>
                <p className="text-white">Description</p>
              </div>
              <div className="flex ">
                <p className="w-[70px] text-white ">Price</p>

                <p className="w-[70px] text-white ">Quantity</p>
              </div>
            </div>
            {form.getValues().productsData &&
              form.getValues()?.productsData?.map((item) => (
                <>
                  <div className=" flex justify-between items-center px-7 py-2">
                    <div className="w-[calc(100%-140px)]">
                      <p className=" text-balance break-all">
                        {item?.productId?.name}
                      </p>
                    </div>
                    <div className="flex w-[140px]">
                      <p className=" w-[70px] text-balance break-all">
                        {profile?.data?.businessCurrency || "$"}
                        {item?.productId?.price}
                      </p>

                      <p className="w-[70px] text-balance break-all">
                        {item?.quantity}
                      </p>
                    </div>
                  </div>
                  <hr className="h-[2px] bg-blue-700" />
                </>
              ))}
            <div className="flex justify-end mt-10">
              <div className="w-1/2">
                <hr className="h-[2px] bg-blue-700 " />
                <div className="flex justify-between items-center mt-3 w-full gap-10 pr-3">
                  <p className="font-bold ">Total</p>
                  <p className="font-extrabold text-2xl w-[250px] text-balance break-all text-right">
                    {profile?.data?.businessCurrency || "$"}
                    {form.getValues()?.productsData &&
                      form.getValues().productsData!.length > 0 &&
                      form.getValues()?.productsData?.reduce((acc, curr) => {
                        return (
                          acc + curr?.productId?.price * Number(curr?.quantity)
                        );
                      }, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="my-40 px-10 ">
              <hr className="h-2 w-32  bg-blue-700 " />
              <p className="font-extrabold">THANK YOU</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
