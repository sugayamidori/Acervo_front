interface fetchAPIProps {
  url: string;
  options: any;
}

const baseURL = "http://localhost:8080";

export const fetchAPI = async ({ url, options }: fetchAPIProps) => {
  const response = await fetch(`${baseURL}/${url}`, options);

  return response;
};
