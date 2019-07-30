const postCont =document.getElementById("postsparagraph");
const table = document.getElementById("table");

let cont = ["Southwest too educationally exposed to allow certificate forgers, incompetent leaders rule it – PDP"]
for(var i=1 ; i <= 10 ; i++){
	// const newPara = document.createElement('p');
	// const newAnchor = document.createElement('a');
	// newAnchor.setAttribute('href' ,'postContent.html');
	// newAnchor.innerHTML = cont[0];
	// newPara.appendChild(newAnchor);
	// postCont.appendChild(newPara);
	// newAnchor.style.color = '#0d386e';

	const row = table.insertRow(i);
	const col1 = row.insertCell(0);
	const col2 = row.insertCell(1);
	const col3 = row.insertCell(2);
	const link = 'postContent.html'
	col1.innerHTML = '24,may 2019';
	col2.innerHTML = '<a href="'+link+'">' +cont[0]+ '</a>' ;
	col3.innerHTML = 'Resolved'
}


