@extends('layouts.app')

@section('title', 'Add Product')

@section('products')
<form action="{{ route('admin.store') }}" method="POST">
  @csrf
  @include('admin.form')
  <div><input type="submit" value="add" class="btn btn-info"></div>
</form>
@endsection