function list(){
    alert(this);
}

//function initMap() {
//    // Create a map object and specify the DOM element for display.
//    var map = new google.maps.Map(document.getElementById('map'), {
//        center: {lat: -34.397, lng: 150.644},
//        scrollwheel: false,
//        zoom: 8
//    });
//}

var track = function(step,date,date_time){
    var tracker = new Object(),steps = [], current = 0, d_date= "", d_time="";
    
    tracker["steps"] = [];
    tracker["current"] = step;
    tracker["d_date"] = date;
    tracker["d_time"] = date_time;
    for(var i=0;i<7;i++){
        if(i<step){
            tracker["steps"].push(0);
        }
        else if(i==step){
            tracker["steps"].push(1);
        }
        else {
            tracker["steps"].push(2);
        }
    }
    
    console.log(tracker);
    return tracker;
};

function draw(track,id){
    var tracker = document.createElement("div");
    tracker.setAttribute("class","tracker");
    
    var str = "Order for ";
    str += track["d_date"];
    str += " ";
    str += track["d_time"];
        
    var title = document.createElement("h6");
    title.innerHTML = str;
    tracker.appendChild(title);
    
    for(var i=0;i<track.steps.length;i++){
        if(track.steps[i]==0){
            var dot = document.createElement("img");
            dot.setAttribute("src","Oval1.png");
            dot.addEventListener("mouseover",function(){
//                alert("this");
            });
            dot.setAttribute("class","trackball");
            tracker.appendChild(dot);
        }
        else if(track.steps[i]==1){
            var dot = document.createElement("img");
            dot.setAttribute("src","Oval2.png");
            dot.addEventListener("mouseover",function(){
//               alert("this");
            });
            dot.setAttribute("class","trackball");
            tracker.appendChild(dot);
        }
        else {
            var dot = document.createElement("img");
//            
            dot.setAttribute("src","Oval3.png");
            dot.addEventListener("mouseover",function(){
//                alert("this");
            });
            dot.setAttribute("class","trackball");
            tracker.appendChild(dot);
        }
        
        if(i!=6){
            var bar = document.createElement("div");
            bar.setAttribute("class","trackline");
            tracker.appendChild(bar);
        }      
    }

    document.getElementById(id).appendChild(tracker);
}

var dash_app = angular.module('dash', ['uiGmapgoogle-maps']);


