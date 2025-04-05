async function read() {
  document.getElementById("code").innerHTML = "code=" + code;

  try {
      let response = await fetch(url, {
          method: 'POST',
          cache: 'no-cache',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: "code=" + code + "&op=read"
      });

      if (!response.ok) {
          throw new Error("HTTP error! Status: " + response.status);
      }

      let data = await response.text();
      data = JSON.parse(data);
      let list = data.list;
      let str = "<H1>Read</H1>";
      str += "<p>Number of records: " + data.rowCount + "</p>";
      str += "<p>Last max " + data.maxNum + " records:</p>";
      str += "<table><tr><th>id</th><th>name</th><th>age</th><th>gender</th><th>code</th></tr>";
      for (let i = 0; i < list.length; i++)
          str += "<tr><td>" + list[i].id + "</td><td>" + list[i].name + "</td><td>" + list[i].age + "</td><td>" + list[i].gender + "</td><td>" + list[i].code + "</td></tr>";
      str += "</table>";
      document.getElementById("readDiv").innerHTML = str;

  } catch (error) {
      console.error("Fetch error: ", error);
      document.getElementById("readDiv").innerHTML = "Hiba történt a kérés során.";
  }
}


url="http://ftp.webbea.nhely.hu";
async function read() {
  document.getElementById("code").innerHTML="code="+code;
  let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=read"
  });
  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;
  str="<H1>Read</H1>";
  str+="<p>Number of records: "+data.rowCount+"</p>";
  str+="<p>Last max "+data.maxNum+" records:</p>";
  str+="<table><tr><th>id</th><th>name</th><th>age</th><th>gender</th><th>code</th></tr>";
  for(let i=0; i<list.length; i++)
    str += "<tr><td>"+list[i].id+"</td><td>"+list[i].name+"</td><td>"+list[i].age+"</td><td>"+list[i].gender+"</td><td>"+list[i].code+"</td></tr>";
  str +="</table>";
  document.getElementById("readDiv").innerHTML=str;
}

async function create(){
  nameStr = document.getElementById("name1").value;
  age = document.getElementById("age1").value;
  gender = document.getElementById("gender1").value;
  if(nameStr.length>0 && nameStr.length<=30 && age.length>0 && age.length<=30 && gender.length>0 && gender.length<=30 && code.length<=30){
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=create&name="+nameStr+"&age="+age+"&gender="+gender
    });
    let data = await response.text(); 
    document.getElementById("createResult").innerHTML = (data > 0) ? "Create successful!" : "Create NOT successful!";
    document.getElementById("name1").value="";
    document.getElementById("age1").value="";
    document.getElementById("gender1").value="";
    read();
  }
  else
    document.getElementById("createResult").innerHTML="Validation error!!";
}

async function getDataForId() {
  let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=read"
  });
  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;
  for(let i=0; i<list.length; i++)
    if(list[i].id==document.getElementById("idUpd").value){
      document.getElementById("name2").value=list[i].name;
      document.getElementById("age2").value=list[i].age;
      document.getElementById("gender2").value=list[i].gender;
    }
}

async function update(){
  id = document.getElementById("idUpd").value;
  nameStr = document.getElementById("name2").value;
  age = document.getElementById("age2").value;
  gender = document.getElementById("gender2").value;
  if(id.length>0 && id.length<=30 && nameStr.length>0 && nameStr.length<=30 && age.length>0 && age.length<=30 && gender.length>0 && gender.length<=30 && code.length<=30){
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=update&id="+id+"&name="+nameStr+"&age="+age+"&gender="+gender
    });
    let data = await response.text(); 
    document.getElementById("updateResult").innerHTML = (data > 0) ? "Update successful!" : "Update NOT successful!";
    document.getElementById("idUpd").value="";
    document.getElementById("name2").value="";
    document.getElementById("age2").value="";
    document.getElementById("gender2").value="";
    read();
  }
  else
    document.getElementById("updateResult").innerHTML="Validation error!!";
}

async function deleteF(){
  id = document.getElementById("idDel").value;
  if(id.length>0 && id.length<=30){
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=delete&id="+id
    });
    let data = await response.text(); 
    document.getElementById("deleteResult").innerHTML = (data > 0) ? "Delete successful!" : "Delete NOT successful!";
    document.getElementById("idDel").value="";
    read();
  }
  else
    document.getElementById("deleteResult").innerHTML="Validation error!!";
}

window.onload = function() {
    read();
};