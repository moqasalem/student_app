<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{

    public function index()
    {
        $students = Student::all();
        return response()->json([
            'status'=> 200 ,
            'students' =>  $students,
        ]);
    }

    public function store(Request $req)
    {
        $validator = Validator::make($req->all(),[
            'name'=> 'required|max:191',
            'course'=> 'required|max:191',
            'email'=> 'required|email|max:191',
            'phone'=> 'required|max:10|min:10',
            //'phone'=> 'required|numeric|max:10|min:10',
        ]);

        if($validator->fails())
        {
           return response()->json([
            'validate_err'=> $validator->messages(),
           ]);
        }
        
        else{
            $student = new Student;
            $student->name = $req->input('name');
            $student->email = $req->input('email');
            $student->course = $req->input('course');
            $student->phone = $req->input('phone');
            $student->save();
            return response()->json([
                'status'=>200,
                'message' => 'Student added successfully',
            ]);
        }

    }

    public function edit($id)
    {
        $student = Student::find($id);
        if ($student)
        {
            return response()->json([
                'status'=> 200,
                'student'=> $student,
            ]);
        }
        
        else {
            return response()->json([
                'status'=> 404,
                'message'=> 'No student ID found',
            ]);
        }
    }


    public function update(Request $req, $id)
    {
        $validator = Validator::make($req->all(),[
            'name'=> 'required|max:191',
            'course'=> 'required|max:191',
            'email'=> 'required|email|max:191',
            'phone'=> 'required|max:10|min:10',
            //'phone'=> 'required|numeric|max:10|min:10',
        ]);

        if($validator->fails())
        {
           return response()->json([
            'validate_err'=> $validator->messages(),
           ]);
        }
        
        else{
            $student = Student::find($id);
            if($student)
            {

                $student->name = $req->input('name');
                $student->email = $req->input('email');
                $student->course = $req->input('course');
                $student->phone = $req->input('phone');
                $student->update();

                return response()->json([
                    'status'=>200,
                    'message' => 'Student updated successfully',
                ]);
            }
            else{
                
                return response()->json([
                    'status'=> 404,
                    'message'=> 'No student ID found',
                ]);
            }
            
        }
    }
   
    public function destroy($id)
    {
        $student = Student::find($id);
        $student->delete();
        return response()->json([
            'status'=>200,
            'message' => 'Student deleted successfully',
        ]);
    }
}
