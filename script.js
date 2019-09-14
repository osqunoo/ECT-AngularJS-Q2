var appECT = angular.module('appECT', []);

appECT.directive('tree', function() {
  return {
    restrict: 'E',  
    replace: true,  
    scope: {
      t: '=info'  
    },    
    template: '<ul><branch ng-repeat="c in t.children" info="c"></branch></ul>'    
  };
})

appECT.directive('branch', function($compile) {
  return {
    restrict: 'E',  
    replace: true, 
    scope: {
      b: '=info' 
    },    
    template: '<li><a>{{ b.name }}</a></li>',
    link: function(scope, element, attrs) {
     
      var has_children = angular.isArray(scope.b.children);
      
     
      if (has_children) {        
        element.append('<tree info="b"></tree>');
        
       
        $compile(element.contents())(scope); 
      }
      
      
      element.on('click', function(event) {
          event.stopPropagation();          
        
          if (has_children) {
            element.toggleClass('collapsed');
          }
      });      
    }
  };
})

appECT.controller('TreelistController', function ($scope) {
  
  $scope.data = {
    children: [
      {
        name: "A",
        children: [
          {
            name: "B",
            children: [
              {
                name: "C"
              }
            ]
          },
          {
            name: "B2",
            children: []
          }
        ]
      },
      {
        name: "D",
        children: [
          {
            name: "E",
            children: []
          }
        ]
      }
    ]
  };    
});