import React from 'react';
import { updateStockOnPayment } from '../service/dashboardService';
import { ToastContainer, toast } from 'react-toastify';

const ActionButtons = () => {
  const handlePayment = async () => {
    try {
      await updateStockOnPayment();
      toast.success('Ödeme başarılı ve stok güncellendi. Sepet boşaltıldı.');
    } catch (error) {
      console.error('Stok güncellenirken hata:', error);
      toast.error('Ödeme işlemi sırasında bir hata oluştu');
    }
  };

  return (
    <div className="flex flex-col space-y-4 transition-all duration-300 ease-in-out">
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={handlePayment}
      >
        Ödeme Al
      </button>
      <ToastContainer
        position="top-center"  // Ekranın üst ortasına yerleştirildi
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999, marginTop: '60px' }}  // z-index artırıldı, margin üst eklendi
      />
    </div>
  );
};

export default ActionButtons;
