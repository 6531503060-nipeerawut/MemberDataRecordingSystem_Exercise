import React, { useState, useEffect } from "react";
import axios from "../services/api";

export default function EditMemberModal({ member, onClose, onSave }) {
  const [form, setForm] = useState({
    prefix: "",
    first_name: "",
    last_name: "",
    birthdate: "",
  });

  useEffect(() => {
    if (member) {
      setForm({
        prefix: member.prefix || "",
        first_name: member.first_name || "",
        last_name: member.last_name || "",
        birthdate: member.birthdate || "",
      });
    }
  }, [member]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/members/${member.id}`, form);
      onSave();
      onClose();
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  if (!member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-xl shadow-2xl border border-indigo-100">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 mb-6 text-center drop-shadow">
          แก้ไขข้อมูลสมาชิก
        </h2>

        <div className="space-y-4">
          <input
            name="prefix"
            value={form.prefix}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            placeholder="คำนำหน้า"
          />
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            placeholder="ชื่อ"
          />
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            placeholder="นามสกุล"
          />
          <input
            type="date"
            name="birthdate"
            value={form.birthdate}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition shadow"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}