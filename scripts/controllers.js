angular.module('app.controller', []).controller('statesControl', function($scope, $http){
	$scope.states = [];
	$scope.statesCopy = [];
	var promise = $http.get('http://tiny-pizza-server.herokuapp.com/collections/fancy-table')
	.success(function(response){
		for(var i=0; i<response.length; i++){
			if(response[i].name && response[i].abbreviation){
				$scope.states.unshift(response[i]);
				$scope.statesCopy.unshift(response[i]);
			}
		}
	}).error(function(err){
		console.log(err);
		});

	$scope.stateFlip = function(){
		$scope.statesCopy.reverse();
	}
	$scope.filter= "";
	$scope.$watch('filter', 
		function() {
			console.log('first filter letter: ' + $scope.filter[0]);
			$scope.statesCopy = _.filter($scope.states,
				function(element){
					console.log('filter inside: ' + $scope.filter);
					return element.name.toLowerCase().indexOf($scope.filter.toLocaleLowerCase()) > -1 || element.abbreviation.toLowerCase().indexOf($scope.filter.toLocaleLowerCase()) > -1;
		});
	});
})
