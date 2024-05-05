<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dishes;

class DishesController extends Controller
{
    public function chooseMeal() {
        $array = Dishes::select('availableMeals', 'restaurant', 'name')->get();
        $meals = [];
        $restaurants = [];
        $dishes = [];
        foreach($array as $element) {
            foreach($element->availableMeals as $m) {
                if(!in_array($m, $meals)) {
                    array_push($meals, $m);
                }
            }
            if(!in_array($element->restaurant, $restaurants)) {
                array_push($restaurants, $element->restaurant);
            }
            array_push($dishes, $element->name);
        }
        $data = [
            'meals' => $meals,
            'restaurants' => $restaurants,
            'dishes' => $dishes
        ];
        return view('app', $data);
    }
}
