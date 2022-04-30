@extends('layouts.users')

@section('title', 'Log In')


@section('products')
<form action="{{ route('login')}}" method="POST" class="form-group w-50 h-100">
  @csrf

  <div class="form-group">
    <label for="">E-mail</label>
    <input type="text" name="email" value="{{ old('email') }}" required 
      class="form-control  {{ $errors->has('email') ? ' is-invalid': '' }}">
      @if($errors->has('email')) 
      <span class="invalid-feedback">
        <strong>{{ $errors->first('email') }}</strong>
      </span>
    @endif
  </div>

  <div class="form-group">
    <label for="">Password</label>
    <input type="text" name="password"  required 
      class="form-control  {{ $errors->has('password') ? ' is-invalid': '' }}">
      @if($errors->has('password')) 
      <span class="invalid-feedback">
        <strong>{{ $errors->first('password') }}</strong>
      </span>
    @endif
  </div>

  <div class="form-group">
    <div>
      <input type="checkbox" name="remember" class="form-check-input"
        value="{{ old('rememeber') ? 'checked': '' }}">

        <label class="form-check-label" for="remember">
          Remember Me
        </label>
    </div>
  </div>

  <button type="submit" class="btn btn-primary btn-block">Login</button>
</form>

@endsection