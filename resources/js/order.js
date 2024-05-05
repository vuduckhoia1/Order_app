var OrderJS = OrderJS || function () {
    var eventHandler = {
        nextStep: function(e) {
            var step = parseInt($(e.target).attr('js-step'));
            var flag = true;
            var data = getData();
            if (step == 1){
                var meal = $('.meal-sl').val();
                var no_people = $('.no_people').val();
                if(!meal || !no_people) {
                    flag = eventHandler.onRenderErr('Please fill the input');
                }
            } else if (step == 2){
                var res = $('.res-sl').val();
                if(!res) {
                    flag = eventHandler.onRenderErr('Please fill the input');
                }
            } else if (step == 3) {
                if(!data['dishes'].length) {
                    flag = eventHandler.onRenderErr('Please add at least 1 dish!');
                }
                $('.dishes-sl').each(function() {
                    var value = $(this).val();
                    if(!value) {
                        flag = eventHandler.onRenderErr('Please fill the input');
                        return false;
                    }
                });
                $('.no-dish').each(function() {
                    var value = $(this).val();
                    if(!value) {
                        flag = eventHandler.onRenderErr('Please fill the input');
                        return false;
                    }
                    if(value > 10) {
                        flag = eventHandler.onRenderErr('Number must be smaller than 10!');
                        return false;
                    }
                    if(value < data['no_people']) {
                        flag = eventHandler.onRenderErr('Number dishes must be larger or equal number of people!');
                    }
                });
            }
            if(flag) {
                if(step == 3) {
                    eventHandler.onRenderOrder();
                }
                eventHandler.onRenderStep(step, 'next');
            }
        },
        prevStep: function(e) {
            var step = parseInt($(e.target).attr('js-step'));
            var flag = true;
            if (step == 2){
                var res = $('.res-sl').val();
                if(!res) {
                    flag = eventHandler.onRenderErr('Please fill the input');
                }
            } else if (step == 3){
                $('.dishes-sl').each(function() {
                    var value = $(this).val();
                    if(!value) {
                        flag = eventHandler.onRenderErr('Please fill the input');
                        return false;
                    }
                });
                $('.no-dish').each(function() {
                    var value = $(this).val();
                    if(!value) {
                        flag = eventHandler.onRenderErr('Please fill the input');
                        return false;
                    }
                });
            }
            if(flag) {
                eventHandler.onRenderStep(step, 'prev');
            }
        },
        onRenderErr: function(msg) {
            $('.err-msg').text(msg);
            $('.err-msg').removeClass("hidden");
            return false;
        },
        onRenderStep: function(step, type) {
            $('.step' + step + '-cont').addClass("hidden");
            $('.err-msg').addClass("hidden");
            var targetStep = 0;
            if(type=='next') {
                targetStep = step + 1;
            }
            else {
                targetStep = step -1;
            }
            $('.step' + targetStep + '-cont').removeClass("hidden");
        },
        addItem: function() {
            var html = '<div class="dishes-cont">\
                            <select class="dishes-sl">\
                                <option value="" selected></option>';
                
                                for(var dish of window.dishes){
                                    html += '<option value="' + dish + '">' + dish + '</option>';
                                }
                            html += '</select>\
                            <input type="number" class="no-dish">\
                            <button class="remove-btn">Remove</button>\
                        </div>';
            $('.list-dishes').append(html);
        },
        onChangeDish: function(e) {
            var value = $(e.target).val();
            var index = window.dishes.indexOf(value);
            if (index !== -1) {
                window.dishes.splice(index, 1);
            }
        },
        onRemoveDish: function(e) {
            $(e.target).parent().remove();
        },
        onRenderOrder: function() {
            var data = getData();
            $('.meal-inp').val(data['meal']);
            $('.no-people-inp').val(data['no_people']);
            $('.restaurant-inp').val(data['restaurant']);
            $('.dish-inp').text(data['dishes_str']);
        },
        onSubmit: function() {
            $.ajax({
                type: "POST",
                url: "/save_order",
                data: getData(),
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                dataType: "JSON",
                success: function() {
                    console.log(getData());
                    alert('Order Successful!');
                },
                error: function() {
                    alert('Order Failed!')
                }
            });
        },
    }

    function getData() {
        var meal = $('.meal-sl').val(),
            no_people = $('.no_people').val(),
            res = $('.res-sl').val(),
            dishes = [],
            count_dishes = [];
        $('.dishes-sl').each(function() {
            dishes.push($(this).val());
        });
        $('.no-dish').each(function() {
            count_dishes.push($(this).val());
        });
        var dishes_res = '';
        for(var i = 0; i < dishes.length; i++) {
            dishes_res += dishes[i] + ': ' + count_dishes[i] + '\n';
        }
        return {'meal': meal,
                'no_people': no_people,
                'restaurant': res,
                'dishes': dishes,
                'count_dishes': count_dishes,
                'dishes_str': dishes_res,
        };
    }

    function bindEvent() {
        $('.next-step').on('click', eventHandler.nextStep);
        $('.prev-step').on('click', eventHandler.prevStep);
        $('.add-item').on('click', eventHandler.addItem);
        $('.list-dishes').on('change', 'select', eventHandler.onChangeDish);
        $('.list-dishes').on('click', '.remove-btn', eventHandler.onRemoveDish);
        $('.submit-btn').on('click', eventHandler.onSubmit);
    }

    function init() {
        bindEvent();
        eventHandler.addItem();
    }

    init();
}

$(document).ready(function () {
    window.OrderJS = new OrderJS();
})
