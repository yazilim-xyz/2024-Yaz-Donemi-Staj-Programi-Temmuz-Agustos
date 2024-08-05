import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../image/logo.jpg";
import { FaArrowDown, FaLinkedin, FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillAliwangwang } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const secondPageRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogin = async () => {
    try {
      // Firebase ile kimlik doğrulama işlemi
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Giriş başarılı:", userCredential.user);

      // Başarıyla giriş yapıldığında yönlendirme
      navigate("/home");
    } catch (error) {
      console.error("Giriş hatası:", error);
      alert(
        "Giriş başarısız. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin."
      );
    }
  };

  const scrollToSecondPage = () => {
    if (secondPageRef.current) {
      secondPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-screen overflow-auto snap-y snap-mandatory">
      {/* Arka Plan ve Sayfa İçeriği */}
      <div
        className="section snap-start relative h-screen bg-cover bg-center flex flex-col justify-between"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        {/* WorkChat Başlığı ve Alt Çizgi */}
        <div className="absolute top-0 left-0 right-0 flex flex-col items-center pt-8">
          <div className="text-primary text-xl md:text-5xl font-bold text-center">
            <h1>WorkChat</h1>
            <hr className="border-primary border-t-4 my-3 w-1/2 mx-auto" />
          </div>
        </div>

        {/* Diğer İçerik */}
        <div className="flex flex-grow items-center justify-center pt-20">
          <div className="flex flex-col md:flex-row items-center justify-center w-full text-center">
            <div className="flex items-center justify-center md:w-1/2">
              <img
                src={logo}
                alt="WorkChat Logo"
                className={`h-64 w-64 md:h-96 md:w-96 rounded-full border-4 border-black shadow-lg transition-transform duration-300 ${
                  isSmallScreen ? "transform scale-90" : "transform scale-100"
                }`}
                style={{ opacity: 0.9 }}
              />
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <div className="text-white text-xl md:text-2xl mt-4">
                <p>İş yerinizde kolay ve hızlı iletişim kurun.</p>
                <p>Yeni nesil iletişim araçlarıyla tanışın.</p>
                <p>Verimliliğinizi artırın ve iş akışınızı kolaylaştırın.</p>
              </div>
              <div className="text-white text-2xl md:text-4xl font-bold mt-8 flex flex-col items-center">
                <p>Keşfet</p>
                <FaArrowDown
                  onClick={scrollToSecondPage}
                  className="text-white text-3xl cursor-pointer mt-4 transition-transform transform hover:scale-125 hover:bg-primary hover:p-2 rounded-full hover:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Saydam Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary bg-opacity-50 py-8 flex justify-between items-center px-8">
          <a
            href="/about"
            className="text-white text-sm md:text-lg hover:underline"
          >
            Hakkımızda
          </a>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl font-bold transition-transform duration-300 transform hover:scale-125"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl font-bold transition-transform duration-300 transform hover:scale-125"
            >
              <RiInstagramFill />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl font-bold transition-transform duration-300 transform hover:scale-125"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Giriş Formu Bölümü */}
      <div
        ref={secondPageRef}
        className="section snap-start flex items-center justify-center h-screen bg-secondary"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative w-full max-w-4xl md:w-3/5 lg:w-3/5 h-[50vh] p-8 bg-primary bg-opacity-80 text-white shadow-lg rounded-lg flex flex-col">
          <div className="flex flex-col items-center flex-grow justify-center pt-16">
            <div className="w-full max-w-md text-center">
              <div className="text-5xl mb-2 flex justify-center relative">
                {/* Giriş Yap İkonu */}
                <AiFillAliwangwang className="text-white transition-transform duration-300 transform hover:scale-125 hover:translate-x-4 hover:translate-y-4" style={{ position: "absolute", top: "-5rem" }} />
              </div>
              <h2 className="text-lg md:text-2xl font-bold mb-4 text-center">
                Giriş Yap
              </h2>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Kullanıcı Adı
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Kullanıcı adınızı giriniz"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Şifre
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Şifrenizi girin"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={handleLogin}
                  className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-white hover:text-primary hover:bg-opacity-70 transition-transform duration-300 transform hover:scale-105"
                >
                  Giriş Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
