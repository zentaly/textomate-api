var wordController = angular.module('wordController', []);

wordController.filter('format', function () {
  return function (item) {
      return Math.round(item * 100) / 100
  };
});

wordController.controller('WordController', function($scope, $filter, $http, $rootScope) {
    $("#progressSection").css("display", "none");
    $("#report").css("display", "none");
    $("#error").css("display", "none");

    $scope.settings = {"lineSymbols": 80, "pageSymbols": 20, "ignoreNums": false};
    $scope.reportJson = "";
    $scope.settingsJson = "";

    $scope.$watchGroup(["settings.ignoreNums", "settings.lineSymbols", "settings.pageSymbols"], function(newValue, oldValue) {
        $scope.settingsJson = angular.toJson($scope.settings);
    });

    $scope.sendFile = function(file) {
//        ga('send', 'event', 'button', 'upload', 'file', 1);
        $("#progress").css("width", "0%");
        $("#progress").removeClass("progress-bar-striped active");
        $("#report").css("display", "none");
        $("#error").css("display", "none");
        $("#progressSection").css("display", "block");
        formData = new FormData();
        formData.append('file', file);
        $scope.fileName = file.name;
        $.ajax({
            type: 'POST',
            url: '/a/upload',
            data: formData,
            contentType: false,
            mimeType: 'multipart/form-data',
            processData:false,
            success: function(rsp) {
                $scope.reportJson = rsp;
                $scope.data = angular.fromJson(rsp);
                $scope.$apply();
                $("#progressSection").css("display", "none");
                $("#report").css("display", "block");
            },
            error: function(error) {
                $scope.error = error.responseText;
                $scope.$apply();
                $("#progressSection").css("display", "none");
                $("#error").css("display", "block");
            },
            xhr: function() {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', $scope.onProgress, false);
                }
                return myXhr;
            }
        });
        $("#file").val("");
    };

    $scope.onProgress = function(evt) {
        if (evt.lengthComputable) {
            var percentage = parseInt(evt.loaded / evt.total * 100);
            $("#progress").css("width", percentage + "%");
            if (percentage == 100) {
                setTimeout(function() {
                    $("#progress").addClass("progress-bar-striped active");
                }, 700);
            }
        }
    };

    $("#file").on("change", function() {
        $scope.sendFile($('#file')[0].files[0]);
    });

    initDragAndDrop().on("drop", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('dragging');
        $scope.sendFile(e.originalEvent.dataTransfer.files[0]);
    });

    $scope.addWebPage = function() {
        $('#myModal').modal('show');
    }

    $scope.submitWebPage = function() {
//        ga('send', 'event', 'button', 'upload', 'link', 1);
        $scope.fileName = $scope.webPageUrl;
        $("#progress").css("width", "100%");
        $("#progress").addClass("progress-bar-striped active");
        $("#progressSection").css("display", "block");
        $("#report").css("display", "none");
        $("#error").css("display", "none");
        $('#myModal').modal('hide');
        $http.post('/a/url', $scope.webPageUrl)
        .success(function(data, status, headers, config) {
            $scope.reportJson = angular.toJson(data);
            $scope.data = data;
            $scope.$apply();
            $("#progressSection").css("display", "none");
            $("#report").css("display", "block");
        })
        .error(function(data, status, headers, config) {
            console.log(data);
            $scope.error = data;
            $scope.$apply();
            $("#progressSection").css("display", "none");
            $("#error").css("display", "block");
        });
    };

    $('#getPdf').on('click', function() {
//        ga('send', 'event', 'button', 'getReport', 'pdf', 1);
    });
});
