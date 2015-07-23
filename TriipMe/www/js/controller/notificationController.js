TriipMeApp.controller('notificationController',['$scope','$state',function($scope,$state){
    $scope.notiList = [];

    var notiRef = fb.child("database").child("users").child(fb.getAuth().uid).child("noti");

    notiRef.orderByKey().on("child_added",function(snapshot){
        var noti = snapshot.val();
        noti.time = $scope.utilDateFormat(snapshot.val().time);
        $scope.notiList.push(noti);
        $('#notifyIcon').css('color','red');
    });

    $scope.gotoBlog = function(blogid){
        //BlogID = fb.child("database").child("users").child(fb.getAuth().uid).child("blogs")
        console.log(blogid);
        if(blogid !== null)
            $state.go("blogdetails",{blogid:blogid});

    };
}]);
