import React, { useEffect, useState } from "react";
import MemberForm from "../components/MemberForm";
import MemberList from "../components/MemberList";
import MemberReport from "../components/MemberReport";
import EditMemberModal from "../components/EditMemberModal";
import axios from "../services/api";

export default function Home() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("/members");
      setMembers(res.data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสมาชิก", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 mb-12 drop-shadow-md">
          ระบบจัดการข้อมูลสมาชิก
        </h1>

        {/* ส่วนเพิ่ม + รายงาน */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              เพิ่มข้อมูลสมาชิก
            </h2>
            <MemberForm onSubmitSuccess={fetchMembers} />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">
              รายงานสรุป
            </h2>
            <MemberReport members={members} />
          </div>
        </div>

        {/* ตารางข้อมูลสมาชิก */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            รายการสมาชิกทั้งหมด
          </h2>
          <MemberList
            members={members}
            onEdit={(member) => setSelectedMember(member)}
            onDeleteSuccess={fetchMembers}
          />
        </div>

        {/* Modal แก้ไข */}
        {selectedMember && (
          <EditMemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
            onSave={fetchMembers}
          />
        )}
      </div>
    </div>
  );
}