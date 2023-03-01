import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const  ErrorPage = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <p>{error.status} {error.statusText}</p>
  }

  return <p>Unknown Error</p>
}

export default  ErrorPage;