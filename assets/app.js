var config = {
	url: "http://wefoundlove.in:3000/api/v0/",
	hardwareId: "fog"
};

angular.module('listApp', ['ngTouch', 'yaru22.angular-timeago'])
	.controller('ListController', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
		$scope.items = [
			{
				name: 'Formula', 
				lastUpdated: '2015-02-03', 
				status: 
					{ 
						value: false,
						priority: true
					}
				},
				{
				name: 'Diapers', 
				lastUpdated: '2015-08-01', 
				status: 
					{ 
						value: false,
						priority: false
					}
				},
				{
				name: 'Formula', 
				lastUpdated: '2015-02-03', 
				status: 
					{ 
						value: true,
						priority: true
					}
				}
			];

		$scope.getItems = function () {
			$http.post(config.url + '/list/' + config.hardwareId, function (data) {
				$scope.items = data.items
			});
		};

		$scope.updateItem = function (item) {
			$http.post(config.url + '/list/' + config.hardwareId + '/' + item._id, item.status.value, function(data) {
				
			});
		};

		$scope.doneItem = function (item) {
			if (item.status.value == 1) return;
			item.status.value = 1;
			$scope.updateItem(item);
		}

		$scope.openItem = function (item) {
			if (item.status.value == 0) return; 
			item.status.value = 0;
			$scope.updateItem(item);
		}

		// $interval(function(){
		// 	$scope.getItems()		
		// }, 1000);
	}]);