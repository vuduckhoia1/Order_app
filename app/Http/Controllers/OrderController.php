<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function save(Request $request) {
        $order = new Order;
        $order->meal = $request->meal;
        $order->no_people = $request->no_people;
        $order->restaurant = $request->restaurant;
        $dishes = [];
        for($index = 0; $index < count($request->dishes); $index++) {
            $dishes[$request->dishes[$index]] = $request->count_dishes[$index];
        }
        $order->dishes = $dishes;
        $order->save();
        return 1;
    }

}
