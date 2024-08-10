import InvoiceForm from "../components/InvoiceForm";

const EditInvoice = () => {
  return (
    <div className="px-3 pb-10 pt-10 md:p-20">
      <p className="font-bold italic mb-2">
        Fill in all information to edit this invoice
      </p>
      <InvoiceForm />
    </div>
  );
};

export default EditInvoice;
