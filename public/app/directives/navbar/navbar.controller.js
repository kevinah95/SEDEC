(function() {
    'use strict';
    angular
        .module('sedecApp')
        .controller('NavbarController', NavbarController);

    function NavbarController($scope, $location, notificationsService, $auth, $rootScope, $state) {
        var navbar = this;
        navbar.notificationsList = [];
        navbar.isAdmin = false;
        navbar.home = home;
        navbar.profile = profile;
        navbar.results = results;
        navbar.upload = upload;
        navbar.admin = admin;
        navbar.notifications = notifications;
        navbar.clickNotification = clickNotification;
        if ($auth.isAuthenticated() && $rootScope.currentUser) {
            console.log($rootScope.currentUser.isAdmin);
            navbar.isAdmin = $rootScope.currentUser.isAdmin;
            /*API.getFeed().success(function(data) {
                $scope.photos = data;
            });*/
            console.log($auth.isAuthenticated());
            $scope.$$postDigest(function() {
                console.log('$$postDigest executed. Digest completed');
                activate();
            });
        }

        function home() {
            $location.path('/home');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        function profile() {
            $location.path('/profile/main');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        function results() {
            $location.path('/results');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        function upload() {
            $location.path('/upload');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        function admin() {
            $location.path('/admin/main');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        function notifications() {

        };

        function clickNotification(obj) {
            notificationsService.update(obj).then(function(data) {
                    console.log(data)
                    $state.go('results');
                    activate();
                    return data;
                })
                .catch(function(error) {
                    //console.log(error);
                    return error;
                });
        };

        function activate() {
            return notificationsService.getAllByUser()
                .then(function(data) {
                    navbar.notificationsList = data;
                    console.log(data)
                    return navbar.notificationsList;
                })
                .catch(function(error) {
                    //console.log(error);
                    return error;
                });
        };


        var muestra = 0;
        $(function() {
            $(document).ready(function() {
                $('#notifications')
                    .dropdown({ action: 'hide' });

                //         }
                //     });
                // $('#notifications')
                //     .popup({
                //         inline: true,
                //         hoverable: true,
                //         position: 'bottom right',
                //         delay: {
                //             show: 300,
                //             hide: 800
                //         },
                //         onHide: function($module) {
                //             var html = '<div class="item"><div class="ui feed"><div class="event"><div class="content"><div class="summary"><a class="user">Muestra 546</a> ha sido analizada<div class="date">Hace 1 hora</div></div><div class="meta"> <a class = "like green" ><i class = "check icon"> < /i> Marcar como vista </a> </div> </div> </div> </div> </div>';
                //             //$("<p></p>").text("Text.");
                //             //$(html).append(html);
                //             //$('#notifications').popup('change content(html)', '<div class="item" data-value="' + 2 + '">' + "Hola" + '</div>');
                //             var popupLoading = '<i class="notched circle loading icon green"></i> wait...';
                //             $('#notifications').popup({
                //                 inline: true,
                //                 on: 'hover',
                //                 exclusive: true,
                //                 hoverable: true,
                //                 html: popupLoading,
                //                 variation: 'wide',
                //                 delay: {
                //                     show: 400,
                //                     hide: 400
                //                 },
                //                 onShow: function(el) { // load data (it could be called in an external function.)
                //                     var popup = this;
                //                     popup.html(popupLoading);
                //                     $.ajax({
                //                         url: 'http://www.example.com/'
                //                     }).done(function(result) {
                //                         popup.html(result);
                //                     }).fail(function() {
                //                         popup.html(html);
                //                     });
                //                     console.log(popup.popup('refresh'));
                //                 }
                //             });
                //             /*$('#notifications').popup({
                //                 inline: true,
                //                 hoverable: true,
                //                 position: 'bottom right',
                //                 delay: {
                //                     show: 300,
                //                     hide: 800
                //                 },
                //                 html: '<div class="item" data-value="' + 2 + '">' + "Hola" + '</div>'
                //             });*/
                //         }
                //     });

            });

        });
    }
})();