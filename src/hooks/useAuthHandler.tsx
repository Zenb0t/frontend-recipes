import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./reduxHooks";
import { setUserToken, sendUser } from "../features/user/user-slice"; 
import sanitizedConfig from "../config"; 

const useAuthHandler = () => {
  const {
    getAccessTokenWithPopup,
    getIdTokenClaims,
    handleRedirectCallback,
    error,
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
    loginWithPopup,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      getAccessTokenSilently({
        authorizationParams: {
          audience: sanitizedConfig.AUTH0_AUDIENCE,
          scope: "openid profile email",
        },
      }).then((token) => {
        dispatch(setUserToken(token));
        dispatch(sendUser({ user }));
      });
    }
  }, [dispatch, getAccessTokenSilently, isAuthenticated, isLoading, user]);

  return {
    getAccessTokenWithPopup,
    getIdTokenClaims,
    handleRedirectCallback,
    error,
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
    loginWithPopup,
    loginWithRedirect,
    logout,
  };
};

export default useAuthHandler;
