var myHeaders = new Headers();
myHeaders.append("Cookie", "active_template::133674=pub_site.1624933507; ezCMPCCS=false; ezepvv=0; ezoab_133674=mod11-c; ezoadgid_133674=-1; ezopvc_133674=1; ezoref_133674=; ezovid_133674=683355898; ezovuuid_133674=0e9462bd-694e-4087-6653-d7dfa6cee728; ezovuuidtime_133674=1624933513; lp_133674=http://dummy.restapiexample.com/employees");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("http://dummy.restapiexample.com/api/v1/employee/1", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
//HTTP
/*
GET /api/v1/employee/1 HTTP/1.1
Host: dummy.restapiexample.com
Cookie: active_template::133674=pub_site.1624933507; ezCMPCCS=false;
ezepvv=0; ezoab_133674=mod11-c; ezoadgid_133674=-1; ezopvc_133674=1; ezoref_133674=;
ezovid_133674=683355898; ezovuuid_133674=0e9462bd-694e-4087-6653-d7dfa6cee728; ezovuuidtime_133674=1624933513;
Lp_133674=http://dummy.restapiexample.com/employees
 */