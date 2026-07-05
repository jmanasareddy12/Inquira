import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterForm) => {
  console.log("Submitted!", data);

  try {
    await registerUser(data);
    alert("Registration Successful!");
    navigate("/login");
  } catch (error: any) {
    console.log(error);
    alert("Registration Failed");
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">

        <h1 className="mb-6 text-center text-3xl font-bold">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          <input
            {...register("username")}
            placeholder="Username"
            className="w-full rounded border p-3"
          />
          <p className="text-sm text-red-500">
            {errors.username?.message}
          </p>

          <input
            {...register("email")}
            placeholder="Email"
            className="w-full rounded border p-3"
          />
          <p className="text-sm text-red-500">
            {errors.email?.message}
          </p>

          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full rounded border p-3"
          />
          <p className="text-sm text-red-500">
            {errors.password?.message}
          </p>

          <button
            disabled={isSubmitting}
            className="w-full rounded bg-indigo-600 p-3 text-white"
          >
            Register
          </button>

        </form>

        <p className="mt-6 text-center">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-indigo-600"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}