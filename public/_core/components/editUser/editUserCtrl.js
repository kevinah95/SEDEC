app.controller('editUserCtrl', function($scope, $timeout, $location) {

	var newData = {mail:"",pass:"",name:"",pic:""}

	$scope.getData = function(){
		newData.mail = $scope.mail;
		newData.pass = $scope.pass;
		newData.name = $scope.name;
		newData.pic = $scope.pic;
		console.log(newData);
	};

});