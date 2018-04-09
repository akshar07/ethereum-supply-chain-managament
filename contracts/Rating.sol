 pragma solidity ^0.4.17;

contract SCM {

  struct Car{
    string name;
    string carNumber;
    string currentState;
  }
  struct User{
    string name;
    string class;
  }
  Car[] public cars;
  
  mapping(address=>uint) public userCarCount;
  mapping(uint=>address) public carToOwner;
  mapping(uint =>Car) public idToCar;
  mapping(bytes32=>Car) public numberToCar;

  event newCar(uint _id, string _name, string _carNumber);
  
  function addCar(string _name, bytes32 _carNumberinBytes, string _user, string _carNumber)public 
  returns(string name, string carNumber,address senderAdd){
    require(keccak256(_user)==keccak256('manafacturer'));
    uint id=cars.push(Car(_name,_carNumber,'manafacturer'));
    idToCar[id]=Car(_name,_carNumber,'manafacturer');
    carToOwner[id]=msg.sender;
    numberToCar[_carNumberinBytes]=Car(_name,_carNumber,'manafacturer');
    userCarCount[msg.sender]=userCarCount[msg.sender] +1;
    newCar(id, _name, _carNumber);
    Car memory c=idToCar[id];
    return(c.name,c.carNumber,msg.sender);
  }
    function getCarsByUser(address _owner) external view returns(uint[]){
        uint[] memory carId=new uint[](userCarCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < cars.length; i++) {
          if (carToOwner[i+1] == _owner) {
            carId[counter]=i;
            counter++;
          }
        }
        return carId;
    }
    function getCar(uint _id) view public returns(string name, string number){
        return (idToCar[_id].name,idToCar[_id].carNumber);
    }
    function sendFromManToDist(address _dist, address _owner, uint _carId, string _user) returns (bool){
      require(keccak256(_user)==keccak256('manafacturer'));
      userCarCount[_owner]--;
      userCarCount[_dist]++;
      carToOwner[_carId]=_dist;
      return true;
    }

}