import { useForm } from "react-hook-form";
import { loginUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await loginUser(data.email, data.password);

      login(response.access_token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Sign In
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full rounded border p-3"
          />

          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full rounded border p-3"
          />

          <button
            type="submit"
            className="w-full rounded bg-indigo-600 p-3 text-white"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center">
          Don't have an account?
          <Link to="/register" className="ml-2 text-indigo-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}