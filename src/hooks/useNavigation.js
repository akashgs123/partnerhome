import { useQuery } from "react-query"
import Util from "../util/util"

export const useNavigation = () => {
    const { isLoading, isError, data, error, isSuccess } = useQuery('navBar', Util.fetchNavBar, {
        refetchOnWindowFocus: false
    })
    return {
        navbarLoading: isLoading,
        isError,
        navBarData: data,
        error,
        isSuccess
    }
}

