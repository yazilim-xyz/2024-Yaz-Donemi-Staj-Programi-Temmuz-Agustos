import React from "react";

function Content() {
  return (
    <div className="flex-1 p-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Ürünler</h1>
      <div className="bg-white p-4 shadow-lg rounded-lg">
        {/* Ürün Listesi */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-3 px-6 border-b">Ürün Adı</th>
                <th className="py-3 px-6 border-b">Fiyat</th>
                <th className="py-3 px-6 border-b">Kategori</th>
                <th className="py-3 px-6 border-b">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {/* Örnek ürünler */}
              <tr className="border-b hover:bg-purple-100 transition duration-300">
                <td className="py-4 px-6">Ürün 1</td>
                <td className="py-4 px-6">100 TL</td>
                <td className="py-4 px-6">Kategori 1</td>
                <td className="py-4 px-6 flex justify-center space-x-4">
                  <button className="text-blue-500 hover:text-blue-700 transition duration-300 px-2 py-1 rounded">
                    Düzenle
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition duration-300 px-2 py-1 rounded">
                    Sil
                  </button>
                </td>
              </tr>
              {/* Diğer ürünler burada listelenecek */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Content;
