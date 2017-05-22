
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
    .when("/team", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    .when("/login", {templateUrl: "partials/login.html", controller: "PageCtrl"})
    .when("/signup", {templateUrl: "partials/login1.html", controller: "PageCtrl"})

    .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    // Blog
    .when("/school", {templateUrl: "partials/browseSchool.html", controller: "BlogCtrl"})
    .when("/daycares", {templateUrl: "partials/daycare.html", controller: "PageCtrl"})
    .when("/nearby", {templateUrl: "partials/nearbySchool.html", controller: "BlogCtrl"})
    .when("/profile", {templateUrl: "partials/schoolProfile.html", controller: "BlogCtrl"})
    .when("/schoolsearch", {templateUrl: "partials/school.html", controller: "BlogCtrl"})
    .when("/test", {templateUrl: "partials/testScores.html", controller: "BlogCtrl"})
    .when("/census", {templateUrl: "partials/censusData.html", controller: "BlogCtrl"})
    .when("/city", {templateUrl: "partials/cityOverview.html", controller: "BlogCtrl"})
    .when("/cities", {templateUrl: "partials/nearbyCities.html", controller: "BlogCtrl"})
    .when("/districts", {templateUrl: "partials/browseDistricts.html", controller: "BlogCtrl"})
    .when("/errorpage", {templateUrl: "partials/errorpage.html", controller: "PageCtrl"})
    .when("/schooldetails", {templateUrl: "partials/schooldetails.html", controller: "BlogCtrl"})
    .when("/search", {templateUrl: "partials/search.html", controller: "PageCtrl"})
    .when("/nearbysearch", {templateUrl: "partials/search1.html", controller: "PageCtrl"})
    .when("/search2", {templateUrl: "partials/search2.html", controller: "PageCtrl"})
    .when("/search3", {templateUrl: "partials/search3.html", controller: "PageCtrl"})
    .when("/search4", {templateUrl: "partials/search4.html", controller: "PageCtrl"})
    .when("/search5", {templateUrl: "partials/search5.html", controller: "PageCtrl"})
    .when("/search6", {templateUrl: "partials/search6.html", controller: "PageCtrl"})
    .when("/search7", {templateUrl: "partials/search7.html", controller: "PageCtrl"})
    .when("/search8", {templateUrl: "partials/search8.html", controller: "PageCtrl"})
    .when("/search9", {templateUrl: "partials/search9.html", controller: "PageCtrl"})

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
  $scope.schoolsearch= function(){

      var state = $scope.state;
      var city = $scope.city;
      var query = $scope.query;
      var limit = $scope.limit;

    
     console.log($scope.state);
     console.log($scope.city);
     console.log($scope.query);
     console.log($scope.limit);

      var input = {

        state:state,
        city:city,
        query:query,
        limit:limit
      }

     $http({
       method: 'post',
       url: '/schoolsearch',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
  // console.log(response.schools.school.length);
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
    console.log(searchResult);
          
                      
                $location.path('/search/');
   
});
}
  
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
   $scope.items1 = response;
   $scope.items = [];
  console.log($rootScope.userlogin);
  
    for(var i=0;i<response.schools.school.length;i++)
    {
      if((response.schools.school[i].enrollment) && (response.schools.school[i].parentRating))
      {
      $scope.items[i] =

      { 
        
        "id":response.schools.school[i].gsId[0],
        "name":response.schools.school[i].name[0],
        "type":response.schools.school[i].type[0],
        "address" :response.schools.school[i].address[0],
        "range":response.schools.school[i].gradeRange[0],
        "enroll":response.schools.school[i].enrollment[0],
        "rating":response.schools.school[i].parentRating[0],
        "city":response.schools.school[i].city[0],
        "state":response.schools.school[i].state[0],
        "phone":response.schools.school[i].phone[0],
        "fax":response.schools.school[i].fax[0],
        "website":response.schools.school[i].website[0]
        
      }
      }

      
    }
    searchResult = $scope.items;
    console.log(searchResult);
          
                      
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

      if((response.schools.school[i].gradeRange) && (response.schools.school[i].enrollment) && (response.schools.school[i].parentRating) && (response.schools.school[i].phone) && (response.schools.school[i].fax) && (response.schools.school[i].website))
      {
      $scope.items[i] =

      { 
        
        "id":response.schools.school[i].gsId[0],
        "name":response.schools.school[i].name[0],
        "type":response.schools.school[i].type[0],
        "address" :response.schools.school[i].address[0],
        "range":response.schools.school[i].gradeRange[0],
        "enroll":response.schools.school[i].enrollment[0],
        "rating":response.schools.school[i].parentRating[0],
        "city":response.schools.school[i].city[0],
        "state":response.schools.school[i].state[0],
        "phone":response.schools.school[i].phone[0],
        "fax":response.schools.school[i].fax[0],
        "website":response.schools.school[i].website[0]
        
      }
      }

      
    }
    searchResult = $scope.items;
    console.log($scope.items);
          
                      
    $location.path('/nearbysearch/');


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
  console.log(response.school.gsId[0]);
     for(var i=0;i<1;i++)
    {
      
      
if((response.schools.school[i].gradeRange) && (response.schools.school[i].enrollment) && (response.schools.school[i].parentRating) && (response.schools.school[i].phone) && (response.schools.school[i].fax) && (response.schools.school[i].website))
      {
      
      $scope.items[i] =

      { 
        
        "id":response.school.gsId[0],
        "name":response.school.name[0],
        "type":response.school.type[0],
        "address" :response.school.address[0],
        "range":response.school.gradeRange[0],
        "enroll":response.school.enrollment[0],
        "rating":response.school.parentRating[0],
        "city":response.school.city[0],
        "state":response.school.state[0],
        "phone":response.school.phone[0],
        "fax":response.school.fax[0],
        "website":response.school.website[0]
        
      
      
    }
      }
    
    }

      
    
    searchResult = $scope.items;
    console.log(searchResult);
          
                      
                $location.path('/search2');
 


  
});
}


