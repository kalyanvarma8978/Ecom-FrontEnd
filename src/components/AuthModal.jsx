import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const AuthModal = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setPhone("");
    setAddress("");
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    //  Validation 
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    if (isRegister && (!username || !phone || !address)) {
      setError("All fields are required for registration");
      return;
    }

    if (isRegister && phone.length < 10) {
      setError("Enter valid phone number");
      return;
    }

    try {
      setLoading(true);

      if (isRegister) {
        await api.post("/auth/register/", {
          email,
          username,
          password,
          phone_number: phone,
          address,
        });

        setSuccess("Registered successfully ✅ Please login");
        setIsRegister(false);
        resetFields();
      } else {
        await login(email, password);
        resetFields();
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-lg"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
          {isRegister ? "Register" : "Login"}
        </h2>

        {/* Success */}
        {success && (
          <p className="text-green-500 text-sm mb-3 text-center">
            {success}
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <div className="max-h-[70vh] overflow-y-auto pr-1">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Register Fields */}
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Username"
                className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                type="text"
                placeholder="Address"
                className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4 hover:bg-blue-600 transition disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : isRegister
            ? "Register"
            : "Login"}
        </button>

        {/* Toggle */}
        <p className="text-center mt-3 text-sm">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}
          <span
            className="text-blue-500 cursor-pointer ml-1 font-medium"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
              setSuccess("");
            }}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>

        {/* Cancel */}
        <button
          onClick={onClose}
          className="w-full mt-2 text-gray-500 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthModal;