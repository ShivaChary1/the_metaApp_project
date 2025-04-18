// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null
//   const [isAnimated, setIsAnimated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Trigger animations after component mount
//     const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
//     if (isAuthenticated) {
//       navigate("/home"); // redirect to home if already logged in
//     }
//     setTimeout(() => {
//       setIsAnimated(true);
//     }, 100);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setFormStatus(null);

//     try {
//       const response = await axios.post('http://localhost:5000/users/login', {
//         email,
//         password
//       });

//       if (response.status === 200) {
//         setFormStatus('success');
//         setTimeout(() => navigate('/home'), 1500);
//         localStorage.setItem("isAuthenticated", "true");
//       } else {
//         setFormStatus('error');
//       }
//     } catch (error) {
//       setFormStatus('error');
//       console.error("Login error:", error.response?.data || error.message);
//     }

//     setIsLoading(false);
//   };

//   const handleMouseMove = (e) => {
//     const parallaxItems = document.querySelectorAll('.parallax-element');
//     const x = e.clientX / window.innerWidth;
//     const y = e.clientY / window.innerHeight;

//     parallaxItems.forEach((item) => {
//       const el = item;
//       const speed = parseFloat(el.getAttribute('data-speed') || '0.05');
//       const xPos = (0.5 - x) * speed * 50;
//       const yPos = (0.5 - y) * speed * 50;
//       el.style.transform = `translate(${xPos}px, ${yPos}px)`;
//     });
//   };

//   return (
//     <div 
//       className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 overflow-hidden relative"
//       onMouseMove={handleMouseMove}
//     >
//       <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full opacity-20 blur-3xl parallax-element" data-speed="0.05"></div>
//       <div className="absolute bottom-20 right-40 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl parallax-element" data-speed="0.08"></div>
//       <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-pink-300 rounded-full opacity-10 blur-3xl parallax-element" data-speed="0.12"></div>

//       <div className="max-w-md w-full px-6 py-8 relative z-10">
//         <div className={`flex justify-center mb-8 transition-all duration-1000 ease-out ${isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
//           <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold animate-pulse">
//             <i className="fas fa-fingerprint"></i>
//           </div>
//         </div>

//         <div className="text-center mb-8">
//           <h1 className={`text-3xl font-bold text-gray-800 mb-2 transition-all duration-700 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
//             Welcome Back
//           </h1>
//           <p className={`text-gray-600 transition-all duration-700 delay-200 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//             Sign in to continue to your account
//           </p>
//         </div>

