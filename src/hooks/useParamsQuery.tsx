import { useLocation } from "react-router";

export const useParamsQuery = () => new URLSearchParams(useLocation().search);
