<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use app\Http\Requests\CompanyRequest;

class CompaniesController extends Controller
{
   public function index(){
       $companies=Company::all();
       return response()->json($companies);
   }
   public function edit($id){
      $company=Company::find($id);
      return response()->json($company);
   }
   public function store(Request $request){
      Company::create($request->all());
      return response()->json('create success fully',201);
   }
   public function update(Request $request,$id){
    $company=Company::find($id);
    $company->update($request->all());
    return response()->json('update success fully',201);
   }
   public function delete($id){
    $company=Company::find($id);
    $company->delete();
    return response()->json('delete success fully',201);
   }
}
