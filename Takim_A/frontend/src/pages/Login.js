import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Doğru yol

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Firebase ile kimlik doğrulama işlemi
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Giriş başarılı:", userCredential.user);

      // Başarıyla giriş yapıldığında yönlendirme
      navigate('/home');
    } catch (error) {
      console.error("Giriş hatası:", error);
      alert("Giriş başarısız. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.");
    }
  };

  return (
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)' }}>
        <div className="flex items-center justify-center h-full">
          <div className="w-4/5 h-4/5 bg-secondary bg-opacity-50 text-white shadow-lg rounded-lg flex">
            <div className="w-1/2 p-8 flex flex-col items-center bg-opacity-80 justify-between bg-primary text-white relative">
              <div className="flex flex-col items-center justify-center flex-grow">
                <h1 className="text-5xl font-bold mb-4">WorkChat</h1>
                <p className="text-lg mb-8 text-center">İş yerinizde kolay ve hızlı iletişim kurun.</p>
              </div>
              <div className="flex justify-between w-full absolute bottom-8 px-8">
                <a href="/about" className="text-white text-lg hover:underline">Hakkımızda</a>
                <a href="/contact" className="text-white text-lg hover:underline">İletişim</a>
              </div>
            </div>

            <div className="w-1/2 p-8 flex items-center justify-center">
              <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                    E-posta
                  </label>
                  <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="E-posta adresinizi girin"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
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
