@extends('layouts.app');

@section('title', 'Placed orders')

@section('products')

@foreach ($orders as $item)
    <div>{{ $orders->name }}</div>
@endforeach

@endsection