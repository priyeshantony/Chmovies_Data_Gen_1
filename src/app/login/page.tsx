"use client";


import { useState, useEffect, useRef } from "react";
import { FaLock, FaEnvelope, FaCaretDown, FaUnlock, FaEyeSlash, FaEye } from "react-icons/fa";
import { countryCodes } from "../components/Utilities/CountryCode";
import { useRouter } from "next/navigation";
import Footer from '../components/Layout/Footer';

interface Country {
  code: string;
  flag: string;
  country: string;
}

const Login: React.FC<{ setIsLoggedIn: (isLoggedIn: boolean) => void }> = ({ setIsLoggedIn }) => {
  const [identifier, setIdentifier] = useState<string>("");
  const [isPhone, setIsPhone] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState<boolean>(true);
  const [showCountryList, setShowCountryList] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countryCodes[2]);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [attempts, setAttempts] = useState(0);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Handle click outside country dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountryList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Countdown timer for OTP
  useEffect(() => {
    if (!otpSent || timer <= 0) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [otpSent, timer]);

  useEffect(() => {
    if (otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
  }, [timer]);

  // Handle email/phone input change
  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d+$/.test(value)) {
      setIsPhone(true);
      setIdentifier(value);
    } else {
      setIsPhone(false);
      setIdentifier(value);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdentifier(value);
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input
    if (value && index < otp.length - 1) {
      otpInputs.current[index + 1]?.focus();
    }
  };

 
  // Handle Paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  
    // Extract and clean the pasted data
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, otp.length);
  
    // If no valid data is pasted, return early
    if (pastedData.length === 0) return;
  
    // Update the OTP state
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
  
      // Distribute the pasted data across the OTP fields
      pastedData.split("").forEach((char, i) => {
        if (i < otp.length) newOtp[i] = char;
      });
  
      // Move focus to the last updated input field
      setTimeout(() => {
        const lastIndex = pastedData.length - 1;
        otpInputs.current[lastIndex < otp.length ? lastIndex : otp.length - 1]?.focus();
      }, 10);
  
      return newOtp;
    });
  };

  // Handle Backspace Key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  

  // Send OTP
  const sendOtp = () => {
    if (attempts < 5 && identifier) {
      setOtpSent(true);
      setTimer(2);
      setShowPasswordLogin(false);
      setAttempts((prev) => prev + 1);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return minutes > 0 ? `${minutes}:${secs < 10 ? "0" : ""}${secs}` : `${secs}s`;
  };

  // Switch to password login
  const switchToPasswordLogin = () => {
    setOtpSent(false);
    setIdentifier("");
    setOtp(["", "", "", "", "", ""]);
    setTimer(0);
    setShowPasswordLogin(true);
  };

  // Switch to OTP login
  const switchToOtpLogin = () => {
    setShowPasswordLogin(false);
    setOtpSent(false);
  };

  // Select country code
  const selectCountryCode = (country: Country) => {
    setSelectedCountry(country);
    setShowCountryList(false);
  };

  // Switch to "Forgot Password" view
  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  // Back to login
  const handleBackToLogin = () => {
    setForgotPassword(false);
    setShowPasswordLogin(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); console.log(username)
    // Simulate login logic
    if (identifier === 'admin' && password === "password") {
      // Set session in localStorage

      localStorage.setItem('userSession', JSON.stringify({ username, isLoggedIn: true }));
      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
        router.push("/dashboard");
    }
  }, [router]);


  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-white flex items-center justify-center gap-2">
            {forgotPassword ? <FaUnlock className="text-white text-xl" /> : <FaLock className="text-white text-xl" />}
            {forgotPassword ? "Reset Password" : "Login"}
          </h2>

          <form className="mt-6">
            {forgotPassword ? (
              // Forgot Password Section
              <>
                <div className="mb-4">
                  <label className="block text-gray-400">Email</label>
                  <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 mt-1 bg-gray-700">
                    <FaEnvelope className="text-gray-400" />
                    <input
                      type="email"
                      className="w-full outline-none px-2 bg-gray-700 text-white"
                      placeholder="Enter your email"
                      value={identifier}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                >
                  Reset Password
                </button>

                <div className="relative flex items-center my-4">
                  <div className="flex-grow border-t border-gray-600"></div>
                  <span className="mx-4 text-gray-400">Or</span>
                  <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="mt-3 w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
                >
                  Back to Login
                </button>
              </>
            ) : (
              <>
                {/* OTP Message */}
                {otpSent && (
                  <p className="text-sm text-gray-400 mb-2">
                    We sent a sign-in code to{" "}
                    <span className="font-semibold text-white">
                      {isPhone ? `${selectedCountry.code}${identifier}` : identifier}
                    </span>
                    . The code will expire in 15 minutes.
                  </p>
                )}

                {/* Email or Phone Input (Hidden after sending OTP) */}
                {!otpSent && (
                  <div className="mb-4 relative">
                    <label className="block text-gray-400">Email or Phone</label>
                    <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 mt-1 bg-gray-700">
                      {isPhone ? (
                        <div ref={dropdownRef} className="relative">
                          <button
                            type="button"
                            className="flex items-center text-white font-semibold mr-2 bg-gray-600 px-2 py-1 rounded-md hover:bg-gray-500"
                            onClick={() => setShowCountryList(!showCountryList)}
                          >
                            <span className="mr-1">{selectedCountry.flag}</span>
                            {selectedCountry.code} <FaCaretDown className="ml-1" />
                          </button>

                          {showCountryList && (
                            <ul className="absolute bg-gray-700 border border-gray-600 w-40 mt-1 rounded-lg text-white max-h-40 overflow-auto shadow-lg z-10">
                              {countryCodes.map((country) => (
                                <li
                                  key={country.code}
                                  onClick={() => selectCountryCode(country)}
                                  className="flex items-center px-3 py-2 hover:bg-gray-600 cursor-pointer"
                                >
                                  <span className="mr-2">{country.flag}</span>
                                  {country.code} ({country.country})
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <FaEnvelope className="text-gray-400" />
                      )}

                      <input
                        type="text"
                        className="w-full outline-none px-2 bg-gray-700 text-white"
                        placeholder={isPhone ? "Enter phone number" : "Enter email"}
                        value={identifier}
                        onChange={handleIdentifierChange}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Password Input (Hidden in OTP Mode) */}
                {showPasswordLogin && !otpSent && (
                  <div className="mb-4">
                    <label className="block text-gray-400">Password</label>
                    <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 mt-1 bg-gray-700">
                      <FaLock className="text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full outline-none px-2 bg-gray-700 text-white"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 focus:outline-none"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                )}

                {/* OTP Input (Shown After Sending OTP) */}
                {otpSent && (
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Enter OTP</label>
                    <div className="flex justify-evenly gap-4">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {otpInputs.current[index] = el;}}
                          type="text"
                          maxLength={1}
                          className="w-12 h-12 text-center text-xl font-bold bg-gray-700 text-white border border-gray-600 rounded-md outline-none"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onPaste={handlePaste}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Login & Send OTP Buttons */}
                {showPasswordLogin ? (
                  <>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                    {attempts < 5 && (
                    <>
                    <div className="relative flex items-center my-4">
                      <div className="flex-grow border-t border-gray-600"></div>
                      <span className="mx-4 text-gray-400">Or</span>
                      <div className="flex-grow border-t border-gray-600"></div>
                    </div>

                    <button
                      type="button"
                      onClick={switchToOtpLogin}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
                    >
                      Login with OTP
                    </button>
                    </>
                  )}
                  </>
                ) : (
                  <>
                    {!otpSent && (
                      <button
                        type="button"
                        onClick={sendOtp}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                      >
                        Send Login Code
                      </button>
                    )}

                    {otpSent && (
                      <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                      >
                        Verify Login Code
                      </button>
                    )}

                    {otpSent && (
                      <button
                        type="button"
                        onClick={sendOtp}
                        disabled={attempts >= 5 || timer > 0} 
                        className={`mt-3 px-4 py-2 rounded-lg w-full ${
                          attempts >= 5 || timer > 0 
                            ? "bg-gray-600 cursor-not-allowed" 
                            : "bg-blue-500 hover:bg-blue-600"
                        } text-white transition`}
                      >
                        {attempts < 5 && timer > 0
                          ? `Resend OTP in ${formatTime(timer)}`
                          : attempts < 5
                          ? "Resend OTP"
                          : "Try again later"
                        }

                      </button>
                    )}

                    <div className="relative flex items-center my-4">
                      <div className="flex-grow border-t border-gray-600"></div>
                      <span className="mx-4 text-gray-400">Or</span>
                      <div className="flex-grow border-t border-gray-600"></div>
                    </div>

                    <button
                      type="button"
                      onClick={switchToPasswordLogin}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
                    >
                      Login with Password
                    </button>
                  </>
                )}
                {showPasswordLogin && (
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-blue-400 hover:underline text-sm"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <div className="flex items-center mt-6 space-x-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="w-4 h-4 p-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring focus:ring-blue-300 outline-none focus:outline-none focus:ring-0"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-400 cursor-pointer select-none">
                    Remember Me
                  </label>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;