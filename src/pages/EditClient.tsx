import ClientForm from "../components/ClientForm";

const EditProduct = () => {
  return (
    <div className="px-3 pb-10 pt-10 md:p-20">
      <p className="font-bold italic mb-2">
        Fill in all information to edit this client
      </p>
      <ClientForm />
    </div>
  );
};

export default EditProduct;
