angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('QuestaoCtrl', function($scope, $http) {

    var getQuestoes = function (i){

      $scope.questao = $scope.questao_json[i];
      $scope.resposta_certa = $scope.questao_json[i].resposta;

      console.log($scope.resposta_certa);
      
      var alternativas = [];
      alternativas.push('A.'+$scope.questao_json[i].alternativaA);
      alternativas.push('B.'+$scope.questao_json[i].alternativaB);
      alternativas.push('C.'+$scope.questao_json[i].alternativaC);
      alternativas.push('D.'+$scope.questao_json[i].alternativaD);
      alternativas.push('E.'+$scope.questao_json[i].alternativaE);

      $scope.alternativas = alternativas;

  }


  $http.get('https://geral-thiagoleitexd.c9users.io/basic/web/questao/listar').then(function(response){
              $scope.questao_json = response.data;
              $scope.quantidadeQuestoes = response.data.length;
              $scope.contador = 0;
              getQuestoes($scope.contador);
  });

  
  $scope.proximaQuestao = function (){
      $scope.estilo_acerto_ou_erro = "sumir_mensagem_certo_ou_errado";
      $scope.contador = ++$scope.contador || 0;
      getQuestoes($scope.contador);
  }

  $scope.anteriorQuestao = function (){
      $scope.estilo_acerto_ou_erro = "sumir_mensagem_certo_ou_errado";
      $scope.contador = --$scope.contador || 0;
      getQuestoes($scope.contador);
  }

  //funcao acionada quando clica em uma alternativa
  $scope.marcouAlternativa = function (id){
    if ($scope.resposta_certa == $scope.alternativa_correta){
      $scope.estilo_acerto_ou_erro = "cor_mensagem_acerto";
      $scope.mensagem_de_acerto_ou_erro = "Acertou: " + id ;
    }
    else{
      $scope.estilo_acerto_ou_erro = "cor_mensagem_erro";
      $scope.mensagem_de_acerto_ou_erro = "Errou: " + id ; 
    }
  }


})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
