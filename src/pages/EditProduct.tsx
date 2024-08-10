import ProductForm from "../components/ProductForm";

const EditClient = () => {
  return (
    <div className="px-3 pb-10 pt-10 md:p-20">
      <p className="font-bold italic mb-2">
        Fill in all information to edit this product
      </p>
      <ProductForm />
    </div>
  );
};

export default EditClient;
