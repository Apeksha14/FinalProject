/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('tutorialWebApp', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
   
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    .when("/properties", {templateUrl: "partials/properties.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    .when("/daycares", {templateUrl: "partials/daycare.html", controller: "PageCtrl"})
    .when("/blog1", {templateUrl: "partials/blog1.html", controller: "BlogCtrl"})
     .when("/blog2", {templateUrl: "partials/blog2.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    .when("/errorpage", {templateUrl: "partials/errorpage.html", controller: "PageCtrl"})
    .when("/search", {templateUrl: "partials/search.html", controller: "PageCtrl"})
    .when("/successpage", {templateUrl: "partials/successpage.html", controller: "PageCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function ($scope, $location, $http ) {
  console.log("Blog Controller reporting for duty.");
  console.log("dropdownCtrl");
  
});


/**
 * Controls all other Pages
 */
var searchResult = [];
var user;
app.controller('myCtrl', function($rootScope,$scope,$http,$location) {
  console.log("mycontrol");
$scope.sub= function(){

     console.log($scope.city);
     console.log($scope.state);
     console.log($scope.type);
     console.log($scope.level);

      var city = $scope.city;
      var state = $scope.state;
      var type = $scope.type;
      var level = $scope.level;

      var input = {
        
       
        state:state,
        city: city,
        type:type,
        level:level
      }

     $http({
       method: 'post',
       url: '/apidata',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
  console.log($rootScope.userlogin);
    for(var i=0;i<response.schools.school.length;i++)
    {
      $scope.items[i] =

      { 
        
        "id":response.schools.school[i].gsId[0],
        "name":response.schools.school[i].name[0],
        "type":response.schools.school[i].type[0],
        "address" :response.schools.school[i].address[0],
        
      }

      
    }
    searchResult = $scope.items;
    //console.log(searchResult);
          
                      
                $location.path('/search/');
 


  
});
}
$scope.nearby= function(){

     

      var city = $scope.city;
      var state = $scope.state;
      var zipcode = $scope.zipcode;
      var address = $scope.address;
      var type = $scope.type;
      var level = $scope.level;
      var radius = $scope.radius;
      var limit = $scope.limit;

      console.log($scope.city);
     console.log($scope.state);
     console.log($scope.type);
     console.log($scope.level);
     console.log($scope.zipcode);
     console.log($scope.radius);
     console.log($scope.limit);
     console.log($scope.address);

      var input = {

        city: city,
        state:state,
        zipcode: zipcode,
        address:address,
        type:type,
        level:level,
        radius:radius,
        limit:limit
      }

     $http({
       method: 'post',
       url: '/nearbyschools',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
  // console.log(response.schools.school.length);
    for(var i=0;i<response.schools.school.length;i++)
    {
      $scope.items[i] =

      {  
        "name":response.schools.school[i].name[0],
        "type":response.schools.school[i].type[0],
        "address" :response.schools.school[i].address[0],
        
      }

      
    }
    searchResult = $scope.items;
    //console.log(searchResult);
          
                      
                $location.path('/search/');


});
}

$scope.profile= function(){

    

      
      var state = $scope.state;
      var id = $scope.gsid;
      
       console.log($scope.state);
     console.log($scope.gsid);
 

      var input = {

        state: state,
        id:id
        
      }

      console.log(input);

     $http({
       method: 'post',
       url: '/profile',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
  // console.log(response.schools.school.length);
    for(var i=0;i<1;i++)
    {
      $scope.items[i] =

      {  
        "id":response.school.gsId[0],
        "name":response.school.name[0],
        "type":response.school.type[0],
        "address" :response.school.address[0],
        
      }

      
    }
    searchResult = $scope.items;
    console.log(searchResult);
          
                      
                $location.path('/search/');
 


  
});
}
});

app.controller('PageCtrl', function ( $rootScope,$scope, $location, $http ) {
  console.log("Page Controller reporting for duty."); 
  
  $scope.items = searchResult;  

  $http({
       method: 'get',
       url: '/login'
       
 }).success(function(response){
   console.log(response);
   if(response === "home")
   {
     $location.path("/");
   }
 });

$scope.logout = function()
{

  alert("LOGOUT");
  
  console.log("LOGOUT");

   $http({
       method: 'get',
       url: '/logout'
       
 }).success(function(response){
   
   console.log(response);
  
 });



} 



 // initMap($scope.items);
  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});

/*function initMap(searchResult) {
   console.log("searchResult");
   console.log(searchResult);
   var uluru = [];
   for(var i=0; i< searchResult.length;i++)
   {
         uluru[i] = 
        {
          "lat": parseInt(searchResult[i].lat), 
          "lng": parseInt(searchResult[i].long)
        };
        var map = new google.maps.Map(document.getElementById("mapprop"), {
          zoom: 14,
          center: uluru[i]
        });
        var marker = new google.maps.Marker({
          position: uluru[i],
          map: map
        });

      }
}*/

   /*   function initMap(searchResult) {
        var map;
        console.log(JSON.stringify(searchResult));
        map = new google.maps.Map(document.getElementById('mapprop'), {
          zoom: 2,
          center: new google.maps.LatLng(35.340545,-80.779269)
        });

        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');
        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);
        marker(map,searchResult);
      }

      // Loop through the results array and place a marker for each
      // set of coordinates.
      function marker(map,searchResult)
      {
      window.eqfeed_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latlongcoords = [searchResult[i].lat,searchResult[i].long];
          console.log(latlongcoords);
          console.log(coords);
          var latLng = new google.maps.LatLng(latlongcoords[1],latlongcoords[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
        }
      }
    }*/
    
   

app.controller('myCtrl1', function($rootScope,$scope,$http,$location,$filter) {

  var savedItems = [];
  $scope.setSelected = function(item)
{
       
       $scope.selected = item;
       savedItems.push($scope.selected);
}

  $scope.saveSearch = function() {
  
  var formData = {};
  var userid;
  if($rootScope.userlogin)
  {
     userid = $rootScope.userlogin.userid;
  }
    else
  {
    userid = 0;
  }

  for(var i=0;i<(savedItems.length);i++)
  {
    
  formData[i] = {
    "userid":userid,
    "name": savedItems[i].name,
    "type":savedItems[i].type,
    "address":savedItems[i].address
  }
  
  }
   
  $http({
       method: 'post',
       url: '/savesearch',
       headers: {'Content-Type': 'application/json'},
       data: formData
 }).success(function(response){
  console.log("repsonse"+response);
  if(response === "login")
  {
    $location.path("/properties");
  }
  else if(response === "success")
  {
    $location.path("/succespage");
  }

 });
 
}


})

app.controller('loginCtrl',function ($rootScope,$scope, $location, $http ) {
  console.log("Login Controller.");
  $scope.userlogin ={};
  $scope.login = function()
  {

    console.log($scope.user);
    console.log($scope.password);
   
    var login= {
      username: $scope.user,
      password:$scope.password,
     

    }
    console.log(login);
     $http({
       method: 'post',
       url: '/login',
       headers: {'Content-Type': 'application/json'},
       data: login
 }).success(function(response){
   console.log(response);
       if(response.username)
   {
     user  = response.username; 
     $rootScope.userlogin = {
       userid:response._id,
       username:user
     };
     console.log($rootScope);
     $location.path("/");
   }
   else
   {
     $rootScope.errors = [];
     for(var i=0;i<response.length;i++)
     {
       $rootScope.errors[i] = 
       {
         msg: response[i]
       }
       
     }
     console.log($rootScope.errors);
     $location.path("/errorpage")
   }
   
 });
  }


    
  

  
  $scope.signup = function()
  {

    console.log($scope.user);
    console.log($scope.password);
    console.log($scope.confirmpwd);
    console.log($scope.email);
    var register= {
      username: $scope.user,
      password:$scope.password,
      confirmpwd:$scope.confirmpwd,
      email:$scope.email

    }
     $http({
       method: 'post',
       url: '/register',
       data: register
 }).success(function(response){
   $rootScope.errors1 = [];
   
   console.log("response");
   console.log(response);
   if(response.length > 0)
   {
      
     for(var i=0;i<response.length;i++)
     {
       $rootScope.errors1[i] = 
       {
         msg: response[i].msg,
        
       }
       
     }
      
     $location.path("/errorpage");
   }
   else
   {
     console.log(response);
     $scope.name = response.username;
     $location.path("/");
   }
   

 })

  }
});



