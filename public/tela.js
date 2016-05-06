var tela_app = angular.module("tela",[]);

tela_app.controller("tela_ctrl",function($scope){
    
    
    
});


var dash_app = angular.module("dash",[]);
dash_app.controller("dash_ctrl",function($scope){
    $scope.name = "Sensen"
    $scope.active = "Dashboard"
    $scope.options = [
        {value:"Dashboard", color: "black"},
        {value:"Order", color: "9b9b9b"},
        {value:"Setting", color: "9b9b9b"},
    ];
    
    $scope.change = function(){
        $scope.active = this["o"]["value"];
        for(var i=0;i<$scope.options.length;i++){
            if($scope.options[i]["value"] == $scope.active)
                $scope.options[i]["color"] = "black";
            else 
                $scope.options[i]["color"] = "#9b9b9b";
        }
    }
    
});