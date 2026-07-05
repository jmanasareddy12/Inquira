import api from "./axios";

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const form = new URLSearchParams();

  form.append("username", email);
  form.append("password", password);

  const response = await api.post(
    "/auth/login",
    form,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};