import React from "react";
import dayjs from "dayjs";
import axios from "../services/api";

const calculateAge = (birthDate) => {
  return dayjs().diff(dayjs(birthDate), "year");
};

export default function MemberList({ members, onEdit, onDeleteSuccess }) {
  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสมาชิกนี้?")) {
      try {
        await axios.delete(`/members/${id}`);
        onDeleteSuccess();
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-200">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center drop-shadow-sm">
        รายการสมาชิกทั้งหมด
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-indigo-300">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 text-white text-left">
              <th className="px-5 py-3 border border-indigo-400">#</th>
              <th className="px-5 py-3 border border-indigo-400">รูปโปรไฟล์</th>
              <th className="px-5 py-3 border border-indigo-400">ชื่อ - นามสกุล</th>
              <th className="px-5 py-3 border border-indigo-400">อายุ</th>
              <th className="px-5 py-3 border border-indigo-400">อัปเดตล่าสุด</th>
              <th className="px-5 py-3 border border-indigo-400">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, index) => (
              <tr
                key={m.id}
                className="hover:bg-indigo-50 transition-colors duration-200 cursor-pointer"
              >
                <td className="px-5 py-3 border border-indigo-300">{index + 1}</td>
                <td className="px-5 py-3 border border-indigo-300">
                  {m.profile_image ? (
                    <img
                      src={`http://127.0.0.1:8000/uploads/${m.profile_image}`}
                      alt="profile"
                      className="w-14 h-14 rounded-full object-cover shadow-md"
                    />
                  ) : (
                    <span className="text-indigo-300 italic">ไม่มีรูป</span>
                  )}
                </td>
                <td className="px-5 py-3 border border-indigo-300 font-medium text-indigo-700">
                  {m.prefix} {m.first_name} {m.last_name}
                </td>
                <td className="px-5 py-3 border border-indigo-300 text-center">
                  {calculateAge(m.birthdate)}
                </td>
                <td className="px-5 py-3 border border-indigo-300 text-indigo-600 text-sm whitespace-nowrap">
                  {dayjs(m.updated_at).format("DD/MM/YYYY HH:mm")}
                </td>
                <td className="px-5 py-3 border border-indigo-300 flex gap-3 justify-center">
                  <button
                    onClick={() => onEdit(m)}
                    className="bg-indigo-100 text-indigo-700 hover:bg-indigo-300 transition px-4 py-1 rounded-md font-semibold shadow-sm"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="bg-red-100 text-red-700 hover:bg-red-300 transition px-4 py-1 rounded-md font-semibold shadow-sm"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}