dash_app.controller("dash_ctrl",function($scope){
    $scope.name = "Sensen"
    $scope.active = "Dashboard"
    $scope.options = [
        {value:"Dashboard", color: "black"},
        {value:"Tracking", color: "9b9b9b"},
        {value:"Order", color: "9b9b9b"},
        {value:"Setting", color: "9b9b9b"},
    ];
    
//    $scope.map;
    $scope.map = { center: { latitude: 42.7284, longitude: -73.6918 }, zoom: 8 };
    $scope.activenum = 56785;
    
    
    $scope.orders = [
        {
            order_num: 56782,
            quantity: 2,
            time: "10:30 PM",
            date: "April 16th",
            status: 2
        },
        {
            order_num: 56783,
            quantity: 1,
            time: "10:30 PM",
            date: "April 16th",
            status: 5
        },
        {
            order_num: 56784,
            quantity: 1,
            time: "10:30 PM",
            date: "April 16th",
            status: 4
        },
        {
            order_num: 56785,
            quantity: 1,
            time: "10:30 PM",
            date: "April 16th",
            status: 6
        },
    ];
    
    $scope.new_address = "";
    $scope.new_quantity = "";
    $scope.new_time = "";
    $scope.new_cell = "";
    
    $scope.status_message = ["Ordered","Picked Up","At Laundromat","Washing","Drying","Dropping Off","Finished"]
    
    
    $scope.subscription_type = "small";
    $scope.payment = {small:10,medium:20,large:30};
    
    $scope.change = function(){
        $scope.active = this["o"]["value"];
        for(var i=0;i<$scope.options.length;i++){
            if($scope.options[i]["value"] == $scope.active){
                $scope.options[i]["color"] = "black";
            }    
            else{
                $scope.options[i]["color"] = "#9b9b9b";
            }    
        }
        
        if($scope.active == "Dashboard"){
            $("#tracking").hide();
            $("#order").hide();
            $("#setting").hide();
            $("#dashboard").show();
        }
        else if($scope.active == "Tracking"){
            if($scope.orders.length>0)
                $( "#tracking_box" ).empty();
                
            for(var i=$scope.orders.length-1;i>=0;i--){
                var t = track($scope.orders[i]["status"],$scope.orders[i]["time"],$scope.orders[i]["date"]);

                if($scope.orders[i]["status"]!=6)
                    draw(t,"tracking_box");
            }
            
            $("#order").hide();
            $("#setting").hide();
            $("#dashboard").hide();
            $("#tracking").show();
        }
        else if($scope.active == "Order"){
            $("#tracking").hide();
            $("#setting").hide();
            $("#dashboard").hide();
            $("#order").show();
            
//            console.log($scope.map)
        }
        else{
            $("#tracking").hide();
            $("#order").hide();
            $("#dashboard").hide();
            $("#setting").show();
        }
    }
    
    if($scope.active == "Dashboard"){
        $("#tracking").hide();
//        $("#order").hide();
        $("#setting").hide();
        $("#dashboard").hide();
//        $("#dashboard").show();
    }
    else if($scope.active == "Tracking"){
        $("#order").hide();
        $("#setting").hide();
        $("#dashboard").hide();
        $("#tracking").show();
    }
    else if($scope.active == "Order"){
        $("#tracking").hide();
        $("#setting").hide();
        $("#dashboard").hide();
        $("#order").show();
        $("#gmap").hide();
    }
    else{
        $("#tracking").hide();
        $("#order").hide();
        $("#dashboard").hide();
        $("#setting").show();
    } 
    
    $scope.goto_dash = function(){
        $scope.orders.push({
            order_num: $scope.activenum + 1,
            quantity: Number($scope.new_quantity),
            time: String($scope.new_time),
            date: "May 11th",
            status: 0         
        });
        
        $scope.activenum++;
        $scope.new_time = "";
        $scope.new_quantity = ""
        $scope.new_time = "";
        
        $scope.active = "Dashboard";
        for(var i=0;i<$scope.options.length;i++){
            if($scope.options[i]["value"] == $scope.active){
                $scope.options[i]["color"] = "black";
            }    
            else{
                $scope.options[i]["color"] = "#9b9b9b";
            }    
        }
        
        $("#tracking").hide();
        $("#order").hide();
        $("#setting").hide();
        $("#dashboard").show();
    }
    
    if($scope.active == "Dashboard"){
        $("#tracking").hide();
        $("#order").hide();
        $("#setting").hide();
//        $("#dashboard").hide();
        $("#dashboard").show();
    }
    else if($scope.active == "Tracking"){
       
        $("#order").hide();
        $("#setting").hide();
        $("#dashboard").hide();
        $("#tracking").show();
    }
    else if($scope.active == "Order"){
        $("#tracking").hide();
        $("#setting").hide();
        $("#dashboard").hide();
        $("#order").show();
//        $("#gmap").hide();
    }
    else{
        $("#tracking").hide();
        $("#order").hide();
        $("#dashboard").hide();
        $("#setting").show();
    }
    
    
    var count = 0;
    for(var i=$scope.orders.length-1;i>=0;i--){
        if(count == 3)
            break;
        
        var t = track($scope.orders[i]["status"],$scope.orders[i]["time"],$scope.orders[i]["date"]);
        
        if($scope.orders[i]["status"]!=6){
            draw(t,"tracker");
//            alert("true")
            count++;
        }
        

        
    }
});

