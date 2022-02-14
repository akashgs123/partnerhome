import { useLocation } from "react-router-dom";

export const useParentRouteMatch = (parentRouteKey) => {
    const location = useLocation();
    const routeKey = new URLSearchParams(location.search).get('routeKey');

    return routeKey === parentRouteKey || location.hash.includes(parentRouteKey);
}
