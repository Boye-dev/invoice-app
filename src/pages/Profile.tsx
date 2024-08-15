import { useQuery } from "@tanstack/react-query";
import ProfileForm from "../components/ProfileForm";
import { getUserById } from "../services/user.service";
import { getDecodedJwt } from "../api/Auth";
import { useTitle } from "../hooks/useTitle";

const Profile = () => {
  useTitle("Profile | Invoice App");

  const id = getDecodedJwt()?.id || "";
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getUserById(id),
  });
  return (
    <div className="px-3 pb-10 pt-10 md:p-20 md:w-[600px]">
      <ProfileForm data={data?.data} loading={isLoading} refetch={refetch} />
    </div>
  );
};

export default Profile;