$scope.schoolsearch= function(){

      var state = $scope.state;
      var city = $scope.city;
      var query = $scope.query;
      var limit = $scope.limit;

    
     console.log($scope.state);
     console.log($scope.city);
     console.log($scope.query);
     console.log($scope.limit);

      var input = {

        state:state,
        city:city,
        q:query,
        limit:limit
      }

     $http({
       method: 'post',
       url: '/schoolsearch',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
  console.log(response.schools.school);
    for(var i=0;i<response.schools.school.length;i++)
    {
      
      if((response.schools.school[i].enrollment) && (response.schools.school[i].parentRating))
      {

      
      $scope.items[i] =

      { 
        
        "id":response.schools.school[i].gsId[0],
        "name":response.schools.school[i].name[0],
        "type":response.schools.school[i].type[0],
        "address" :response.schools.school[i].address[0],
        "range":response.schools.school[i].gradeRange[0],
        "enroll":response.schools.school[i].enrollment[0],
        "rating":response.schools.school[i].parentRating[0],
        "city":response.schools.school[i].city[0],
        "state":response.schools.school[i].state[0],
        "phone":response.schools.school[i].phone[0],
        "fax":response.schools.school[i].fax[0],
        "website":response.schools.school[i].website[0]
        
      
      }
    }
      
    
    }

    searchResult = $scope.items;
    //console.log(searchResult);
          
                      
                $location.path('/search3/');
   
});
}

$scope.schoolreview= function(){

    console.log($scope.type);
     console.log($scope.name);
     console.log($scope.state);
     console.log($scope.city);
     console.log($scope.limit);

     var type = $scope.type;
      var state = $scope.state;
      var city = $scope.city;
      var gsid = $scope.gsid;
      var limit = $scope.limit;
      var cutoffAge = $scope.age;

      var input = {

        type:type,
        state:state,
        city:city,
        gsid:gsid,
        limit:limit,
        cutoffAge:cutoffAge
      }

     $http({
       method: 'post',
       url: '/reviews',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
  // console.log(response.schools.school.length);
    for(var i=0;i<response.schools.school.length;i++)
    {
      $scope.items[i] =

      {  
        "id":response.schools.school[i].gsId[0],
        "name":response.schools.school[i].name[0],
        "type":response.schools.school[i].type[0],
        "address" :response.schools.school[i].address[0],
        "rating":response.schools.school[i].rating[0]
      }

      
    }
    searchResult = $scope.items;
    //console.log(searchResult);
          
                      
                $location.path('/search4/');
 


  
});
}

