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
        navbar.admin = admin;

        function home() {
            $location.path('/home');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        function profile() {
            $location.path('/profile/index');
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
            $location.path('/admin');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };


        var muestra = 0;
        $(function() {
            $(document).ready(function() {
                $('#notifications')
                    .dropdown({
                        action: 'select',
                        onChange: function(value, text, $selectedItem) {
                            // var html = '<div class="item"><div class="ui feed"><div class="event"><div class="content"><div class="summary"><a class="user">Muestra 546</a> ha sido analizada<div class="date">Hace 1 hora</div></div><div class="meta"> <a class = "like green" ><i class = "check icon"> < /i> Marcar como vista </a> </div> </div> </div> </div> </div>';
                            // //console.log($selectedItem);
                            // //$('#notificationsmenu').append('<div class="item" data-value="' + 2 + '">' + "Hola" + '</div>');
                            // $('#notificationsmenu').append(html);
                            // $('#notificationsmenu').append(html);
                            // /*var thisArtist = $('#notificationsmenu .item.user').dropdown('get value');
                            // console.log(thisArtist);*/
                            // $('#notificationsmenu').dropdown('refresh');
                            // $('#notifications')
                            //     .dropdown({
                            //         action: 'select'
                            //     });
                            //console.log($("#notificationsmenu .menu > summary:has('user')"));
                            //console.log($('*[data-value="value02"]'));
                            //console.log($("#notificationsmenu").find('.summary').append('<a class="user" data-value="value02">Muestra 546</a> ha sido analizada'));

                            var menu = '<div class="item">\
                                            <div class="ui feed">\
                                                <div class="event">\
                                                    <div class="content">\
                                                        <div class="summary">\
                                                            <a class="user" data-value="value02">\
                            Muestra ' + muestra++ + '\
                            </a> ha sido analizada\
                                                            <div class="date">\
                                                                Hace 1 hora\
                                                            </div>\
                                                        </div>\
                                                        <div class="meta">\
                                                            <a class="like green">\
                                                                <i class="check icon"></i> Marcar como vista\
                                                            </a>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>';
                            var prueba01 = '.item.ui feed.event.content.summary'

                            $("#notificationsmenu").append(prueba01);
                            (function($) {
                                $.fn.appendR = function(toAppend) {
                                    var $toAppend = $(toAppend);
                                    this.append($toAppend);
                                    return $toAppend;
                                };
                            })(jQuery);


                            var element1 = '<div> A div within a div </div>';
                            var element2 = '<div> Another div within a div </div>';
                            console.log($('<div/>').addClass("item"));
                        }
                    });

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