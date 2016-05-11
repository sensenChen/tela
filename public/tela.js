function list(){
    alert(this);
}

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
    
    var str = "Order at ";
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

var dash_app = angular.module("dash",[]);
dash_app.controller("dash_ctrl",function($scope){
    $scope.name = "Sensen"
    $scope.active = "Dashboard"
    $scope.options = [
        {value:"Dashboard", color: "black"},
        {value:"Tracking", color: "9b9b9b"},
        {value:"Order", color: "9b9b9b"},
        {value:"Setting", color: "9b9b9b"},
    ];
    
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
        $("#order").hide();
        $("#setting").hide();
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
    }
    else{
        $("#tracking").hide();
        $("#order").hide();
        $("#dashboard").hide();
        $("#setting").show();
    }
    
    for(var i=0;i<$scope.orders.length;i++){
        if(i==3)
            break;
  
        var t = track($scope.orders[i]["status"],$scope.orders[i]["time"],$scope.orders[i]["date"])
        
        if($scope.orders[i]["status"]!=6)
            draw(t,"tracker");
    }
    
    for(var i=0;i<$scope.orders.length;i++){
//        if(i==3)
//            break;

        var t = track($scope.orders[i]["status"],$scope.orders[i]["time"],$scope.orders[i]["date"])

        if($scope.orders[i]["status"]!=6)
            draw(t,"main_body");
    }
//    
//    
//    var t1 = track(2,"10:30","April 16");
//    draw(t1);
//    
//    var t2 = track(5,"10:30","April 16");
//    draw(t2);
//    
//    var t3 = track(4,"10:30","April 16");
//    draw(t3);
});