$scope.test= function(){

     
     console.log($scope.state);
     console.log($scope.gsid)
      var state = $scope.state;
      var id = $scope.gsid;

      var input = {

        state: state,
        gsID:id
        
      }


     $http({
       method: 'post',
       url: '/tests',
       data: input
 }).success(function(response){
  
   $scope.items = [];
  
   console.log(response);
   console.log(response.testResults.rank[0].name);
   console.log(response.testResults.rank[0].score);
   console.log(response.testResults.rank[0].scale);
   console.log(response.testResults.rank[0].year);

  for(var i=0;i<1;i++)
    {
     $scope.items[i] = {
        
        
        "rank":response.testResults.rank[0].name[0],
        "score": response.testResults.rank[0].score[0],
        "scale":response.testResults.rank[0].scale[0],
        "year":response.testResults.rank[0].year[0],
        "name":response.testResults.schoolName[0],
        "tests":response.testResults.test

      }
    }
  
    console.log($scope.items);
    searchResult = $scope.items;
    //console.log(searchResult);
          
                      
                $location.path('/search5/');
 


  
});
}


$scope.schoolcensus= function(){

      console.log($scope.state);
     console.log($scope.gsid)
      var state = $scope.state;
      var id = $scope.gsid;

      var input = {

        state: state,
        gsID:id
        
      }


     $http({
       method: 'post',
       url: '/census',
       data: input
 }).success(function(response){
   console.log(response['census-data']);
  
   $scope.items = [];
  
    for(var i=0;i<1;i++)
    {
      $scope.items[i] =

      {  
        "address":response['census-data'].address[0],
        "district":response['census-data'].district[0],
        "enrollment":response['census-data'].enrollment[0],
        "ethnicities" :response['census-data'].enthnicities,
        "percent":response['census-data'].percentTeachersInFirstSecondYear[0],
        "email":response['census-data'].headOfficialEmail[0],
        "name":response['census-data'].headOfficialName[0],
        "phone":response['census-data'].phone[0],
        "schoolName": response['census-data'].schoolName[0],
        "type": response['census-data'].type[0]
      }

      
    }
    searchResult = $scope.items;
  console.log(searchResult);
          
                      
                $location.path('/search6/');
 


  
});
}
$scope.overview= function(){

     console.log($scope.city);
     console.log($scope.state);
     

      var city = $scope.city;
      var state = $scope.state;
      

      var input = {

        city: city,
        state:state,
        
      }

     $http({
       method: 'post',
       url: '/cities',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
   console.log(response.city);
    
      for(var i=0;i<1;i++)
    {
      $scope.items[i] =

      {  
        "charter":response.city.charterSchools[0],
        "elementary":response.city.elementarySchools[0],
        "high":response.city.highSchools[0],
        "middle" :response.city.middleSchools[0],
        "name":response.city.name[0],
        "private":response.city.privateSchools[0],
        "public":response.city.publicSchools[0],
        "rating":response.city.rating[0],
        "total": response.city.totalSchools[0],
      }

      
    
      
    }
    searchResult = $scope.items;
    //console.log(searchResult);
          
                      
                $location.path('/search7/');
 


  
});
}
$scope.nearbycity= function(){

     console.log($scope.city);
     console.log($scope.state);
     console.log($scope.radius);
          console.log($scope.sortresult);

     

      var city = $scope.city;
      var state = $scope.state;
      var radius = $scope.radius;
      var sort = $scope.sortresult;
      

      var input = {

        
        state:state,
        city: city,
        radius:radius,
        sort:sort
      }

     $http({
       method: 'post',
       url: '/nearbycities',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
  console.log(response.cities.city.length);
    for(var i=0;i<response.cities.city.length;i++)
    {
     
      $scope.items[i] =

      {  
        "charter":response.cities.city[i].charterSchools[0],
        "elementary":response.cities.city[i].elementarySchools[0],
        "high":response.cities.city[i].highSchools[0],
        "middle" :response.cities.city[i].middleSchools[0],
        "name":response.cities.city[i].name[0],
        "private":response.cities.city[i].privateSchools[0],
        "public":response.cities.city[i].publicSchools[0],
        "rating":response.cities.city[i].rating,
        "total": response.cities.city[i].totalSchools[0],
      }

      
      
    }
    searchResult = $scope.items;
    console.log(searchResult);
          
                      
                $location.path('/search8/');
 


  
});
}
$scope.district= function(){

     console.log($scope.city);
     console.log($scope.state);
     

      var city = $scope.city;
      var state = $scope.state;
      
      
      var input = {

        city: city,
        state:state
        
      }

     $http({
       method: 'post',
       url: '/districts',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
   console.log(response.districts.district);
  for(var i=0;i<response.districts.district.length;i++)
    {
     
      $scope.items[i] =

      {  
        "address":response.districts.district[i].address[0],
        "charter":response.districts.district[i].charterSchools,
        "elementary" :response.districts.district[i].elementarySchools,
        "fax":response.districts.district[i].fax,
        "grade":response.districts.district[i].gradeRange,
        "high":response.districts.district[i].highSchools,
        "middle":response.districts.district[i].middleSchools,
        "name": response.districts.district[i].name,
        "nces":response.districts.district[i].ncesCode,
        "phone":response.districts.district[i].phone,
        "public":response.districts.district[i].publicSchools,
        "total":response.districts.district[i].totalSchools,
        "website":response.districts.district[i].website
      }

      
      
    }
    searchResult = $scope.items;
    //console.log(searchResult);
          
                      
                $location.path('/search9/');
 


  
});
}


});

