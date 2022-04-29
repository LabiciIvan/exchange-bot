<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\Review;
use App\Http\Requests\StoreReview;

class ReviewController extends Controller
{
    public function addReview(StoreReview $request, $id) {

        $validateReview = $request->validated();

        $product = Products::findOrFail($id);
        $review = new Review();

        $review->fill($validateReview);

        $product->review()->save($review);

        return redirect()->route('users.show', $id);
    }

    public function deleteReview($id, $reviewId) {

        $review = Review::findOrFail($reviewId);
        $review->delete();

        return redirect()->route('admin.show', $id);

    }
}
