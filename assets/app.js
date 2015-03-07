var config = {
	url: "http://wefoundlove.in:3000/api/v0",
	hardwareId: "fogden"
};

angular.module('listApp', ['ngTouch', 'yaru22.angular-timeago'])
	.controller('ListController', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
		$scope.items = []

		$scope.add = function() {
			$scope.newItem = {
				name: '',
				status: {
					value: false,
					priority: false
				}
			}
		};

		$scope.addItem = function(item) {
			$scope.items.unshift(item)
			$scope.newItem = null
		};

		$scope.getItems = function () {
			$http.get(config.url + '/list/' + config.hardwareId, function (data) {
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
		
		$scope.getItems()
		$interval(function(){
			$scope.getItems()
		}, 5000);
	}]);