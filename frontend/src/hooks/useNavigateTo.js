import { useNavigate } from "react-router-dom";

const useNavigateTo = () => {
    const navigate = useNavigate();

    const navigateTo = (path = "/") => {
        navigate(path, { replace: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return navigateTo;
};

export default useNavigateTo;