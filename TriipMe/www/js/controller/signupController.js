TriipMeApp.controller('signupController', ['$scope','$state','$timeout',function ($scope,$state,$timeout) {
    $scope.err = [];
    $scope.err.message = "";
    $scope.userName = "";
    $scope.userEmail = "";
    $scope.confirmEmail = "";    
    $scope.createUser = function() {
        if($scope.userEmail !== $scope.confirmEmail) {
            $scope.err = "Emails you entered did not match";
            return;
        }
        if ($scope.userEmail === ""){
             $scope.err = [];              
             //$scope.err.message = error.toString();
             var errMessage = "you have not entered your email address yet";                
             $scope.err.push(errMessage);               
             return;
        }
        var randomstring = Math.random().toString(36).slice(-8);
        fb.createUser({
            email    : $scope.userEmail,
            password : randomstring,
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error.toString());  
                $scope.err = [];              
                //$scope.err.message = error.toString();
                var errMessage = error.toString();                
                $scope.err.push(errMessage);
                $scope.$apply();                           
            } else {                
                var newUser = {};
                newUser[userData.uid] = {};
                newUser[userData.uid].name = $scope.userName; //  CHANGE WITH ACTUAL DATA
                newUser[userData.uid].provider = "password"; //  CHANGE WITH ACTUAL DATA
                newUser[userData.uid].avatar = "img/avatar.jpg"; //  CHANGE WITH ACTUAL DATA
                newUser[userData.uid].firstLogin = true;          
                fb.child("database").child("users").update(newUser);                                
                $scope.popup.close();
                fb.resetPassword({
                    email: $scope.userEmail,
                },function(error){
                    if (error){
                        switch (error.code) {
                            case "INVALID_USER":
                                console.log("The specified user account does not exist.");
                                break;
                            default:
                                console.log("Error resetting password:", error);
                        }
                    }else{
                        console.log("Password reset email sent successfully!");
                        alert('signup successfully, please check your email to get the password')
                    }
                })
            }
        });
    };
    $scope.cancelSignup = function() {
        console.log('Closing in controller!');
        $scope.popup.close();
    };        
    $scope.login = function () {
        $scope.show();        
        fb.authWithPassword({
            email: $scope.userEmail,
            password: $scope.userPassword
        }, function (error, authData) {
            $scope.hide();
            if (error) {
                console.log("Login Failed!", error);
                $scope.showAlert();
            } else {
                //fb.child("database").child("users").child(fb.getAuth().uid).update(newUser);
                //fb.child("database").child("users").child(fb.getAuth().uid).child("name").once("value", function (data) {
                //    NameOfUser = data.val();
                //    $state.go("home");
                //});
                fb.child("database").child("users").child(fb.getAuth().uid).once("value", function (data) {
                    NameOfUser = data.child("name").val();
                    AvatarOfUser = data.child("avatar").val();
                    //$scope.hide();
                    $('#myTab').css('display','block');
                    $scope.activateHomeTab();
                    $state.go("home");
                });
            }
        });
    };        
}]);