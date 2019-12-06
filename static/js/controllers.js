
const{clipboard}=require('electron')

app.controller('loginCtrl', function ($scope,$localStorage) {
var db=openDb();
$scope.customer={};
$scope.errmsg;
$scope.smsg;  

    $scope.viewPassword = function () {
        console.log(document.getElementById("paswrd").type);
        if (document.getElementById("paswrd").type == "password") {
            document.getElementById("paswrd").type = "text";
            $scope.eye = false;
        }
        else {
            document.getElementById("paswrd").type = "password";
            $scope.eye = true;
        }
    }

    // $scope.check=function(){

    //     if($scope.customer.name.length>10){
    //         alert("Mobile must contain only 10 digits.");
    //         $scope.customer.mobile=$scope.customer.mobile.slice(0,10);
    //     }

    // }

    $scope.login = function () {
        
        if($scope.customer.name==undefined||$scope.customer.name==""){
            $scope.errmsg="Enter Name First";
            $scope.smsg="";
            return;
        }


        if($scope.customer.password==undefined||$scope.customer.password==""){
            $scope.errmsg="Enter Password First";
            $scope.smsg="";
            return;
        }

        
        db.get("SELECT * FROM users WHERE name = ?",$scope.customer.name,function(err,row){
            if (err) {
                $scope.errmsg=err;
                $scope.smsg="";
              }
            if(row==undefined||row.length==0){
            $scope.errmsg="User not exist.Signup First.";
            $scope.smsg="";
            $scope.$apply();
            
        }else{
            
            if(row.password==$scope.customer.password){
                $scope.smsg="Login Success.";
                $scope.errmsg="";
                window.location.href="basic_table.html";
                $localStorage.user=row;
                $scope.$apply();
            }
            else{
                $scope.errmsg="Incorrect Password.";
                $scope.smsg="";
                $scope.$apply();
            }      

        }return;
        });
    };

    $scope.signup = function () {
        
        console.log("running");
        if($scope.customer.name==undefined||$scope.customer.name==""){
            $scope.errmsg="Enter Name First";
            $scope.smsg="";
            return;
        }


        if($scope.customer.password==undefined||$scope.customer.password==""){
            $scope.errmsg="Enter Password First";
            $scope.smsg="";
            return;
        }

        db.get("SELECT * FROM users WHERE name = ?",$scope.customer.name,function(err,row){
            if (err) {
                $scope.errmsg=err;
                $scope.smsg="";
            }
            if(row==undefined){
        db.run("INSERT INTO users(name,password) VALUES(?,?)",[$scope.customer.name,$scope.customer.password],function(err,row){
            if(err){
                $scope.errmsg=err;
            }
            else{
            $scope.smsg="Signed Up Successfully";
            $scope.errmsg="";
            }
            $scope.$apply();
        });
    }else{
        $scope.errmsg="User with this name already Exist.";
        $scope.smsg="";
        $scope.$apply();
    }
    });
    };
});

app.controller('dataCtrl', function ($scope,$localStorage) {

$scope.msg="Welcome "+$localStorage.user.name+" !";
var db=openDb();
$scope.data={};
$scope.passes=[];
$scope.smsg="";
$scope.errmsg="";

$scope.viewPassword = function (id) {
    console.log(document.getElementById("paswrd").type);
    if (document.getElementById(id).type == "password") {
        document.getElementById(id).type = "text";
        $scope.eye = false;
    }
    else {
        document.getElementById(id).type = "password";
        $scope.eye = true;
    }
}

$scope.checkPassword=function(id){
    if (document.getElementById(id).type == "password")
        return false;
    
        return true;
}


$scope.copy=function(id){
    console.log("copying",id);
    clipboard.writeText(id);
    // var copyText = document.getElementById(id);
    // copyText.select();
    // // copyText.setSelectionRange(0, 99999)
    // document.execCommand("copy");
}

$scope.addNew=function(){

    if($scope.data.title==undefined||$scope.data.title==""){
        $scope.errmsg="Enter Title First";
        $scope.smsg="";
        return;
    }
    if($scope.data.username==undefined||$scope.data.username==""){
        $scope.errmsg="Enter Username First";
        $scope.smsg="";
        return;
    }
    if($scope.data.password==undefined||$scope.data.password==""){
        $scope.errmsg="Enter Password First";
        $scope.smsg="";
        return;
    }

    if($scope.data.id==undefined){
    db.run("INSERT INTO data(userId,title,username,password) VALUES(?,?,?,?)",[$localStorage.user.name,$scope.data.title,$scope.data.username,$scope.data.password],function(err,row){
        if(err){
            $scope.errmsg=err;
        }
        else{
        $scope.smsg="Added Successfully";
        $scope.errmsg="";
        $scope.data={};
        }
        $scope.getAll();
        $scope.$apply();
    });
    }
    else{
        db.run("UPDATE  data SET title = ?,username=?,password=? WHERE rowid=?",[$scope.data.title,$scope.data.username,$scope.data.password,$scope.data.id],function(err,row){
            if(err){
                $scope.errmsg=err;
            }
            else{
            $scope.smsg="Added Successfully";
            $scope.errmsg="";
            $scope.data={};
            }
            $scope.getAll();
            $scope.$apply();
        });
    }

};

$scope.edit=function(dat){
    $scope.data=dat;
    console.log($scope.data);
}

$scope.open=function(title){
    window.open(title,'_blank', 'nodeIntegration=no');
}

$scope.getAll=function(){

    db.all("SELECT rowid as id,userId,title,username,password FROM data WHERE userId = ?",$localStorage.user.name,function(err,row){
        $scope.passes=row;
        $scope.$apply();
        console.log($scope.passes);
    })

};
$scope.getAll();

$scope.remove=function(id){
    console.log(id)

    db.run("DELETE FROM data WHERE rowid = ?", id,function(err,row){
        if(err){
            console.log(err);
        }
        $scope.getAll();
        $scope.$apply();
    })

};
    
});
