@extends('layouts.app')


@section('title', 'This is Edit page')

@section('products')
<form action="{{ route('admin.update', [$product->id]) }}" method="POST">
  @csrf
  @method('PUT')
  @include('admin.form')
  <div><input type="submit" value="Save" class="btn btn-info"></div>
</form>
<form action="{{ route('admin.destroy', [$product->id]) }}" method="POST">
  @csrf
  @method('DELETE')
  <input type="submit" value="DELETE PRODUCT" class="btn btn-danger">
</form>
@endsection