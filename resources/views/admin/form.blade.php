<div><input type="text" name="name" value="{{ old('name',optional($product ?? null)->name) }}"placeholder="name"></div>
<div><input type="text" name="stock" value="{{ old('stock', optional($product ?? null)->stock) }}" placeholder="stock"></div>
<div><input type="text" name="price" value="{{ old('stock', optional($product ?? null)->price) }}" placeholder="price"></div>

@if ($errors->any())
  @foreach ($errors->all() as $error )
      <div>{{ $error }}</div>
  @endforeach
@endif