app.controller('PageCtrl', function ( $rootScope,$scope, $location, $http,Session ) {
  console.log("Page Controller reporting for duty."); 
  //angular.element(document.getElementById("nameh4")).innerHTML = "";
  $rootScope.session = Session;
  //Session = null;
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
  Session = null;
  //document.getElementById('namediv').innerHTML = "";
  document.getElementById('nameh3').innerHTML ="";
  document.getElementById('logoutdiv').innerHTML ="";  
console.log(Session);
 console.log("LOGOUT");

   $http({
       method: 'get',
       url: '/logout'
       
 }).success(function(response){
   
   console.log(response);
   $location.path('/');
  
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
    $location.path("/login");
  }
  else if(response === "success")
  {
    $location.path("/successpage");
  }

 });
 
}
$scope.schooldetails = function(id)
{
  
  console.log("schooldetails");
  
  console.log(id.gsId[0]);
  console.log(id.name[0]);
  console.log(id.address[0]);

  $scope.details= [];

  $scope.details = {
    
    id:id.gsId[0],
    name:id.name[0],
    address:id.address[0]

  }
  
    $location.path("/schooldetails");

}





});

app.controller('loginCtrl',function ($rootScope,$scope, $location, $http,Session ) {
  console.log("Login Controller.");
    
  $rootScope.session = Session;
 
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
  //  angular.element(document.getElementById('nameh3')).innerHTML = Session.data ;
    //angular.element(document.getElementById('nameh4')).append(document.getElementById('nameh3'));
  document.getElementById('nameh4').innerHTML = Session.data;
  //document.getElementById('logoutdiv').innerHTML =""; 

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

app.run(function(Session) {}); //bootstrap session;

app.factory('Session', function($http,$rootScope) {
  
  var Session = {
    data: '',
    saveSession: function() { /* save session data to db */ },
    updateSession: function() { 
      /* load data from db */
      $http.get('/getsessiondata')
        .then(function(r) { 
          console.log(r);
          return Session.data = r.data;})
    }
  };
  Session.updateSession();
  return Session; 
});


/*

function PageCtrl(){}
PageCtrl.prototype = {
  addElement:function(){
    var newEle = angular.element("<h3 style='color:red' ng-bind='session.data'></h3>");
    var target = document.getElementById('namediv');
    angular.element(target).append(newEle);
  }
};
*/