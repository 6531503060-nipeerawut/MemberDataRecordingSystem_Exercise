<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Member::query();

            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('first_name', 'like', '%' . $search . '%')
                      ->orWhere('last_name', 'like', '%' . $search . '%');
                });
            }

            if ($request->has('sort') && $request->sort == 'age') {
                $members = $query->get()->sortByDesc(function ($member) {
                    return Carbon::parse($member->birthdate)->age;
                });
                return response()->json($members->values());
            }

            return response()->json($query->get());
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching members',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'prefix' => 'required|string',
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'birthdate' => 'required|date',
                'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            $data = $request->all();

            if ($request->hasFile('profile_image')) {
                // สร้างโฟลเดอร์ถ้ายังไม่มี
                if (!file_exists(public_path('uploads'))) {
                    mkdir(public_path('uploads'), 0755, true);
                }
                
                $filename = time() . '.' . $request->profile_image->extension();
                $request->profile_image->move(public_path('uploads'), $filename);
                $data['profile_image'] = $filename;
            }

            $member = Member::create($data);
            return response()->json($member, 201);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $member = Member::findOrFail($id);
        
        $request->validate([
            'prefix' => 'sometimes|required|string',
            'first_name' => 'sometimes|required|string',
            'last_name' => 'sometimes|required|string',
            'birthdate' => 'sometimes|required|date',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data = $request->all();

        if ($request->hasFile('profile_image')) {
            // ลบรูปเก่าถ้ามี
            if ($member->profile_image && file_exists(public_path('uploads/' . $member->profile_image))) {
                unlink(public_path('uploads/' . $member->profile_image));
            }
            
            $filename = time() . '.' . $request->profile_image->extension();
            $request->profile_image->move(public_path('uploads'), $filename);
            $data['profile_image'] = $filename;
        }

        $member->update($data);
        return response()->json($member);
    }

    public function destroy($id)
    {
        $member = Member::findOrFail($id);
        
        // ลบรูปถ้ามี
        if ($member->profile_image && file_exists(public_path('uploads/' . $member->profile_image))) {
            unlink(public_path('uploads/' . $member->profile_image));
        }
        
        $member->delete();
        return response()->json(['message' => 'Member deleted successfully']);
    }
}