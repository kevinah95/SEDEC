(function() {
    'use strict';
    angular
        .module('sedecApp')
        .controller('NavbarController', NavbarController);

    function NavbarController($scope, $location) {
        var navbar = this;
        navbar.home = home;
        navbar.profile = profile;
        navbar.results = results;
        navbar.upload = upload;

        function home() {
            $location.path('/home');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        function profile() {
            $location.path('/profile');
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



        $(function() {
            $(document).ready(function() {
                // $('#notifications')
                //     .dropdown({
                //         action: 'select',
                //         onChange: function(value, text, $selectedItem) {
                //             //console.log($selectedItem);
                //             //$('#notificationsmenu').append('<div class="item" data-value="' + 2 + '">' + "Hola" + '</div>');
                //             $('#notificationsmenu').append('<div class="item"><div class="ui feed"><div class="event"><div class="content"><div class="summary"><a class="user">Muestra 546</a> ha sido analizada<div class="date">Hace 1 hora</div></div><div class="meta"> <a class = "like green" ><i class = "check icon"> < /i> Marcar como vista </a> </div> </div> </div> </div> </div>');
                //             /*var thisArtist = $('#notificationsmenu .item.user').dropdown('get value');
                //             console.log(thisArtist);*/
                //             $('#notificationsmenu').dropdown('refresh');
                //             $('#notifications')
                //                 .dropdown({
                //                     action: 'select'
                //                 });

                //         }
                //     });
                $('#notifications')
                    .popup({
                        inline: true,
                        hoverable: true,
                        position: 'bottom right',
                        delay: {
                            show: 300,
                            hide: 800
                        },
                        onHide: function($module) {
                            var html = '<div class="item" data-value="' + 2 + '">' + "Hola" + '</div>';
                            //$("<p></p>").text("Text.");
                            //$(html).append(html);
                            $('#notifications').popup('change content(html)', '<div class="item" data-value="' + 2 + '">' + "Hola" + '</div>');
                            /*$('#notifications').popup({
                                inline: true,
                                hoverable: true,
                                position: 'bottom right',
                                delay: {
                                    show: 300,
                                    hide: 800
                                },
                                html: '<div class="item" data-value="' + 2 + '">' + "Hola" + '</div>'
                            });*/
                        }
                    });
            });

        });
    }
})();