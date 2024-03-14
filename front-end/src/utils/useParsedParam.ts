import { useParams } from "react-router-dom";

function useParsedParam(paramName: string) {
  const params = useParams();

  const paramValue = params[paramName];
  const parsedValue = paramValue ? parseInt(paramValue, 10) : NaN;

  return isNaN(parsedValue) ? -1 : parsedValue;
}

export default useParsedParam;
