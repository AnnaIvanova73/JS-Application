//Post
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "active_template::133674=pub_site.1624933507; ezCMPCCS=false; ezepvv=0; ezoab_133674=mod11-c; ezoadgid_133674=-1; ezopvc_133674=1; ezoref_133674=; ezovid_133674=683355898; ezovuuid_133674=0e9462bd-694e-4087-6653-d7dfa6cee728; ezovuuidtime_133674=1624933513; lp_133674=http://dummy.restapiexample.com/employees");

var raw = JSON.stringify({
    "name": "test",
    "salary": "123",
    "age": "23"
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("http://dummy.restapiexample.com/api/v1/create", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

/* HTTP request
POST /api/v1/create HTTP/1.1
Host: dummy.restapiexample.com
Content-Type: application/json
Cookie: active_template::133674=pub_site.1624933507; ezCMPCCS=false; ezepvv=0; ezoab_133674=mod11-c; ezoadgid_133674=-1; ezopvc_133674=1; ezoref_133674=; ezovid_133674=683355898; ezovuuid_133674=0e9462bd-694e-4087-6653-d7dfa6cee728; ezovuuidtime_133674=1624933513; lp_133674=http://dummy.restapiexample.com/employees
Content-Length: 41

{"name":"test","salary":"123","age":"23"}
 */