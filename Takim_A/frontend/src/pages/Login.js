import React from "react";
import { useState  } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook'unu kullanın

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kullanıcı adı ve şifre ile yapılacak işlemler burada
    console.log('Kullanıcı Adı:', username);
    console.log('Şifre:', password);
    // Giriş yapma işlemleri, API çağrıları vs.

    // Başarılı giriş işleminden sonra Home bileşenine yönlendirin
    navigate('/Home');
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)' }}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-primary bg-opacity-60 p-12 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Giriş Yap</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-white text-lg font-semibold mb-2">Kullanıcı Adı</label>
              <input
                id="username"
                type="text"
                placeholder="Kullanıcı Adınızı Girin"
                className="w-full px-4 py-3 border border-white rounded-lg focus:outline-none focus:border-secondary"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-white text-lg font-semibold mb-2">Şifre</label>
              <input
                id="password"
                type="password"
                placeholder="Şifrenizi Girin"
                className="w-full px-4 py-3 border border-white rounded-lg focus:outline-none focus:border-secondary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-quaternary text-white py-3 px-6 rounded-lg hover:bg-tertiary focus:outline-none focus:bg-quinary"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
