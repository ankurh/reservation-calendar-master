var myApp = angular.module("myApp", []);

function reserveCalendar($scope, $http) {

    $scope.showTenant = false;
    $scope.showReserved = false;
    $scope.showBooking = false;

    //get the reservation for selected date
    $scope.setReservation = function () {
        var current = new Date(new Date($scope.resCalendar).setHours(0, 0, 0, 0)).getTime();
        $scope.tenant = "";
        $scope.showTenant = false;
        $scope.showReserved = false;

        if (!Number.isNaN(current)) {

            $http.get('/reserve/' + current + '/' + current + '')
                .success(function (data) {
                    $scope.showBooking = true;
                    if (data.reserved.length)  // checking if any reservation found
                    {
                        $scope.showTenant = false;
                        $scope.showReserved = true;
                        $scope.disable = true;
                        $scope.tenant = data.reserved[0].tennantName;

                    }
                    else {
                        $scope.showTenant = true;
                        $scope.showReserved = false;
                        $scope.disable = false;
                    }
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
    }

    // common funtion to create the json request oject for adding or removing tenant.
    $scope.setupReservation = function () {
        var bookingTime = new Date(new Date($scope.resCalendar).setHours(0, 0, 0, 0)).getTime();
        var reservation = {
            "tennantName": $scope.tenant,
            "time": bookingTime,
            "reserved": $scope.showTenant
        }
        $scope.booking(reservation);
    }
    //making post request 
    $scope.booking = function (bookingData) {
        $http.post('/reserve', bookingData)
            .success(function (data) {
                alert("Stay confirmed")
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };


}