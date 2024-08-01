import React from "react";

function Content() {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Ürünler</h1>
      <div className="bg-white p-4 shadow-md rounded">
        {/* Ürün Listesi */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">Ürün Adı</th>
                <th className="py-2 px-4 border-b">Fiyat</th>
                <th className="py-2 px-4 border-b">Kategori</th>
                <th className="py-2 px-4 border-b">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {/* Örnek ürünler */}
              <tr>
                <td className="py-2 px-4 border-b">Ürün 1</td>
                <td className="py-2 px-4 border-b">100 TL</td>
                <td className="py-2 px-4 border-b">Kategori 1</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">Düzenle</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Sil</button>
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