//         <div className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-700 delay-300 ease-out ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
//           {formStatus === 'success' && (
//             <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 animate-fadeIn">
//               Login successful! Redirecting...
//             </div>
//           )}
//           {formStatus === 'error' && (
//             <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 animate-fadeIn">
//               Please check your credentials and try again.
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className={`mb-6 transition-all duration-700 delay-400 ease-out ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
//               <div className="relative">
//                 <input
//                   type="email"
//                   id="email"
//                   className="peer w-full px-4 py-3 text-gray-700 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-all bg-transparent"
//                   placeholder=" "
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <label
//                   htmlFor="email"
//                   className="absolute left-4 top-3 text-gray-500 transition-all duration-300 
//                   transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 
//                   peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
//                 >
//                   Email Address
//                 </label>
//                 <div className="absolute right-4 top-3 text-gray-400">
//                   <i className="fas fa-envelope"></i>
//                 </div>
//               </div>
//             </div>

//             <div className={`mb-6 transition-all duration-700 delay-500 ease-out ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   className="peer w-full px-4 py-3 text-gray-700 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-all bg-transparent"
//                   placeholder=" "
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <label
//                   htmlFor="password"
//                   className="absolute left-4 top-3 text-gray-500 transition-all duration-300 
//                   transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 
//                   peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
//                 >
//                   Password
//                 </label>
//                 <button
//                   type="button"
//                   className="absolute right-4 top-3 text-gray-400 cursor-pointer"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
//                 </button>
//               </div>
//             </div>

//             <div className={`flex justify-end mb-6 transition-all duration-700 delay-600 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//               <a href="#" className="text-sm text-blue-600 hover:text-blue-800 group">
//                 Forgot Password?
//                 <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-600"></span>
//               </a>
//             </div>

//             <div className={`transition-all duration-700 delay-700 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex justify-center items-center rounded-lg whitespace-nowrap cursor-pointer"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                 ) : null}
//                 {isLoading ? 'Signing in...' : 'Sign In'}
//               </button>
//             </div>
//           </form>
//         </div>

//         <div className={`text-center mt-6 transition-all duration-700 delay-900 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//           <p className="text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/register" className="text-blue-600 font-medium group">
//               Sign up
//               <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-600"></span>
//             </Link>
//           </p>
//         </div>
//       </div>

//       <div className="absolute bottom-4 right-4 text-xs text-gray-500">
//         {new Date().toLocaleDateString('en-GB', {
//           year: 'numeric',
//           month: '2-digit',
//           day: '2-digit',
//           weekday: 'long'
//         })}
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/dashboard");
    }
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus(null);

    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        email,
        password
      });

      if (response.status === 200) {
        setFormStatus('success');
        setTimeout(() => navigate('/dashboard'), 1500);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("currUser", JSON.stringify(response.data));

      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
      console.error("Login error:", error.response?.data || error.message);
    }

    setIsLoading(false);
  };

  const handleMouseMove = (e) => {
    const parallaxItems = document.querySelectorAll('.parallax-element');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    parallaxItems.forEach((item) => {
      const el = item;
      const speed = parseFloat(el.getAttribute('data-speed') || '0.05');
      const xPos = (0.5 - x) * speed * 50;
      const yPos = (0.5 - y) * speed * 50;
      el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl parallax-element" data-speed="0.05"></div>
      <div className="absolute bottom-20 right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl parallax-element" data-speed="0.08"></div>
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-pink-500 rounded-full opacity-10 blur-3xl parallax-element" data-speed="0.12"></div>

      <div className="max-w-md w-full px-6 py-8 relative z-10">
        <div className={`flex justify-center mb-8 transition-all duration-1000 ease-out ${isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold animate-pulse">
            <i className="fas fa-fingerprint"></i>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold text-white mb-2 transition-all duration-700 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            Welcome Back
          </h1>
          <p className={`text-gray-300 transition-all duration-700 delay-200 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Sign in to continue to your account
          </p>
        </div>

        <div className={`bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg p-8 transition-all duration-700 delay-300 ease-out ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          {formStatus === 'success' && (
            <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 animate-fadeIn">
              Login successful! Redirecting...
            </div>
          )}
          {formStatus === 'error' && (
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 animate-fadeIn">
              Please check your credentials and try again.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={`mb-6 transition-all duration-700 delay-400 ease-out ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none transition-all bg-transparent"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-3 text-gray-400 transition-all duration-300 
                  transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 
                  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
                >
                  Email Address
                </label>
                <div className="absolute right-4 top-3 text-gray-400">
                  <i className="fas fa-envelope"></i>
                </div>
              </div>
            </div>

            <div className={`mb-6 transition-all duration-700 delay-500 ease-out ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none transition-all bg-transparent"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-3 text-gray-400 transition-all duration-300 
                  transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 
                  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="absolute right-4 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className={`flex justify-end mb-6 transition-all duration-700 delay-600 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-600 group">
                Forgot Password?
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-600"></span>
              </a>
            </div>

            <div className={`transition-all duration-700 delay-700 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex justify-center items-center whitespace-nowrap cursor-pointer transform hover:scale-105 shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : null}
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>

        <div className={`text-center mt-6 transition-all duration-700 delay-900 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-gray-300">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 font-medium group">
              Sign up
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-600"></span>
            </Link>
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-gray-400">
        {new Date().toLocaleDateString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          weekday: 'long'
        })}
      </div>
    </div>
  );
};

export default Login;