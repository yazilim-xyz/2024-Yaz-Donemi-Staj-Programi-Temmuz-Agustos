import React from 'react';

const Login = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)' }}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-primary bg-opacity-60 p-12 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Giriş Yap</h2>
          <form>
            <div className="mb-6">
              <label htmlFor="username" className="block text-white text-lg font-semibold mb-2">Kullanıcı Adı</label>
              <input
                id="username"
                type="text"
                placeholder="Kullanıcı Adınızı Girin"
                className="w-full px-4 py-3 border border-white rounded-lg focus:outline-none focus:border-secondary"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-white text-lg font-semibold mb-2">Şifre</label>
              <input
                id="password"
                type="password"
                placeholder="Şifrenizi Girin"
                className="w-full px-4 py-3 border border-white rounded-lg focus:outline-none focus:border-secondary"
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
