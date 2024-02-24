import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "react-router-dom";
import appApi from "../../api/appApi";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthProvider";
const GOOGLE_AUTH_URL =
  "https://c16-24-n-node-react.vercel.app/api/auth/google";

const GoogleButton = ({ title, onSuccessfulAuth, setIsLoading, setErrors }) => {
  const { setLogIn } = useAuthContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    handleGoogleSignIn();
  }, []);

  useEffect(() => {
    handleGoogleSignIn();
  }, []);
  

  async function handleGoogleSignIn() {
    try {
      const accessToken = searchParams.get("token");
      if (accessToken) {
        setIsLoading(true);
        console.log('ássaddasdsad')
        sessionStorage.setItem("token", accessToken);
        const res = await appApi.get("/auth/google/revalidate");
        onSuccessfulAuth(res);
      }
      return;
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      setErrors({ general: error?.response?.data?.message });
      setLogIn(false);
    }
  }

  return (
    <a className="w-full block" href={GOOGLE_AUTH_URL}>
      <button className="btn_shadow w-full flex items-center justify-center border-[1px] border-slate-800 p-2 mt-2 rounded-md">
        <FcGoogle size={22} className="inline-block" />
        {`${title} with Google`}
      </button>
    </a>
  );
};

export default GoogleButton;
