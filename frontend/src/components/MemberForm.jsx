import React, { useState } from "react";
import axios from "../services/api";

export default function MemberForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    prefix: "นาย",
    first_name: "",
    last_name: "",
    birthdate: "",
    profile_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    await axios.post("/members", data);
    onSubmitSuccess();
    setFormData({
      prefix: "นาย",
      first_name: "",
      last_name: "",
      birthdate: "",
      profile_image: null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 p-8 rounded-2xl shadow-xl border border-indigo-200"
    >
      <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center drop-shadow-md">
        เพิ่มข้อมูลสมาชิก
      </h2>

      <label className="block mb-2 text-indigo-600 font-medium">คำนำหน้า</label>
      <select
        name="prefix"
        value={formData.prefix}
        onChange={handleChange}
        className="w-full border border-indigo-300 rounded-lg px-4 py-2 mb-6
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      >
        <option>นาย</option>
        <option>นาง</option>
        <option>นางสาว</option>
      </select>

      <input
        name="first_name"
        placeholder="ชื่อ"
        value={formData.first_name}
        onChange={handleChange}
        className="w-full border border-indigo-300 rounded-lg px-4 py-2 mb-6
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        required
      />

      <input
        name="last_name"
        placeholder="นามสกุล"
        value={formData.last_name}
        onChange={handleChange}
        className="w-full border border-indigo-300 rounded-lg px-4 py-2 mb-6
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        required
      />

      <label className="block mb-2 text-indigo-600 font-medium">วันเกิด</label>
      <input
        type="date"
        name="birthdate"
        value={formData.birthdate}
        onChange={handleChange}
        className="w-full border border-indigo-300 rounded-lg px-4 py-2 mb-6
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        required
      />

      <label className="block mb-2 text-indigo-600 font-medium">
        รูปโปรไฟล์ (optional)
      </label>
      <input
        type="file"
        name="profile_image"
        onChange={handleChange}
        className="mb-6"
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition
                   text-white font-semibold py-3 rounded-xl shadow-lg"
      >
        บันทึก
      </button>
    </form>
  );
}