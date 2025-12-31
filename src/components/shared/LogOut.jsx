import React from 'react';
import { LogOut } from "lucide-react";

const LogoutModal = ({ onClose, onConfirm }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-fadeIn"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 sm:p-8 w-full max-w-sm shadow-2xl border border-gray-700 animate-scaleIn">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <LogOut size={32} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-white text-center">
              Chiqishni xohlaysizmi?
            </h3>
            <p className="text-gray-400 text-sm text-center">
              Hisobingizdan chiqmoqchimisiz?
            </p>
            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              >
                Yo'q
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Ha
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
