
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Order App</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        @vite(['resources/js/app.js', 'resources/css/app.css'])
    </head>
    <body>
        <div class="step-con">
            <div class="header-step">Step 1</div>
            <div class="header-step">Step 2</div>
            <div class="header-step">Step 3</div>
            <div class="header-step">Review</div>
        </div>
        <div class="err-msg hidden"></div>
        <div class="step1-cont">
            <div>
                Please Select a meal
                <select class="meal-sl">
                    <option value="" selected></option>
                    @foreach($meals as $meal)
                        <option value="{{$meal}}">{{$meal}}</option>
                    @endforeach
                </select>
            </div>
            <div>
                Please Enter Number of people
                <input type="number" class="no_people">
            </div>
            <button class="next-step" js-step='1'>Next</button>
        </div>
        <div class="step2-cont hidden">
            <div>
                Please Select a Restaurant
                <select class="res-sl">
                    <option value="" selected></option>
                    @foreach($restaurants as $res)
                        <option value="{{$res}}">{{$res}}</option>
                    @endforeach
                </select>
            </div>
            <button class="prev-step" js-step="2">Previous</button>
            <button class="next-step" js-step="2">Next</button>
        </div>
        <div class="step3-cont hidden">
            Please Select a dish
            <div class="list-dishes"></div>
            <button class="add-item">Add</button>
            <button class="prev-step" js-step="3">Previous</button>
            <button class="next-step" js-step="3">Next</button>
        </div>
        <div class="step4-cont hidden">
            <div class="meal-cont">
                <label>Meal</label>
                <input type="text" class="meal-inp" disabled>
            </div>
            <div class="no-people-cont">
                <label>No of People</label>
                <input type="text" class="no-people-inp" disabled>
            </div>
            <div class="res-cont">
                <label>Restaurant</label>
                <input type="text" class="restaurant-inp" disabled>
            </div>
            <div class="dish-cont">
                <label>Dishes</label>
                <textarea class="dish-inp" disabled></textarea>
            </div>
            <button class="prev-step" js-step="4">Previous</button>
            <button class="submit-btn">Submit</button>
        </div>
    </body>
</html>
<script type='text/javascript'>
    window.dishes = {!! json_encode($dishes) !!};
</script>