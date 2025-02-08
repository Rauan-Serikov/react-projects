import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/User";

const useUser = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: fetchUser,
    })
}

export default useUser;